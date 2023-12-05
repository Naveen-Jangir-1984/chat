import Actions from "./Actions"
import MessageDisplay from "./MessageDisplay"

const Conversation = ({
  msg, users, message, messages, conversation, setMessage, handleTyping, handleSend
}) => {
  return (
    <div className="w-3/4 h-full box-border flex flex-col justify-around items-center">
      <MessageDisplay msg={msg} messages={messages} conversation={conversation} />
      {users.filter(user => user.id === conversation.sentTo).length
        && users.filter(user => user.id === conversation.sentTo)[0].isTyping
        ? <div className="w-full px-[10px] py-[5px] box-border">
          <div className="w-[50px] text-xs px-[10px] py-[5px] rounded-[5px]">typing...</div>
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