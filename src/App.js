import axios from "axios";
import { useState, useEffect, useRef } from "react";

import "./styles.css";
import Login from "./frontend/Login";
import Header from "./frontend/Header";

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
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  const msg = useRef(null);
  const scrollToBottom = () => {
    if (msg.current) {
      msg.current.scrollIntoView({ behaviour: 'smooth', block: "end" });
    }
  };
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
    const date = d.getDate();
    const month = d.getMonth();
    const newMessage = {
      id: id,
      sentBy: conversation.sentBy,
      sentTo: conversation.sentTo,
      text: message,
      time:
        days[day] +
        ", " +
        (Number(date) > 9 ? date : "0" + date) +
        " " +
        months[month] +
        ", " +
        (Number(hour) > 9 ? hour : "0" + hour) +
        ":" +
        (Number(minute) > 9 ? minute : "0" + minute),
    };
    axios
      .post("https://qqhwxz-8080.csb.app/updateMessage", newMessage)
      .then(({ data }) => console.log(data.status));
    axios
      .post("https://qqhwxz-8080.csb.app/typing", {
        id: conversation.sentBy, isTyping: false
      })
      .then(({ data }) => {
        console.log(data.status)
        data.status === "success" && scrollToBottom()
      });
    setMessage("");
  };
  const handleTyping = (flag) => {
    axios
      .post("https://qqhwxz-8080.csb.app/typing", {
        id: conversation.sentBy, isTyping: flag
      })
      .then(({ data }) => console.log(data.status));
  }
  const handleLogout = () => {
    axios
      .post("https://qqhwxz-8080.csb.app/logout", {
        id: conversation.sentBy,
      })
      .then(({ data }) => console.log(data.status));
    setConversation({ sentBy: 0, sentTo: 0 });
  };
  // useEffect(() => { scrollToBottom() }, [])
  useEffect(() => {
    const eventSource = new EventSource("https://qqhwxz-8080.csb.app/events");
    const updateData = (messageEvent) => {
      const data = JSON.parse(messageEvent.data);
      setUsers(data.users);
      setMessages(data.messages);
    };
    eventSource.addEventListener("message", updateData);
    scrollToBottom()
    return () => eventSource.close();
  }, [messages]);

  return (
    <div className="app">
      {conversation.sentBy ? (
        <div className="chat">
          <Header handleLogout={handleLogout} />
          <div className="user-conversations">
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
                            ? "white"
                            : "whitesmoke",
                      }}
                      onClick={() => handleUserSelection(user.id)}
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
            <div className="conversation">
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
              {users.filter(user => user.id === conversation.sentTo).length
                && users.filter(user => user.id === conversation.sentTo)[0].isTyping
                ? <div className="typing">
                  <div className="text">typing...</div>
                </div> : ''}
              <div className="user-input">
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
            </div>
          </div>
        </div>
      ) :
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          loginError={loginError}
        />
      }
    </div >
  );
};

export default App;
