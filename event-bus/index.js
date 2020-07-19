/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.info(`${req.method} ${req.originalUrl}`);
  next();
});
const events = [];

app.post("/event-bus/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://localhost:4000/post/events", event);
  axios.post("http://localhost:4001/comment/events", event);
  axios.post("http://localhost:4002/query/events", event);
  axios.post("http://localhost:4003/moderate/events", event);

  res.send({ status: "OK" });
});

app.get("/event-bus/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
