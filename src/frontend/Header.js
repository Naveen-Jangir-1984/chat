const Header = ({ handleLogout }) => {
  return (
    <div className="header">
      <button className="logout" onClick={() => handleLogout()}>Logout</button>
    </div>
  )
}

export default Header;