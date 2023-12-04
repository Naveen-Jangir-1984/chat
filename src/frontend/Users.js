const Users = ({ users, conversation, handleUserSelection }) => {
  return (
    <div className="users">
      {users.map(
        (user) =>
          user.id !== conversation.sentBy && (
            <div
              key={user.id}
              className="user"
              style={{
                backgroundColor:
                  conversation.sentTo === user.id
                    ? "lightblue"
                    : "white",
              }}
              onClick={() => {
                handleUserSelection(user.id)
              }}
            >
              <div>{user.firstname} {user.lastname}</div>
              <div
                className="status"
                style={{ backgroundColor: user.isLogged ? "green" : "lightgrey" }}>
              </div>
            </div>
          ),
      )}
    </div>
  )
}

export default Users