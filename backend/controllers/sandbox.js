const config = require('../config');

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const ecs = new AWS.ECS();
const ec2 = new AWS.EC2();

const extractNetworkEID = (taskInfo) => {
  if (
    !taskInfo ||
    !taskInfo.tasks ||
    !Array.isArray(taskInfo.tasks) ||
    !taskInfo.tasks.length
  )
    return new Error('invalid taskInfo');
  const task = taskInfo.tasks[0];
  if (
    !task ||
    !task.attachments ||
    !Array.isArray(task.attachments) ||
    !task.attachments.length
  )
    return new Error('missing details in task');
  const networkInterfaceId = task.attachments[0].details.find(
    (each) => each.name === 'networkInterfaceId'
  );
  if (!networkInterfaceId || !networkInterfaceId.value)
    return new Error('missing networkInterfaceId');
  return networkInterfaceId.value;
};

const extractPublicIP = (networkInfo) => {
  if (
    !networkInfo ||
    !networkInfo.NetworkInterfaces ||
    !Array.isArray(networkInfo.NetworkInterfaces) ||
    !networkInfo.NetworkInterfaces.length
  )
    return new Error('invalid network info');
  const networkInterface = networkInfo.NetworkInterfaces[0];
  if (
    !networkInterface ||
    !networkInterface.Association ||
    !networkInterface.Association.PublicIp
  )
    return new Error('missing PublicIP info');
  return networkInterface.Association.PublicIp;
};

const getSpawnConfig = (vulnerability) => {
  if (!(vulnerability in config.vulnerabilities))
    return new Error('invalid vulnerability');
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

const listSandboxes = async (req, res) => {
  try {
    const tasks = await ecs.listTasks({ cluster: config.cluster }).promise();
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const getUserTaskId = (userId) => {
  return userId;
};

const redirectToTask = async (req, res) => {
  try {
    const params = {
      cluster: config.cluster,
      tasks: [getUserTaskId(req.params.user_id)]
    };
    const taskInfo = await ecs.waitFor('tasksRunning', params).promise();
    const networkInterfaceId = extractNetworkEID(taskInfo);
    // console.log('networkInterfaceId', networkInterfaceId);
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
    console.error(error);
    return res.status(400).send(error);
  }
};

const cleanupTask = async (req, res) => {
  try {
    const params = {
      cluster: config.cluster,
      task: getUserTaskId(req.params.user_id)
    };
    const stopTaskRes = await ecs.stopTask(params).promise();
    return res.json(stopTaskRes);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const createTask = async (req, res) => {
  try {
    console.log('here creating task');
    if (!req.params.vulnerability) throw new Error('missing vulnerability');
    const spawnParams = getSpawnConfig(req.params.vulnerability);
    const spawnRes = await ecs.runTask(spawnParams).promise();
    if (
      !spawnRes ||
      !spawnRes.tasks ||
      !Array.isArray(spawnRes.tasks) ||
      !spawnRes.tasks.length
    )
      throw new Error('spawn did not returl arn');
    const arn = spawnRes.tasks[0].taskArn.split('/').pop();

    // TODO: save the user_id arn mapping to persistant storage

    if (req.method === 'GET') {
      // HACK: setting userId to arn so that the redirect works
      req.params.user_id = arn;
      // return res.json(arn);
      return redirectToTask(req, res);
    } else {
      return res.json(arn);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  listSandboxes,
  redirectToTask,
  cleanupTask,
  createTask
};
