const Actions = ({ message, conversation, setMessage, handleSend, handleTyping }) => {
  return (
    <div className="w-full h-[10%] flex justify-between items-center px-[10px] box-border">
      <textarea
        className="w-[78%] h-[70%] box-border p-[10px] resize-none overflow-hidden"
        type="text"
        rows="14"
        cols="10"
        wrap="soft"
        maxLength="200"
        value={message}
        disabled={!conversation.sentTo}
        placeholder={
          !conversation.sentTo
            ? "select a user to type"
            : "type a message"
        }
        onChange={(e) => {
          const text = e.target.value
          handleTyping(text.length ? true : false)
          setMessage(text)
        }
        }
      />
      <button
        className="w-[20%] h-[70%]"
        disabled={!message.length}
        onClick={() => handleSend()}>
        Send
      </button>
    </div>
  )
}

export default Actions;