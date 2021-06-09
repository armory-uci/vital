import { environment as base } from './environment.base';

export const environment = {
  ...base,
  // TODO Get this from actual .env file
  serverUrl: 'http://vital-alb-77951349.us-east-1.elb.amazonaws.com',
  production: true
};
