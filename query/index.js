const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    //console.log(postId);
    const post = posts[postId];
    //console.log(posts);
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    let comments = post.comments.map((comment) => {
      if (id === comment?.id) {
        comment = { content, status };
      }
      return comment;
    });
    post.comments = comments;
  }

  console.log(posts);

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
