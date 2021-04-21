const config = require('../config');
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

const getUserTaskId = (userId) => {
  return userId;
};

const redirectToTask = async (req, res, next) => {
  try {
    const params = {
      cluster: config.cluster,
      tasks: [getUserTaskId(req.params.userId)]
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
      task: getUserTaskId(req.params.userId)
    };
    const stopTaskRes = await ecs.stopTask(params).promise();
    return res.json(stopTaskRes);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const spawnParams = getSpawnConfig(req.params.vulnerability);
    const spawnRes = await ecs.runTask(spawnParams).promise();
    // NOTE: no need to validation response as AWS Docs state that an error is thrown if something doesn't work else all below fields are guaranteed.
    // so whatever validation you add it won't ever get reached.
    const arn = spawnRes.tasks[0].taskArn.split('/').pop();

    // TODO: save the userId arn mapping to persistant storage
    if (req.method === 'GET') {
      // HACK: setting userId to arn so that the redirect works
      req.params.userId = arn;
      // return res.json(arn);
      return redirectToTask(req, res);
    } else {
      return res.json(arn);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listSandboxes,
  redirectToTask,
  cleanupTask,
  createTask
};
