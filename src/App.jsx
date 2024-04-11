import { useState, useEffect, useRef } from "react";
import { BlogTopLevel } from "./components/BlogTopLevel";
import Login from "./components/Login";
import { EventMessage } from "./components/EventMessage";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [eventMessage, setEventMessage] = useState(null);

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
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          <BlogTopLevel></BlogTopLevel>
        </div>
      )}
    </div>
  );
};

export default App;
