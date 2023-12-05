const Login = ({ username, password, setUsername, setPassword, handleLogin, loginError }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-2/5 h-1/5 flex flex-col justify-between items-center">
        <input
          className="w-96 h-12 px-4 py-2"
          type="text"
          value={username}
          placeholder="enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-96 h-12 px-4 py-2"
          type="password"
          value={password}
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={!username.length || !password.length}
          className={`w-96 h-12 py-2 bg-gray-100
          ${!username.length || !password.length
              ? `text-gray-300 bg-gray-50` : `text-black-400 bg-white`}`}
          onClick={() => handleLogin()}
        >Login</button>
        <div
          className={`${loginError ? `text-red-400` : `text-transparent`}`}
        >Incorrect Username or Password !</div>
      </div>
    </div>
  )
}

export default Login