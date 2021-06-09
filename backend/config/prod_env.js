const cluster = 'vital-sandbox';
const awsRegion = 'us-east-1';
const subnets = [
  'subnet-92afc7f4',
  'subnet-b22b5fed',
  'subnet-45fcde4b',
  'subnet-8798a0ca',
  'subnet-b3b30c82',
  'subnet-8c7c0aad'
];
const securityGroups = ['sg-0e54782ee714f5a8e'];

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
  },
  csrfNode: {
    taskDefinition: 'csrf-node-task',
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
