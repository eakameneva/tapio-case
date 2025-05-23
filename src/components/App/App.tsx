import { Button, Modal } from '@mui/material'
import PostsList from '../PostsList'
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import AuthForm from '../AuthForm'
import { login, logout, signup } from '../../store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { AuthType, IUser } from '../../types'
import { usePrevious } from '../../hooks'

const TOAST_CLOSE_TIME = 2000

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const [authMode, setAuthMode] = useState<boolean>(false)
  const [formType, setFormType] = useState<AuthType>('signIn')
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { error } = useSelector((state: RootState) => state.posts)
  const isAuthenticatedPrevious = usePrevious(isAuthenticated)

  const handleAuthSubmit = (data: IUser) => {
    if (formType === 'signUp') {
      dispatch(signup(data))
    } else if (formType === 'signIn') {
      dispatch(login(data))
    }
  }

  const handleLogOut = () => {
    dispatch(logout())
  }

  const handleAuth = (authType: AuthType) => {
    setAuthMode(true)
    setFormType(authType)
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  useEffect(() => {
    if (isAuthenticated && isAuthenticatedPrevious === false) {
      setAuthMode(false)
      toast.success('Successfully logged in')
    }
  }, [isAuthenticated, isAuthenticatedPrevious])

  return (
    <>
      <Modal open={authMode} onClose={() => setAuthMode(false)}>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
          <AuthForm authType={formType} onSubmit={handleAuthSubmit} />
        </div>
      </Modal>
      <div className='min-h-screen px-6 py-8 bg-watercolor'>
        <header className='flex justify-between items-center w-full mb-8'>
          <h1 className='text-4xl font-extrabold font-amaticFont text-lightMauve mb-4 tracking-wide self-start'>
            MyBlog
          </h1>
          {isAuthenticated ? (
            <Button onClick={handleLogOut} variant='contained'>
              Log Out
            </Button>
          ) : (
            <div>
              <Button
                onClick={() => {
                  handleAuth('signIn')
                }}
                variant='contained'
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  handleAuth('signUp')
                }}
                variant='contained'
              >
                Sign Up
              </Button>
            </div>
          )}
        </header>
        <PostsList />
        <ToastContainer
          position='top-center'
          autoClose={TOAST_CLOSE_TIME}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme='light'
        />
      </div>
    </>
  )
}

export default App
