const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// Do not need try-catch blocks thanks to express-async-errors package

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  if (blogs) {
    return response.json(blogs)
  } else {
    return response.status(404).end()
  }
})
  
blogRouter.post('/', async (request, response) => {
  const newBlog = new Blog(request.body)

  const result = await newBlog.save()
  return response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
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