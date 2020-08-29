const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  console.log("Some Request");
  const event = req.body;
  try{
    await axios.post("http://posts-cluster-ip-srv:4000/events", event);
    await axios.post("http://comments-cluster-ip-srv:4001/events", event);
    await axios.post("http://query-cluster-ip-srv:4002/events", event);
    await axios.post("http://moderation-cluster-ip-srv:4003/events", event);
  }catch(e){
    console.log(e);
  }
  
  

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
