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
  },
  sandboxTTLSeconds: {
    env: 'SANDBOX_TTL_SEC',
    default: 1800,
    format: (val) => {
      if (typeof val !== 'number' || val <= 0 || val > 1800)
        throw new Error(`${val} not in range [1, 1800]`);
    }
  }
});

const env = config.get('env');
config.load(require(`./${env}_env`));
config.validate();
module.exports = config.getProperties();
