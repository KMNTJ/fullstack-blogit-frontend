import { useState, useEffect, useRef } from "react";
import { Blog, NewBlog } from "./components/Blog";
import { Togglable } from "./components/Togglable";
import Login from "./components/Login";
import { EventMessage } from "./components/EventMessage";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [eventMessage, setEventMessage] = useState(null);
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

  const handleMessageDisplayEvent = async (message) => {
    setEventMessage(message);
    setTimeout(() => {
      setEventMessage(null);
    }, 5000);
  };

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
      handleMessageDisplayEvent({
        content: "Wrong credentials",
        type: "error",
      });
    }
  };

  const handleLogout = async () => {
    let loggingOut = user;
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    handleMessageDisplayEvent({
      content: `Logged out user ${loggingOut.username}`,
    });
  };
  
  const blogFormTogglingRef = useRef();

  const createBlog = async (blog) => {
    try {
      const response = await blogService.createNew(blog);
      const addedBlog = response.data;
      setBlogs(blogs.concat(addedBlog));
      setCreationStatus("success");
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
      <EventMessage key={eventMessage?.content} message={eventMessage} />
      {!user ? (
        <div>
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
          <Togglable
            buttonLabel={"Open Blog creation"}
            ref={blogFormTogglingRef}
          >
            <NewBlog
              createThisBlog={createBlog}
              creationStatus={creationStatus}
            ></NewBlog>
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
