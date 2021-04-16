const config = require('../config');

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const ecs = new AWS.ECS();
const ec2 = new AWS.EC2();

function extractNetworkEID(taskInfo) {
    if (!taskInfo || !taskInfo.tasks || !Array.isArray(taskInfo.tasks) || !taskInfo.tasks.length)
        return new Error('invalid taskInfo');
    let task = taskInfo.tasks[0];
    if (!task || !task.attachments || !Array.isArray(task.attachments) || !task.attachments.length)
        return new Error('missing details in task');
    let networkInterfaceId = task.attachments[0].details.find(each => each.name == 'networkInterfaceId');
    if (!networkInterfaceId || !networkInterfaceId.value)
        return new Error('missing networkInterfaceId');
    return networkInterfaceId.value;
}

function extractPublicIP(networkInfo) {
    if (!networkInfo || !networkInfo.NetworkInterfaces || !Array.isArray(networkInfo.NetworkInterfaces) || !networkInfo.NetworkInterfaces.length)
        return new Error('invalid network info');
    let networkInterface = networkInfo.NetworkInterfaces[0];
    if (!networkInterface || !networkInterface.Association || !networkInterface.Association.PublicIp)
        return new Error('missing PublicIP info');
    return networkInterface.Association.PublicIp;
}

function getSpawnConfig(vulnerability) {
    if (!(vulnerability in config.vulnerabilities))
        return new Error('invalid vulnerability');
    vulnerability_config = config.vulnerabilities[vulnerability];
    let spawn_config = {
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
    }
    return spawn_config;
}

const listSandboxes = async function (req, res) {
    try {
        let tasks = await ecs.listTasks({cluster:config.cluster}).promise();
        return res.json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(400).send(error);
    }
}

function getUserTaskId(user_id) {
    return user_id
}

async function redirectToTask (req, res) {
    try {
        let params = {
            cluster: config.cluster,
            tasks: [getUserTaskId(req.params.user_id)]
        };
        let taskInfo = await ecs.waitFor('tasksRunning', params).promise();
        let networkInterfaceId = extractNetworkEID(taskInfo);
        // console.log('networkInterfaceId', networkInterfaceId);
        let networkInfo = await ec2.describeNetworkInterfaces({ NetworkInterfaceIds: [networkInterfaceId] }).promise();
        return res.redirect(`${config.sandbox.ssl}://${extractPublicIP(networkInfo)}:${config.sandbox.port}`);
    } catch (error) {
        console.error(error);
        return res.status(400).send(error);
    }
}

async function cleanupTask (req, res) {
    try {
        let params = {
            cluster: config.cluster,
            task: getUserTaskId(req.params.user_id),
        }
        let stop_task_res = await ecs.stopTask(params).promise();
        return res.json(stop_task_res);
    } catch (error) {
        console.error(error);
        return res.status(400).send(error);
    }
}

async function createTask (req, res) {
    try {
        console.log('here creating task');
        if (!req.params.vulnerability)
            throw new Error('missing vulnerability');
        let spawn_params = getSpawnConfig(req.params.vulnerability);
        let spawn_res = await ecs.runTask(spawn_params).promise();
        if (!spawn_res || !spawn_res.tasks || !Array.isArray(spawn_res.tasks) || !spawn_res.tasks.length)
            throw new Error('spawn did not returl arn');
        let arn = spawn_res.tasks[0]['taskArn'].split('/').pop();
        
        // TODO: save the user_id arn mapping to persistant storage

        if (req.method == 'GET') {
            // HACK: setting user_id to arn so that the redirect works
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
}

module.exports = {
    listSandboxes,
    redirectToTask,
    cleanupTask,
    createTask
}