import axios from "axios";
import { useState, useEffect } from "react";

import "./styles.css";

const App = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [conversation, setConversation] = useState({
    sentBy: 0,
    sentTo: 0,
  });
  const handleLogin = () => {
    if (username.length === 0 || password.length === 0) return;
    const filteredUsers = users.filter(
      (user) => user.id === Number(username) && user.password === password,
    );
    if (filteredUsers.length) {
      axios
        .post("https://qqhwxz-8080.csb.app/login", {
          id: username,
          password: password,
        })
        .then(({ data }) => console.log(data.status));
      setConversation({ ...conversation, sentBy: Number(username) });
      setLoginError(false);
      setUsername("");
      setPassword("");
    } else {
      setLoginError(true);
    }
  };
  const handleUserSelection = (id) => {
    setConversation({ ...conversation, sentTo: id });
  };
  const handleSend = () => {
    const d = new Date();
    const id = d.getTime();
    const day = d.getDay();
    const hour = d.getHours();
    const minute = d.getMinutes();
    const newMessage = {
      id: id,
      sentBy: conversation.sentBy,
      sentTo: conversation.sentTo,
      text: message,
      time:
        days[day] +
        " " +
        (Number(hour) > 9 ? hour : "0" + hour) +
        ":" +
        (Number(minute) > 9 ? minute : "0" + minute),
    };
    axios
      .post("https://qqhwxz-8080.csb.app/updateMessage", newMessage)
      .then(({ data }) => console.log(data.status));
    setMessage("");
  };
  const handleLogout = () => {
    axios
      .post("https://qqhwxz-8080.csb.app/logout", {
        id: conversation.sentBy,
      })
      .then(({ data }) => console.log(data.status));
    setConversation({ sentBy: 0, sentTo: 0 });
  };
  useEffect(() => {
    const eventSource = new EventSource("https://qqhwxz-8080.csb.app/events");
    const updateData = (messageEvent) => {
      const data = JSON.parse(messageEvent.data);
      setUsers(data.users);
      setMessages(data.messages);
    };
    eventSource.addEventListener("message", updateData);
    return () => eventSource.close();
  }, [messages]);

  return (
    <div className="app">
      {conversation.sentBy ? (
        <div className="chat">
          <div className="header">
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
          <div className="user-conversations">
            <div className="users">
              {users.map(
                (user) =>
                  user.id !== conversation.sentBy && (
                    <div
                      key={user.id}
                      style={{
                        fontWeight: conversation.sentTo ? "bold" : "normal",
                      }}
                      onClick={() => handleUserSelection(user.id)}
                    >
                      {`${user.firstname} ${user.lastname}`}
                    </div>
                  ),
              )}
            </div>
            <div className="conversation">
              <div className="message-display">
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
                      <div
                        key={message.id}
                        className="message"
                        style={{
                          textAlign:
                            conversation.sentBy === message.sentBy
                              ? "right"
                              : "left",
                        }}
                      >
                        <div>{message.text}</div>
                      </div>
                    ))
                ) : (
                  <div></div>
                )}
              </div>
              <div className="user-input">
                <textarea
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button disabled={!message.length} onClick={() => handleSend()}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="login">
          <div className="panel">
            <div className="credential">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={() => handleLogin()}>Login</button>
            {loginError && (
              <div className="login-error">Incorrect Username or Password!</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
