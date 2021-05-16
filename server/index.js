const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3001;
const TodoModel = require("./models/Data");

app.use(express.json());
app.use(cors());

mongoose.connect(
  //"mongodb://localhost:27017/todo",
  "mongodb+srv://MatejKuchar:Heslo1556@todo.aoeg2.mongodb.net/tododb?retryWrites=true&w=majority",

  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const title = req.body.title;
  const text = req.body.text;
  const category = req.body.category;
  const dateTime = req.body.dateTime;

  const todo = new TodoModel({
    title: title,
    text: text,
    category: category,
    dateTime: dateTime,
  });

  try {
    await todo.save();
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  TodoModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await TodoModel.findByIdAndRemove(id).exec();

  res.send("deleted");
});

app.listen(port, () => {
  console.log("server running on port: " + port);
});
