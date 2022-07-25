import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'

const App = () => {
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  


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
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(
          `Blog '${blogObject.title}' has been added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  const newLikeUpdate = (blog) => {
    const find = blogs.find(theOne => theOne.id === blog.id)
    const newBlog = { ...find, likes: find.likes +1}
       
    blogService
      .update(blog.id, newBlog) 
    /*  .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })*/ 
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

  const removeUser = (event) => {
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
         
          <div>{blogs.map(blog =>
        <Blog key={blog.id} blog={blog} update={newLikeUpdate(blog)}/>
      )}</div>
         
        </div>
      }
    </div>
  )
        }
     
      
        

export default App
