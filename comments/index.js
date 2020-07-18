/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();

app.use(bodyParser.json());

const comments = {};

app.get("/post/:id/comment", function (req, res) {
  const postId = req.params.id;
  res.status(201).send(comments[postId] || []);
});

app.post("/post/:id/comment", function (req, res) {
  const postId = req.params.id;
  const comment = req.body.comment;
  const id = randomBytes(4).toString("hex");
  !comments[postId] ? (comments[postId] = []) : null;
  const commentObj = {
    id,
    comment,
  };
  comments[postId].push(commentObj);
  res.status(201).send(commentObj);
});

app.listen(4002, () => {
  console.log("Micro Service - Comments : Listening on port 4002");
});
