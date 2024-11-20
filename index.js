const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

mongoose.connect("mongodb://127.0.0.1:27017/test");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.get("/get", async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    res.json(todos);
  } catch (error) {
    res.status(500).json("Sorry, Something went wrong!");
  }
});
app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((error) =>
      res.status(400).json("Please provide a valid task name!")
    );
});
app.patch("/edit_task_name/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  console.log(id, task);
  if (task.length !== 0) {
    TodoModel.findByIdAndUpdate(id, { task: task }, { new: true })
      .then((result) => res.json(result))
      .catch(() =>
        res.status(400).json("Sorry, the task name couldn't be changed!")
      );
  } else {
    throw new Error("Provide a task name");
  }
});
app.patch("/update/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  TodoModel.findByIdAndUpdate(id, { completed: req.body.completed })
    .then((result) => res.json(result))
    .catch(() => res.status(400).json("Sorry, the task does not exist!"));
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log(`You are about to delete ${id}`);
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch(() => res.status(400).json("Couldn't Delete the unknown task!"));
});
app.listen(port, () => {
  console.log(`Server is listening on port:${port}`);
});
