const brcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password.length < 3) {
        const e = new Error('password length must equal or exceed 3 characters in length')
        e.name = "Password Length"
        throw e
    }
    const saltRounds = 10
    const passwordHash = await brcrypt.hash(password, saltRounds)
    
    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { title: 1, url: 1, likes: 1 })

    response.json(users)
})

module.exports = userRouter