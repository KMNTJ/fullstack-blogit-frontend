import { useState, useEffect } from "react";
import { Blog, NewBlog } from "./components/Blog";
import Login from "./components/Login";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [creationStatus, setCreationStatus] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const createBlog = async (blog) => {
    await blogService.createNew(blog);
    setCreationStatus("success");
  };

  return (
    <div>
      {!user ? (
        <div>
          {errorMessage}
          <Login
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          ></Login>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          <NewBlog
            createThisBlog={createBlog}
            creationStatus={creationStatus}
          ></NewBlog>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
