import PropTypes from 'prop-types'

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  console.log('username', username)
  console.log('password', password)
  return (
    <div>
      <h2>Please log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
Login.propTypes = {
  username: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default Login
