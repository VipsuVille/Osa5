import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new Blog</h2>

      <form onSubmit={addBlog}>
        <input id="title"
          value={newTitle}
          onChange={handleTitleChange}
          placeholder='title tahan'
        /> <br />
        <input id="author"
          value={newAuthor}
          onChange={handleAuthorChange}
          placeholder='author tahan'
        /> <br />
        <input id="url"
          value={newUrl}
          onChange={handleUrlChange}
          placeholder='urli tahan'
        />
        <br />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm