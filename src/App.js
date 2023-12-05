import axios from "axios";
import { useState, useEffect, useRef } from "react";

import "./styles.css";
import Login from "./frontend/Login";
import Chat from "./frontend/Chat";

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
      msg.current.scrollIntoView({ behaviour: "smooth" });
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
        .post("http://localhost:8080/login", {
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
    setTimeout(() => scrollToBottom(), 1)
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
      .post("http://localhost:8080/updateMessage", newMessage)
      .then(({ data }) => console.log(data.status));
    axios
      .post("http://localhost:8080/typing", {
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
      .post("http://localhost:8080/typing", {
        id: conversation.sentBy, isTyping: flag
      })
      .then(({ data }) => console.log(data.status));
  }
  const handleLogout = () => {
    axios
      .post("http://localhost:8080/logout", {
        id: conversation.sentBy,
      })
      .then(({ data }) => console.log(data.status));
    setConversation({ sentBy: 0, sentTo: 0 });
  };
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/events");
    const updateData = (messageEvent) => {
      const data = JSON.parse(messageEvent.data);
      setUsers(data.users);
      setMessages(data.messages);
    };
    eventSource.addEventListener("message", updateData);
    return () => eventSource.close();
  }, [messages]);

  return (
    <div className="w-screen h-screen bg-gray-100">
      {conversation.sentBy ? (
        <Chat
          msg={msg}
          users={users}
          message={message}
          messages={messages}
          setMessage={setMessage}
          conversation={conversation}
          handleTyping={handleTyping}
          handleSend={handleSend}
          handleUserSelection={handleUserSelection}
          handleLogout={handleLogout}
        />
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
