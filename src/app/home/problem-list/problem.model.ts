export interface IProblem {
  serverId: string;
  id: string;
  title: string;
  difficulty: string;
  status: string;
}

export interface ILanguage {
  id: number;
  language: string;
  value: string;
  status: string;
}
