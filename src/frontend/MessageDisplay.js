const MessageDisplay = ({ msg, messages, conversation }) => {
  return (
    <div className="message-display">
      <>
        {conversation.sentTo ? (
          messages
            .filter(
              (message) =>
                (message.sentBy === conversation.sentBy &&
                  message.sentTo === conversation.sentTo) ||
                (message.sentTo === conversation.sentBy &&
                  message.sentBy === conversation.sentTo),
            )
            .map((message) => (
              <div key={message.id} className="message-layer">
                <div
                  className="message"
                  style={{
                    float:
                      conversation.sentBy === message.sentBy
                        ? "right"
                        : "left",
                  }}
                >
                  <div style={{
                    textAlign: conversation.sentBy === message.sentBy
                      ? "right"
                      : "left", fontSize: 'xx-small'
                  }}>{message.time}</div>
                  <div>{message.text}</div>
                </div>
              </div>
            ))
        ) : (
          <div></div>
        )}
        <div ref={msg} />
      </>
    </div>
  )
}

export default MessageDisplay;