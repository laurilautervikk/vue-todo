const mongoose = require("mongoose");

// Connecting to database
mongoose.connect(
  "mongodb+srv://hapukapsas:<password>@cluster1.ckjul.mongodb.net/todoapp?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String },
  status: { type: String },
});

const Todos = mongoose.model("todos", TodoSchema);

module.exports = {
  Todos,
};
