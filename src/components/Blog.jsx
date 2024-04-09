import { useState, forwardRef, useImperativeHandle } from "react";

export const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

export const NewBlog = forwardRef(({ createThisBlog }, ref) => {
  const [author, setAuthor] = useState([]);
  const [title, setTitle] = useState([]);
  const [url, setUrl] = useState([]);

  const handleCreateBlog = () => {
    let blog = {
      title: title,
      author: author,
      url: url,
    };
    createThisBlog(blog);
  };

  useImperativeHandle(ref, () => {
    return { clearInputFields };
  });

  const clearInputFields = () => {
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <div>
        title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button onClick={handleCreateBlog}>Create</button>
    </div>
  );
});
