const log = require('./logger')
const jwt = require('jsonwebtoken')
require('dotenv')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    log.error(error.message)

    // List of custom errors in a separate file
    // This function iterates through all and finds the matching one
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique'})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token missing or invalid' })
    } else if (error.name === 'TokenExpireError') {
        return response.status(401).json({ error: 'token expired' })
    } else if (error.name === 'Password Length') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// Should token extractor exist as middleware outside of userExtractor?
// Will there ever be a reason to use the tokenExtractor without userExtractor?
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    } else {
        request.token = null
    }
    console.log(request.token)
    next()
}

// This middleware MUST be loaded AFTER tokenExtractor
const userExtractor = (request, response, next) => {
    // Need to catch this error
    // As a result userExtractor can only justify to exist in the context of operations that require a token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const { id, username } = decodedToken
    // If user's id is not found within the token, invalid for this operation or in general
    if (!decodedToken.id) {
      request.user = null
    } else {
        request.user = {
            id,
            username
        }
    }
    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}