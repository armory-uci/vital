export interface ISandbox {
  terminalUrl: string;
  websiteUrl: string;
  arn: string;
}

export interface IRetryResponse {
  isUp: boolean;
  isRetriesExhausted: boolean;
}
