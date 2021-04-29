require('dotenv').config({ path: './backend/config/.env' });
const convict = require('convict');

const config = convict({
  env: {
    format: ['prod', 'test'],
    default: 'dev',
    env: 'NODE_ENV',
    arg: 'nodeEnv'
  },
  port: {
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port'
  },
  awsRegion: {
    doc: 'AWS Region for the container environment',
    default: null, // Forcing a set of AWS region, as it's a hard problem to diagnose
    format: (val) => {
      if (!val) {
        throw new Error(
          'Must specify AWS Region. Check the top right on your AWS Console. Eg. us-east-1'
        );
      }
    }
  },
  ssl: {
    format: ['http', 'https'],
    default: 'http'
  },
  sandbox: {
    format: Object,
    default: {}
  },
  cluster: {
    format: String,
    default: 'default_cluster'
  },
  subnets: {
    format: Array,
    default: []
  },
  vulnerabilities: {
    format: Object,
    default: {}
  }
});

const env = config.get('env');
config.load(require(`./${env}_env`));
config.validate();
module.exports = config.getProperties();
