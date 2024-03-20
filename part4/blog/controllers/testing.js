const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
 
  response.status(204).end()
})

router.post('/create_test_blogs', async (request, response) => {
  const blogObjects = helper.initialBlogs
  .map(blog => new Blog(blog))
  // Creates an array of promise objects that link to the save function of the blog objects
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  response.status(204).end()
})
module.exports = router