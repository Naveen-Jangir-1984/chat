const Login = ({ username, password, setUsername, setPassword, handleLogin, loginError }) => {
  return (
    <div className="login">
      <div className="panel">
        <div className="credential">
          <input
            type="text"
            value={username}
            placeholder="enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          disabled={!username.length || !password.length}
          onClick={() => handleLogin()}
        >Login</button>
        {loginError && (
          <div className="login-error">Incorrect Username or Password!</div>
        )}
      </div>
    </div>
  )
}

export default Login