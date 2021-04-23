const cluster = 'vital-sandbox';
const subnets = [
  'subnet-92afc7f4',
  'subnet-b22b5fed',
  'subnet-45fcde4b',
  'subnet-8798a0ca',
  'subnet-b3b30c82',
  'subnet-8c7c0aad'
];
const securityGroups = ['sg-07b0588aee4fe9030'];

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
  }
};

const sandbox = {
  port: 3001,
  ssl: 'http'
};

module.exports = {
  cluster,
  vulnerabilities,
  sandbox
};
