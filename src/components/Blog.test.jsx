import { render, screen } from '@testing-library/react'
import { Blog, NewBlog } from './Blog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('By default renders blog`s title', () => {
  const blog = {
    title: 'blogiaihe',
  }

  const handleUpdateBlogDisplay = vi.fn()
  const handleRemovedBlogDisplay = vi.fn()

  render(
    <Blog
      blog={blog}
      handleUpdateBlogDisplay={handleUpdateBlogDisplay}
      handleRemovedBlogDisplay={handleRemovedBlogDisplay}
    />
  )

  const element1 = screen.getByText('blogiaihe')

  expect(element1).toBeDefined()
})

test('Once blogs `View` -button has been pressed, renders blog`s title, author, url and likes', async () => {
  const blog = {
    title: 'blogiaihe',
    author: 'kirjoittaja',
    likes: '15',
    url: 'linkki',
    userId: { name: 'lisääjä' },
  }

  const handleUpdateBlogDisplay = vi.fn()
  const handleRemovedBlogDisplay = vi.fn()

  render(
    <Blog
      blog={blog}
      handleUpdateBlogDisplay={handleUpdateBlogDisplay}
      handleRemovedBlogDisplay={handleRemovedBlogDisplay}
    />
  )

  const viewButton = screen.getByText('view')
  const user = userEvent.setup()
  await user.click(viewButton)

  const element1 = screen.getByText('15', { exact: false })
  const element2 = screen.getByText('linkki', { exact: false })
  const element3 = screen.getByText('lisääjä', { exact: false })

  expect(element1).toBeDefined()
  expect(element2).toBeDefined()
  expect(element3).toBeDefined()
})

test('Pressing like button n times triggers n calls to like handler function', async () => {
  const blog = {
    title: 'blogiaihe',
    author: 'kirjoittaja',
    likes: '15',
    url: 'linkki',
    userId: { name: 'lisääjä' },
  }

  const handleUpdateBlogDisplay = vi.fn()
  const handleRemovedBlogDisplay = vi.fn()

  render(
    <Blog
      blog={blog}
      handleUpdateBlogDisplay={handleUpdateBlogDisplay}
      handleRemovedBlogDisplay={handleRemovedBlogDisplay}
    />
  )

  const viewButton = screen.getByText('view')
  const user = userEvent.setup()
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  await user.click(likeButton)

  expect(handleUpdateBlogDisplay.mock.calls).toHaveLength(3)
})

test('New blog creation handle is called with necessary values upon new blog creation', async () => {
  const blog = {
    title: 'blogiaihe',
    author: 'kirjoittaja',
    url: 'linkki',
  }

  const createThisBlog = vi.fn()

  const { container } = render(<NewBlog createThisBlog={createThisBlog} />)

  const titleInput = container.querySelector(`input[name="title"]`)
  const authorInput = container.querySelector(`input[name="author"]`)
  const urlInput = container.querySelector(`input[name="url"]`)

  const user = userEvent.setup()
  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)

  const createButton = screen.getByText('Create')
  await user.click(createButton)

  expect(createThisBlog.mock.calls).toHaveLength(1)
  expect(createThisBlog.mock.calls[0][0]).toEqual(blog)
  
})
