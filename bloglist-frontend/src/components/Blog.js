import { useState } from 'react'

const Blog = ({ blog, update, joukko }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return (
    <div style = {blogStyle} className = "Allblogs">
      <div style={hideWhenVisible} className='blog'>
        {blog.title} {blog.author} {<button id="info" onClick={toggleVisibility}>info</button>}
      </div>
      <div style={showWhenVisible} className='blog2'>
        {blog.title} {<button onClick={toggleVisibility}>info hide</button>}<br/>
        {blog.author}<br/>
        {blog.url}<br/>
        <span id="testilike"> {blog.likes}{<button onClick={update}>LIKEME!</button>}</span><br/>
        <span id="delete">{joukko}</span>
      </div>
    </div>
  )}




export default Blog