import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog) => {
  const response = await axios.post(baseUrl,
    blog,
    {
      headers: {
        'Authorization': token
      }
    })
  return response.data
}

const likeBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`,
    { likes: blog.likes + 1 }
  )
  console.log(response.data)
  return response.data
}

const removeBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`,
    {
      headers: {
        'Authorization': token
      }
    })
  return response.data
}

export default { getAll, createBlog, setToken, likeBlog, removeBlog }