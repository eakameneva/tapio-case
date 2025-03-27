import CircularProgress from '@mui/material/CircularProgress'
import Pagination from '@mui/material/Pagination'
import { useEffect, useMemo, useState } from 'react'
import PostItem from '../PostItem'
import { Button, Modal, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { IPost } from '../../store/postDTO'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { fetchAuthors, fetchPosts } from '../../store/thunks/postThunks'
import NewPost from '../NewPost'
import { getIsStringIncludesNormalized } from '../../helpers'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const POSTS_PER_PAGE = 6
const PAGE_OFFSET_CORRECTION = 1

function PostsList() {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null)
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [isCreateMode, setIsCreateMode] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { posts, authors, loading } = useSelector((state: RootState) => state.posts)
  const filteredSearchedPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        getIsStringIncludesNormalized(post.title, searchQuery) || getIsStringIncludesNormalized(post.body, searchQuery)
    )
  }, [posts, searchQuery])

  const totalPages = Math.ceil(filteredSearchedPosts.length / POSTS_PER_PAGE)

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts())
    }
  }, [dispatch, posts.length])

  useEffect(() => {
    if (!Object.keys(authors).length) {
      dispatch(fetchAuthors())
    }
  }, [dispatch, authors])

  useEffect(() => {
    if (totalPages > 0) {
      setPage((prevPage) => (prevPage > totalPages ? totalPages : prevPage))
    }
  }, [totalPages])

  useEffect(() => {
    const pageOffset = (page - PAGE_OFFSET_CORRECTION) * POSTS_PER_PAGE
    const currentPosts = filteredSearchedPosts.slice(pageOffset, pageOffset + POSTS_PER_PAGE)

    setFilteredPosts(currentPosts)
  }, [page, filteredSearchedPosts])

  return (
    <div className='max-w-6xl mx-auto flex flex-col justify-items-center items-center'>
      {loading ? (
        <CircularProgress className='m-auto' />
      ) : (
        <>
          <div className='flex justify-between w-full'>
            <TextField
              autoFocus
              aria-label='Search'
              className='max-w-xl w-full'
              placeholder='Type to search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isAuthenticated && (
              <Button variant='outlined' startIcon={<AddIcon />} onClick={() => setIsCreateMode(true)}>
                Add New Post
              </Button>
            )}
          </div>
          <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 w-full'>
            {filteredPosts.length < 1 ? (
              <>
                <div />
                <div className='flex flex-col items-center w-full'>
                  <DotLottieReact src='/no-posts-animation.lottie' loop autoplay />
                  <p>No posts found</p>
                </div>
              </>
            ) : (
              filteredPosts.map((post) => <PostItem key={post.id} post={post} onClick={() => setSelectedPost(post)} />)
            )}
          </div>
          <Modal open={!!selectedPost} onClose={() => setSelectedPost(null)}>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
              <h2 className='text-2xl text-lightTurquoise font-semibold mb-1'>{selectedPost?.title}</h2>
              <p className='text-darkText'>{selectedPost?.body}</p>
            </div>
          </Modal>

          <div className='flex justify-center mt-6'>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              size='large'
              variant='outlined'
              shape='rounded'
            />
          </div>
        </>
      )}
      <NewPost isOpen={isCreateMode} onClose={() => setIsCreateMode(false)} />
    </div>
  )
}

export default PostsList
