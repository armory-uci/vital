require('dotenv').config({ path: './backend/config/.env' });
const convict = require('convict');

const config = convict({
    env: {
        format: ['prod'],
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
    }
});

const env = config.get('env');
config.load(require(`./${env}`));
config.validate()
module.exports = config.getProperties();