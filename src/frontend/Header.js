const Header = ({ handleLogout }) => {
  return (
    <div className="w-full h-[10%] border-dotted border-b-[1px] border-black flex justify-end items-center px-2 py-1 box-border">
      <button
        className="px-3 py-1 hover:bg-red-300"
        onClick={() => handleLogout()}>Logout</button>
    </div>
  )
}

export default Header;