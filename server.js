import express from "express";
import mongoose from "mongoose";
import Data from "./data.js";
import Videos from "./dbModel.js";
const app = express();
const PORT = 9000;

// middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeaders("Access-Control-Allow-Origin", "*"),
    res.setHeaders("Access-Control-Allow-Headers", "*"),
    next();
});
const connection_url =
  "mongodb://admin:HSCqhmmgIxXQFk7B@cluster0-shard-00-00.fbee2.mongodb.net:27017,cluster0-shard-00-01.fbee2.mongodb.net:27017,cluster0-shard-00-02.fbee2.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-n12cvj-shard-0&authSource=admin&retryWrites=true&w=majority";
// const connection_url =
//   "mongodb+srv://admin:ZPtmrxpKzBhGQJGw@cluster0.fbee2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.get("/v1/posts", (req, res) => {
  res.status(200).send(Data);
});

app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/v2/posts", (req, res) => {
  console.log(req.body);
  const dbvideos = req.body;
  Videos.create(dbvideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.listen(PORT, () => {
  console.log(PORT);
});
