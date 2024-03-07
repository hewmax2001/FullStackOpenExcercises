const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
require('dotenv')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  if (blogs) {
    return response.json(blogs)
  } else {
    return response.status(404).end()
  }
})
  
blogRouter.post('/',  middleware.userExtractor, async (request, response) => {
  const body = request.body
  const requestUser = request.user
  console.log(requestUser)
  // If user's id is not found within the token, invalid for this operation or in general
  if (!requestUser) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(requestUser.id)
  const newBlog = new Blog(body)
  newBlog.user = user.id

  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogRouter.delete('/:id',  middleware.userExtractor, async (request, response) => {
  const user = request.user
  console.log(user)
  // If user's id is not found within the token, invalid for this operation or in general
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(request.params.id)

  if (!( blog.user.toString() === user.id )) {
    return response.status(401).json({ error: 'blog can only be deleted by the user that created it '})
  }
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  )

  return response.json(updatedBlog)
})

module.exports = blogRouter