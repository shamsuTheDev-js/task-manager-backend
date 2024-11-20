const { default: mongoose } = require("mongoose");
const mongodb = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
TodoSchema.pre("validate", function (next) {
  if (this.task.length === 0) {
    next(new Error("you must specify a new task name"));
    console.log("there is an error: " + JSON.stringify(this.task));
  } else {
    next();
  }
});

const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = TodoModel;
