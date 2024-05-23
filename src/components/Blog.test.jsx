import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'
import { vi, test, expect } from 'vitest'

test('by default renders blog`s title', () => {
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
