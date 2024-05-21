import { Blog } from './Blog'
import PropTypes from 'prop-types'

export const BlogList = ({
  blogs,
  handleUpdateBlogDisplay,
  handleRemovedBlogDisplay,
}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdateBlogDisplay={handleUpdateBlogDisplay}
          handleRemovedBlogDisplay={handleRemovedBlogDisplay}
        />
      ))}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleRemovedBlogDisplay: PropTypes.func.isRequired,
  handleUpdateBlogDisplay: PropTypes.func.isRequired,
}
