const Actions = ({ message, conversation, setMessage, handleSend, handleTyping }) => {
  return (
    <div className="actions">
      <textarea
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
      <button disabled={!message.length} onClick={() => handleSend()}>
        Send
      </button>
    </div>
  )
}

export default Actions;