export interface IAuthor {
  id: number
  username: string
}

export interface IPost {
  id: number
  userId: number
  title: string
  body: string
  authorName?: string
}
