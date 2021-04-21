const cluster = 'httpd-siab';
const subnets = ['subnet-92afc7f4'];
const securityGroups = ['sg-07b0588aee4fe9030'];

const launchType = 'FARGATE';
const assignPublicIp = 'ENABLED';

const vulnerabilities = {
  sqlInjection: {
    taskDefinition: 'httpd_siab',
    cluster,
    launchType,
    subnets,
    securityGroups,
    assignPublicIp
  }
};

const sandbox = {
  port: 5001,
  ssl: 'http'
};

module.exports = {
  cluster,
  vulnerabilities,
  sandbox
};
