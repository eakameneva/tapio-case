import { IPost } from '../store/postDTO'
import { SortValues } from '../types'

export const getSortedPosts = (sortValue: SortValues, posts: IPost[]) => {
  if (sortValue === SortValues.DEFAULT) {
    return posts
  }
  const postsCopy = [...posts]
  if (sortValue === SortValues.AUTHOR_ASC) {
    postsCopy.sort((a, b) => a.authorName.localeCompare(b.authorName))
  }
  if (sortValue === SortValues.AUTHOR_DESC) {
    postsCopy.sort((a, b) => b.authorName.localeCompare(a.authorName))
  }
  if (sortValue === SortValues.TITLE_ASC) {
    postsCopy.sort((a, b) => a.title.localeCompare(b.title))
  }
  if (sortValue === SortValues.TITLE_DESC) {
    postsCopy.sort((a, b) => b.title.localeCompare(a.title))
  }
  return postsCopy
}
