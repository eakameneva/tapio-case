import { Modal } from '@mui/material'
import PostForm from '../PostForm'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { toast } from 'react-toastify'
import { addPost } from '../../store/thunks/postThunks'
import { IPost } from '../../store/postDTO'

interface INewPostProps {
  isOpen: boolean
  onClose: () => void
}

function NewPost({ isOpen, onClose }: INewPostProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { currentUser } = useSelector((state: RootState) => state.auth)

  const handleCreateSubmit = async (data: Partial<IPost>) => {
    const tempId = Date.now()
    const newPost = {
      ...data,
      id: tempId,
    }
    if (currentUser) {
      newPost.authorName = currentUser
    }
    await dispatch(addPost(newPost)).unwrap()
    toast.success('Post created successfully')
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
        <PostForm formTitle={'Create post'} onSubmit={handleCreateSubmit} />
      </div>
    </Modal>
  )
}

export default NewPost
