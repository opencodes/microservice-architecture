/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  console.info(`${req.method} ${req.originalUrl}`);
  next();
});
const posts = {};

app.get("/post/posts", (req, res) => {
  res.send(posts);
});

app.post("/post/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/event-bus/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/post/events", (req, res) => {
  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
