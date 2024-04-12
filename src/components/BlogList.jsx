import { Blog } from "./Blog";


export const BlogList = ({blogs, handleUpdateBlogDisplay, handleRemovedBlogDisplay}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleUpdateBlogDisplay={handleUpdateBlogDisplay} handleRemovedBlogDisplay={handleRemovedBlogDisplay} />
      ))}
    </div>
  );
};
