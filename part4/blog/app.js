const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
// Does it think i'm using typescript?
// YOU HAVE TO IMPORT THIS BEFORE IMPORTING THE ROUTERS!
require('express-async-errors')
const log = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const morgan = require('morgan')


const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        log.info('connected to MongoDB')
    })
    .catch((error) => {
        log.error('error connecting to MongoDB', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app