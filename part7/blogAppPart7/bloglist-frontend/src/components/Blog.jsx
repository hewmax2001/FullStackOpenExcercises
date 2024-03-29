import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog, commentBlog } from "../reducers/blogReducer";
import { useMatch } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const Blog = (props) => {
  const dispatch = useDispatch()
  const match = useMatch('blogs/:id')
  const allBlogs = useSelector(state => state.blogs)
  const blog = match ?
    allBlogs.find(b => b.id === match.params.id) :
    null

  const userDetails = useSelector(state => state.user)

  if (!blog)
    return null

  const removable = () => {
    if (!blog.user || !userDetails) return false;
    return blog.user.username === userDetails.username ? true : false
  }

  const removeBlog = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }
    dispatch(deleteBlog(blog))
  }

  const comment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(commentBlog(blog, comment))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <p>{blog.likes} likes</p>
        <Button size="small" variant="contained" color="primary" onClick={() => dispatch(likeBlog(blog))}>like</Button>
      </div>
      <p>added by {blog.author}</p>
      {removable() && <Button size="small" variant="contained" color="primary" onClick={removeBlog}>remove</Button>}
      <h3>Comments</h3>
      <form onSubmit={comment}>
        <p>Comment:</p>
        <div>
          <TextField label="Comment" name="comment" type="text" />
        </div>
        <div>
          <Button size="small" variant="contained" color="primary" type="submit">add comment</Button>
        </div>
      </form>
      <ul>
        {blog.comments.map((com) => (
          <li key={com}>{com}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
