import { useState } from 'react'

const Blog = ({blog, update}) => {
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
  <div style = {blogStyle}>
     <div style={hideWhenVisible}>
    {blog.title} {<button onClick={toggleVisibility}>info</button>}
  </div>
  <div style={showWhenVisible}>
  {blog.title} {<button onClick={toggleVisibility}>info hide</button>}<br/>
  {blog.author}<br/>
  {blog.url}<br/>
  {blog.likes}{<button onClick={update}>LIKEME!</button>}<br/>
   
    </div>
  </div>  
)}




export default Blog