import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = (blogObject) => {

    noteFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log('response: ', returnedBlog )
        console.log('...response: ', { ...returnedBlog  })
        console.log('...response, user: ', { ...returnedBlog , user })
        setBlogs(blogs.concat({ ...returnedBlog , user }))
        setErrorMessage(
          `Blog '${blogObject.title}' has been added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    console.log(blogs)
  }
  const newLikeUpdate = (blog) => {
    const find = blogs.find(theOne => theOne.id === blog.id)
    const newBlog = { ...find, likes: find.likes +1 }
    blogService
      .update(blog.id, newBlog)
      .then(() => {
        const blogi = [...blogs]
        const update = blogi.find(element => element.id === blog.id)
        blogi[blogi.indexOf(update)].likes += 1
        setBlogs(blogi.sort(function (a,b) {
          return b.likes < a.likes
        }))
      })
  }
  const DeleteBlog = (blog) => {
    if (window.confirm ('really wanna delete')) {
      const find = blogs.find(theOne => theOne.id === blog.id)
      console.log(1)
      blogService
        .letsRemove(blog.id)
        .then(() => {
          setBlogs(blogs.sort(function (a, b) {
            return a.likes - b.likes
          }).filter(p => p.id !== find.id))

        })
    }
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  const noteFormRef = useRef()

  const removeUser = () => {
    window.localStorage.clear()
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :

        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={removeUser}>Logg out</button></p>
          <Togglable buttonLabel="new Blog" ref={noteFormRef}>
            <BlogForm createBlog={addNote} />
          </Togglable>
          <p>BLOGS:</p>

          <div>{blogs.sort(function (a, b) {
            return b.likes - a.likes
          }).map(blog =>
            <Blog key={blog.id} blog={blog} update={() => newLikeUpdate(blog)} joukko = {user.username === blog.user.username && <button onClick={() => DeleteBlog(blog)}>Delete</button>}/>

          )}</div>

        </div>
      }
    </div>
  )
}


export default App
