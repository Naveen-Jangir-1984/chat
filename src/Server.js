const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const PORT = 8080;

const sendData = async (res) => {
  const database = fs.readFileSync("./DB.json");
  res.write("event: message\n");
  res.write("data: " + JSON.stringify(JSON.parse(database)));
  res.write("\n\n");
};

app.get("/events", async (_, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  await sendData(res);
  res.end();
});

app.post("/updateMessage", (req, res) => {
  fs.readFile("./DB.json", (err, data) => {
    if (err) console.log(err);
    const message = req.body;
    data = JSON.parse(data);
    data.messages.push(message);
    fs.writeFileSync("./DB.json", JSON.stringify(data, null, 2));
    res.end(JSON.stringify({ status: "success" }));
  });
});

app.post("/login", (req, res) => {
  fs.readFile("./DB.json", (err, data) => {
    if (err) console.log(err);
    const form = req.body;
    data = JSON.parse(data);
    data.users.map((user) => {
      if (user.id === Number(form.id) && user.password === form.password) {
        user.isLogged = true;
      }
      return user;
    });
    fs.writeFileSync("./DB.json", JSON.stringify(data, null, 2));
    res.end(JSON.stringify({ status: "success" }));
  });
});

app.post("/logout", (req, res) => {
  fs.readFile("./DB.json", (err, data) => {
    if (err) console.log(err);
    const form = req.body;
    data = JSON.parse(data);
    data.users.map((user) => {
      if (user.id === form.id) {
        user.isLogged = false;
      }
      return user;
    });
    fs.writeFileSync("./DB.json", JSON.stringify(data, null, 2));
    res.end(JSON.stringify({ status: "success" }));
  });
});

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
