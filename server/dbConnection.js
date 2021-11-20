const mongoose = require("mongoose");

// Connecting to database without local DNS correction
/* mongoose.connect(
  "mongodb://hapukapsas:hapukapsas@cluster1-shard-00-00.ckjul.mongodb.net:27017,cluster1-shard-00-01.ckjul.mongodb.net:27017,cluster1-shard-00-02.ckjul.mongodb.net:27017/todoapp?ssl=true&replicaSet=atlas-13b4s0-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true }
); */

mongoose.connect(
  "mongodb+srv://hapukapsas:hapukapsas@cluster1.ckjul.mongodb.net/todoapp?retryWrites=true&w=majority",
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
