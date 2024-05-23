import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'
import userEvent from '@testing-library/user-event'

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
