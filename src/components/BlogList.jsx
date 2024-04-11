import { Blog } from "./Blog";


export const BlogList = ({blogs, handleUpdateBlogDisplay}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleUpdateBlogDisplay={handleUpdateBlogDisplay} />
      ))}
    </div>
  );
};
