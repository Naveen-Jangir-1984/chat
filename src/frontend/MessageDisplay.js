const MessageDisplay = ({ msg, messages, conversation }) => {
  return (
    <div className="w-full h-[90%] flex flex-col box-border overflow-y-auto px-[10px] mt-[15px]">
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
              <div key={message.id} className="w-full">
                <div
                  className={`max-w-[80%] min-h-[5%] my-[5px] ${conversation.sentBy === message.sentBy ? `float-right` : `float-left`}`}>
                  <div
                    className={`text-xs text-gray-400 ${conversation.sentBy === message.sentBy ? `align-right` : `align-left`}`}>{message.time}</div>
                  <div className={`w-full rounded-[5px] px-[20px] py-[10px] box-border mt-[3px] shadow-md ${conversation.sentBy === message.sentBy ? `bg-blue-200` : `bg-white`}`}>{message.text}</div>
                </div>
              </div>
            ))
        ) : (
          <div></div>
        )}
        <div ref={msg} />
      </>
    </div >
  )
}

export default MessageDisplay;