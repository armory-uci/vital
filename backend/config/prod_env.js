const cluster = 'vital-sandbox';
const awsRegion = 'us-east-1';
const subnets = [
  'subnet-64584e29',
  'subnet-f90a49a6',
  'subnet-85b3f4e3',
  'subnet-1f81cc3e',
  'subnet-9ef07aaf',
  'subnet-c2fac3cc'
];
const securityGroups = ['sg-0a82cd3da897b40cc'];

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
