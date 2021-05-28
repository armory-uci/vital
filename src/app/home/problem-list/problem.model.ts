export interface IProblem {
  serverId: string;
  id: string; // This is "legacy" stuff. Don't want to edit this for now. And it serves no purpose as well
  title: string;
  difficulty: string;
  status: string;
  language: string;
  problemId: string;
}
