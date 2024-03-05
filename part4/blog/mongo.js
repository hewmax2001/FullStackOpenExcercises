const mongoose = require('mongoose')
const config = require('./utils/config')
const Blog = require('./models/blog')


if (process.argv.length<3) {
  console.log('Arguments must include password, then name, then number')
  process.exit(1)
}

const url = config.TESTURI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blog = new Blog({
  author: "Test Author",
  
})


person.save().then(savedPerson => {
  console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
  mongoose.connection.close()
})