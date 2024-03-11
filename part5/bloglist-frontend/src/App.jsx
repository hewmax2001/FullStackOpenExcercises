import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import '../styles.css'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userDetails, setUserDetails] = useState(null)
  const [message, setMessage] = useState(null)
  const [notifClass, setNotifClass] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort((a, b) => a.likes > b.likes ? -1 : 1 ) )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUserDetails(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (() => {
    window.localStorage.removeItem('loggedBlogUser')
    setUserDetails(null)
  })

  const handleBlogCreate = async (blog) => {
    blogFormRef.current.toggleVisibility()
    const response = {
      ...await blogService.createBlog(blog),
      user: {
        username: userDetails.username
      }
    }
    setBlogs(blogs.concat(response))
    setNotifClass('notifSuccess')
    setMessage(`a new blog ${response.title} by ${response.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const removeBlog = async (blog) => {

    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }

    const response = await blogService.removeBlog(blog)

    /* Removing by index splicing does not mirror the changes despite the state explicitly changing */
    // const index = blogs.findIndex(b => b.id === blog.id)
    // const blogsCopy = blogs
    // blogsCopy.splice(index, 1)
    // console.log(blogsCopy)
    // setBlogs(blogsCopy)

    setBlogs(blogs.filter(b => b.id === blog.id ? null : b))
  }

  const removableBlog = (blog) => {
    // Catches if userDetails has yet to be defined AND if blog does not have a user associated
    try {
      if (blog.user.username === userDetails.username)
        return removeBlog
    } catch {
      return false
    }
    return false
  }

  const likeBlog = async (blog) => {
    const likedBlog = await blogService.likeBlog(blog)
    setBlogs(blogs.map(b => b.id === likedBlog.id ? likedBlog : b))
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} notifStyle={notifClass} />
      {userDetails ?
        <div>
          {userDetails.name} logged in
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
            <CreateBlog handleBlogCreate={handleBlogCreate} />
          </Togglable>
        </div>
        :
        <Togglable buttonLabel={'Login'}>
          <LoginForm setUserDetails={setUserDetails}/>
        </Togglable>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removable={removableBlog(blog)} />
      )}
    </div>
  )
}

export default App