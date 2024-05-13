export interface IRepository {
  id: number;
  name: string;
  owner: {
    avatar_url: string;
  };
  stargazers_count: number;
  description: string;
  language: string;
}

export interface IGitHubApiResp {
  items: IRepository[];
}
