import Header from "./Header";
import Users from "./Users";
import Conversation from "./Conversation";

const Chat = ({
  users,
  msg,
  message,
  messages,
  setMessage,
  conversation,
  handleTyping,
  handleSend,
  handleLogout,
  handleUserSelection
}) => {
  return (
    <div className="chat">
      <Header handleLogout={handleLogout} />
      <div className="user-conversations">
        <Users
          users={users}
          conversation={conversation}
          handleUserSelection={handleUserSelection}
        />
        <Conversation
          msg={msg}
          users={users}
          message={message}
          messages={messages}
          setMessage={setMessage}
          conversation={conversation}
          handleTyping={handleTyping}
          handleSend={handleSend}
        />
      </div>
    </div>
  )
}

export default Chat