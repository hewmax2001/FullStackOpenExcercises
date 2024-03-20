import { useState } from 'react'

const Blog = ({ blog, likeBlog, removable }) => {

  const [visible, setVisible] = useState(false)

  const toggledOn = { display: visible ? '' : 'none' }
  const toggledOff = { display: visible ? 'none' : '' }

  const boxStyle = {
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className={'boxStyle'}>
      <div style={toggledOff} className='toggledOff'>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={toggledOn} className='toggledOn'>
        <div>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <p>{blog.url}</p>
        <div>
              likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button>
        </div>
        {blog.author}
        { removable && <button onClick={() => removable(blog)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog