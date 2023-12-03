import Actions from "./Actions"
import MessageDisplay from "./MessageDisplay"

const Conversation = ({
  msg, users, message, messages, conversation, setMessage, handleTyping, handleSend
}) => {
  return (
    <div className="conversation">
      <MessageDisplay msg={msg} messages={messages} conversation={conversation} />
      {users.filter(user => user.id === conversation.sentTo).length
        && users.filter(user => user.id === conversation.sentTo)[0].isTyping
        ? <div className="typing">
          <div className="text">typing...</div>
        </div> : ''}
      <Actions
        message={message}
        setMessage={setMessage}
        conversation={conversation}
        handleSend={handleSend}
        handleTyping={handleTyping}
      />
    </div>
  )
}

export default Conversation