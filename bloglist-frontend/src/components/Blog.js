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
    <div style = {blogStyle} >
      <div style={hideWhenVisible} className='blog'>
        {blog.title} {blog.author} {<button onClick={toggleVisibility}>info</button>}
      </div>
      <div style={showWhenVisible} className='blog2'>
        {blog.title} {<button onClick={toggleVisibility}>info hide</button>}<br/>
        {blog.author}<br/>
        {blog.url}<br/>
        {blog.likes}{<button onClick={update}>LIKEME!</button>}<br/>
        {joukko}
      </div>
    </div>
  )}




export default Blog