export interface ISandbox {
  terminalUrl: string;
  websiteUrl: string;
  arn: string;
}

export interface IRetryResponse {
  isUp: boolean;
  isRetriesExhausted: boolean;
}

export interface IProblemContent {
  content: {
    explore?: string;
    exploit?: string;
    mitigate?: string;
  };
}

export interface IProblemStatusResponse {
  solved: boolean;
}
