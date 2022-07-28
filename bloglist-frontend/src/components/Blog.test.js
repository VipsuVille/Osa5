import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author', () => {
  const blog = {
    title:'Component testing is done with react-testing-library',
    likes: 123333,
    author: 'outoo',
    url: 'asd'
  }
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect (div).toHaveTextContent(blog.title)
  expect (div).toHaveTextContent(blog.author)
  expect (div).not.toHaveTextContent(blog.url)
  expect (div).not.toHaveTextContent(blog.likes)


  screen.debug()
})
test('show all', async ()  => {


  const blog = {
    title:'Component testing is done with react-testing-library',
    likes: 12333,
    author: 'outoo',
    url: 'asd'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog2')

  const user = userEvent.setup()
  const sendButton = screen.getByText('info')
  await user.click(sendButton)


  expect (div).toHaveTextContent(blog.title)
  expect (div).toHaveTextContent(blog.author)
  expect (div).toHaveTextContent(blog.url)
  expect (div).toHaveTextContent(blog.likes)
})
test('2 likes', async ()  => {


  const blog = {
    title:'Component testing is done with react-testing-library',
    likes: 12333,
    author: 'outoo',
    url: 'asd'
  }
  const mockHandler = jest.fn()
  render(<Blog blog={blog} update={mockHandler} joukko="null"/>)

  const user2 = userEvent.setup()
  const sendButton = screen.getByText('LIKEME!')
  await user2.click(sendButton)
  await user2.click(sendButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})