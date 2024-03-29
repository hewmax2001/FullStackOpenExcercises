import { useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from './Togglable';
import { displayNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { Link } from 'react-router-dom'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => [...state.blogs].sort((a, b) => a.likes > b.likes ? -1 : 1))
    const userDetails = useSelector(state => state.user)

    const blogFormRef = useRef();

    const handleBlogCreate = async (blog) => {
        blogFormRef.current.toggleVisibility();
        dispatch(createBlog(blog, { username: userDetails.username}))
        dispatch(displayNotification(`a new blog ${blog.title} by ${blog.author} added`, 'notifSuccess', 5))
    };

    return (
        <div>
            {userDetails &&
                (
                <div>
                    <Togglable buttonLabel={"New Blog"} ref={blogFormRef}>
                        <CreateBlog handleBlogCreate={handleBlogCreate} />
                    </Togglable>
                </div>
                )
            }
            {blogs.map((blog) => (
                <div key={blog.id} className='boxStyle'> 
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
      ))}
        </div>
    )
}

export default BlogList