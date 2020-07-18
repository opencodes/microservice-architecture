/** @format */

const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const app = express();
const posts = {};
app.use(bodyParser.json());
app.get("/post", function (req, res) {
  res.status(201).send(posts);
});

app.post("/post", function (req, res) {
  const id = randomBytes(16).toString("hex");
  const body = req.body.title;
  posts[id] = req.body.title;
  res.status(201).send({
    id,
    title: body,
  });
});

app.listen(4001, () => {
  console.log("Micro Service - POSTS : Listening on port 4001");
});
