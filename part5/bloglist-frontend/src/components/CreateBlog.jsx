import { useState } from 'react'

const CreateBlog = ({ handleBlogCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogSubmit = (event) => {
    event.preventDefault()
    handleBlogCreate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={createBlogSubmit}>
        <div>
                    title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id='title-input'
            data-testid='title-input'
          />
        </div>
        <div>
                    author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id='author-input'
            data-testid='author-input'
          />
        </div>
        <div>
                    url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id='url-input'
            data-testid='url-input'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default CreateBlog