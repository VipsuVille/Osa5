import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './blogForm'
import userEvent from '@testing-library/user-event'

test('new blog is created', async () => {
  const user = userEvent.setup()
  const createBlog1 = jest.fn()

  render(<BlogForm createBlog={createBlog1} />)

  const title = screen.getByPlaceholderText('title tahan')
  const author = screen.getByPlaceholderText('author tahan')
  const url = screen.getByPlaceholderText('urli tahan')

  const sendButton2 = screen.getByText('save')
  await user.type(title, 'titleheh')
  await user.type(author, 'authorheh')
  await user.type(url, 'urlheh')
  await user.click(sendButton2)


  expect(createBlog1.mock.calls).toHaveLength(1)
  expect(createBlog1.mock.calls[0][0].title).toBe('titleheh')
  expect(createBlog1.mock.calls[0][0].author).toBe('authorheh')
  expect(createBlog1.mock.calls[0][0].url).toBe('urlheh')
})