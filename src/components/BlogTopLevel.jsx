import { useState, useEffect, useRef } from "react";
import blogService from "../services/blogs";
import { NewBlog } from "../components/Blog";
import { Togglable } from "../components/Togglable";
import { BlogList } from "../components/BlogList";

export const BlogTopLevel = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleUpdateBlogDisplay = (updatedBlog) => {
    const updatedBlogs = blogs.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog));
    setBlogs(updatedBlogs);
  };

  const blogFormTogglingRef = useRef();
  const clearBlogCreationFieldsRef = useRef();

  const createBlog = async (blog) => {
    try {
      const response = await blogService.createNew(blog);
      const addedBlog = response.data;
      setBlogs(blogs.concat(addedBlog));
      clearBlogCreationFieldsRef.current.clearInputFields();
      handleMessageDisplayEvent({
        content: `Added a new blog: ${addedBlog.title} by author ${addedBlog.author}`,
      });
    } catch (error) {
      console.log(error.message);
      handleMessageDisplayEvent({
        content: "Error on adding a blog",
        type: "error",
      });
    }
    blogFormTogglingRef.current.toggleDisplay();
  };

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel={"Open Blog creation"} ref={blogFormTogglingRef}>
        <NewBlog
          ref={clearBlogCreationFieldsRef}
          createThisBlog={createBlog}
        ></NewBlog>
      </Togglable>
      <BlogList
        blogs={blogs}
        handleUpdateBlogDisplay={handleUpdateBlogDisplay}
      ></BlogList>
    </div>
  );
};
