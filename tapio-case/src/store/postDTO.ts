export interface IUser {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  authorName?: string;
}
