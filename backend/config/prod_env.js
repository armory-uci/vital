const cluster = 'vital-sandbox';
const awsRegion = 'us-east-1';
const subnets = [
  'subnet-15d85e24',
  'subnet-27794d29',
  'subnet-7b3f4d1d',
  'subnet-a9255c88',
  'subnet-c4aaa989',
  'subnet-52f18d0d'
];
const securityGroups = ['sg-0d0aaa428018a509a'];

const launchType = 'FARGATE';
const assignPublicIp = 'ENABLED';

const vulnerabilities = {
  sqlInjection: {
    taskDefinition: 'sqlInjection-task',
    cluster,
    launchType,
    subnets,
    securityGroups,
    assignPublicIp
  },
  sqlInjectionNode: {
    taskDefinition: 'sqlInjection-node-task',
    cluster,
    launchType,
    subnets,
    securityGroups,
    assignPublicIp
  },
  xssStored: {
    taskDefinition: 'xssStored-task',
    cluster,
    launchType,
    subnets,
    securityGroups,
    assignPublicIp
  }
};

const sandbox = {
  port: 3001,
  ssl: 'http'
};

const sandboxWebsite = {
  port: 5000,
  ssl: 'http'
};

module.exports = {
  cluster,
  vulnerabilities,
  sandbox,
  sandboxWebsite,
  awsRegion
};
