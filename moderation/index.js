const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  if (event?.type === "CommentCreated") {
    if (event?.data?.content.toLowerCase().includes("orange"))
      event.data.status = "rejected";
    else event.data.status = "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: { ...event.data },
    });
  }

  res.send({ status: "OK" });
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
