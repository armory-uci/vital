const config = require('../config');
const { registerSandbox, getActiveSandbox, del } = require('../db');
const api404Error = require('../error/api404Error');

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const ecs = new AWS.ECS();
const ec2 = new AWS.EC2();

const extractNetworkEID = (taskInfo) => {
  const task = taskInfo.tasks[0];
  const networkInterfaceId = task.attachments[0].details.find(
    (each) => each.name === 'networkInterfaceId'
  );
  return networkInterfaceId.value;
};

const extractPublicIP = (networkInfo) => {
  const networkInterface = networkInfo.NetworkInterfaces[0];
  return networkInterface.Association.PublicIp;
};

const getSpawnConfig = (vulnerability) => {
  if (!(vulnerability in config.vulnerabilities))
    throw new api404Error(`vulnerability of type: ${vulnerability} not found`);
  vulnerability_config = config.vulnerabilities[vulnerability];
  const spawnConfig = {
    taskDefinition: vulnerability_config.taskDefinition,
    cluster: vulnerability_config.cluster,
    count: 1,
    launchType: vulnerability_config.launchType,
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: vulnerability_config.subnets,
        securityGroups: vulnerability_config.securityGroups,
        assignPublicIp: vulnerability_config.assignPublicIp
      }
    }
  };
  return spawnConfig;
};

const listSandboxes = async (req, res, next) => {
  try {
    const tasks = await ecs.listTasks({ cluster: config.cluster }).promise();
    return res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const redirectToTask = async (req, res, next) => {
  try {
    const params = {
      cluster: config.cluster,
      tasks: [await getActiveSandbox(req.userId)]
    };
    const taskInfo = await ecs.waitFor('tasksRunning', params).promise();
    const networkInterfaceId = extractNetworkEID(taskInfo);
    const networkInfo = await ec2
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .describeNetworkInterfaces({ NetworkInterfaceIds: [networkInterfaceId] })
      .promise();
    return res.redirect(
      `${config.sandbox.ssl}://${extractPublicIP(networkInfo)}:${
        config.sandbox.port
      }`
    );
  } catch (error) {
    next(error);
  }
};

const cleanupTask = async (req, res, next) => {
  try {
    const params = {
      cluster: config.cluster,
      task: await getActiveSandbox(req.userId)
    };
    const stopTaskRes = await ecs.stopTask(params).promise();
    return res.json(stopTaskRes);
  } catch (error) {
    next(error);
  }
};

const cleanupUserTasks = async (userId) => {
  try {
    const prevSandboxArn = await getActiveSandbox(userId);
    const describeTaskParams = {
      cluster: config.cluster,
      tasks: [prevSandboxArn]
    };
    const taskInfo = await ecs.describeTasks(describeTaskParams).promise();
    if (taskInfo.failures.length && taskInfo.failures[0].reason === 'MISSING')
      return `task: ${prevSandboxArn} already destroyed`;

    const stopTaskParams = {
      cluster: config.cluster,
      task: prevSandboxArn
    };
    const cleanupUserTaskRes = await ecs.stopTask(stopTaskParams).promise();
    return cleanupUserTaskRes;
  } catch (error) {
    if (error instanceof api404Error) return error.name;
    throw error;
  }
};

const createTask = async (req, res, next) => {
  try {
    const userTaskCleanupRes = await cleanupUserTasks(req.userId);
    // eslint-disable-next-line no-console
    console.debug('userTaskCleanupRes', userTaskCleanupRes);
    const spawnParams = getSpawnConfig(req.params.vulnerability);
    const spawnRes = await ecs.runTask(spawnParams).promise();
    // NOTE: no need to validation response as AWS Docs state that an error is thrown if something doesn't work else all below fields are guaranteed.
    // so whatever validation you add it won't ever get reached.
    const arn = spawnRes.tasks[0].taskArn.split('/').pop();

    await registerSandbox(req.userId, arn);
    // TODO: save the userId arn mapping to persistant storage
    if (req.method === 'GET') {
      return redirectToTask(req, res);
    } else {
      return res.json(arn);
    }
  } catch (error) {
    next(error);
  }
};

const stopInactiveTask = async (arn) => {
  // return new Promise((resolve) => setTimeout(() => resolve(arn), 1000));
  try {
    const stopTaskParams = {
      cluster: config.cluster,
      task: arn
    };
    const describeTaskParams = {
      cluster: config.cluster,
      tasks: [arn]
    };
    const taskInfo = await ecs.describeTasks(describeTaskParams).promise();
    if (taskInfo.failures.length && taskInfo.failures[0].reason === 'MISSING')
      return `task: ${arn} already destroyed`;

    const timeLeft =
      config.sandboxTTLSeconds * 1000 -
      (Date.now() - taskInfo.tasks[0].createdAt);
    let cleaupRes = `sandbox id: ${arn} 's time left(ms): ${timeLeft}`;
    if (timeLeft <= 0) {
      const stopTaskRes = await ecs.stopTask(stopTaskParams).promise();
      cleaupRes = `sandbox id: ${arn} cleaned after ${
        stopTaskRes.task.stoppingAt - stopTaskRes.task.startedAt
      } (ms)`;
    }

    return cleaupRes;
  } catch (error) {
    if (error instanceof api404Error) {
      // eslint-disable-next-line no-console
      console.debug(`cleaning not found sandbox id: ${arn}`, error.name);
      const cleaupRes = await ecs.stopTask(stopTaskParams).promise();
      return cleaupRes;
    }
    throw error;
  }
};

const cleanupAllTasks = async () => {
  // eslint-disable-next-line no-console
  console.debug('cleaning up sandboxes');
  try {
    // const tasks = { taskArns: ['98e08da8cc764e98a711b0c1303a0584'] };
    const tasks = await ecs.listTasks({ cluster: config.cluster }).promise();
    const cleanupTasks = tasks.taskArns.map((arn) =>
      stopInactiveTask(arn.split('/').pop())
    );
    const cleanupRes = await Promise.allSettled(cleanupTasks);
    console.log('cleanupRes', cleanupRes);
    return cleanupRes;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listSandboxes,
  redirectToTask,
  cleanupTask,
  createTask,
  cleanupAllTasks
};
