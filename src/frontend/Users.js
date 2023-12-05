const Users = ({ users, conversation, handleUserSelection }) => {
  return (
    <div className="w-1/4 h-full border-r-[1px] border-dotted border-black box-border p-[10px]">
      {users.map(
        (user) =>
          user.id !== conversation.sentBy && (
            <div
              key={user.id}
              className={`my-[5px] rounded-[5px] px-[15px] py-[10px] box-border cursor-pointer flex justify-between items-center shadow-lg ${conversation.sentTo === user.id ? `bg-blue-200` : `bg-white`}`}
              onClick={() => {
                handleUserSelection(user.id)
              }}
            >
              <div>{user.firstname} {user.lastname}</div>
              <div
                className={`w-[10px] h-[10px] border-none rounded-full ${user.isLogged ? `bg-green-500` : `bg-gray-300`}`}
              >
              </div>
            </div>
          ),
      )}
    </div>
  )
}

export default Users