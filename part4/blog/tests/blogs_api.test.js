const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    // Creates an array of promise objects that link to the save function of the blog objects
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('Initial blogs are saved:', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blog property \'id\' is not \'_id\'', async () => {
        const response = await api.get('/api/blogs')
        const hasidList = response.body.map((blog) => blog.hasOwnProperty('id'))
        assert.strictEqual(hasidList.length, helper.initialBlogs.length)
        hasidList.forEach((hasId) => {
            assert.ok(hasId)
        })
    })

    describe('adding a blog', () => {

        test('with valid data can be added ', async () => {
            const newBlog = helper.singleBlog

            const response = await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            const allBlogs = await helper.getAllBlogs()
            
            // Testing if database's total blogs has incremented
            assert.strictEqual(allBlogs.length, helper.initialBlogs.length + 1)
            
            // Created blog should be the same as the lastest blog in the array
            // Error/Failiure could arise if database does not return latest blog as last element in array
            const latestBlog = allBlogs[allBlogs.length - 1]
            const blogResponse = response.body

            assert.deepStrictEqual(latestBlog, blogResponse)
        })

        test('with missing likes property, will default likes to 0', async () => {

            // Create a copy so future tests aren't affected
            const newBlog = {...helper.singleBlog}
            // Deleting the likes property
            delete newBlog.likes

            const response = await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            assert.strictEqual(response.body.likes, 0)
        })

        test('with missing url & title properties, will reject with 400 response code', async () => {
            const newBlog = {...helper.singleBlog}

            delete newBlog.title
            delete newBlog.url

            const response = await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const allBlogsResponse = await api
                .get('/api/blogs')
                .expect(200)
            
            const blogToDelete = allBlogsResponse.body[0]
            const id = blogToDelete.id

            const deleteResponse = await api
                .delete(`/api/blogs/${id}`)
                .expect(204)

            const checkDeleted = await api
                .get('/api/blogs')
                .expect(200)

            // Map to array of ids and check if our id is found?
            // Filter through array and return if id is found?
            // CHOSEN: Filter array for the deleted id, check if returned array length is 0

            const hasId = checkDeleted.body.filter((blog) => blog.id === id)
            assert.strictEqual(hasId.length, 0)
        })
    })

    describe('updating a blog', () => {
        test('succeeds updating likes with status code 200 & changed likes property', async () => {
            const allBlogsResponse = await api
            .get('/api/blogs')
            .expect(200)

            // Range of likes change
            const max = 10
            const min = 0
        
            const blogToUpdate = allBlogsResponse.body[0]
            const id = blogToUpdate.id
            const newLikes = {
                likes: blogToUpdate.likes + (Math.floor(Math.random() * (max - min + 1)) + min)
            }

            // Testing if response returns updated blog
            const updateResponse = await api
                .put(`/api/blogs/${id}`)
                .send(newLikes)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.strictEqual(newLikes.likes, updateResponse.body.likes)

            // Testing if database returned with updated blog
            // Changed to just get single blog by id
            const checkUpdated = await api
                .get('/api/blogs')
                .expect(200)

            const checkUpdatedBlog = checkUpdated.body.filter((blog) => blog.id === id)

            assert.strictEqual(newLikes.likes, checkUpdatedBlog[0].likes)
            
            
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})