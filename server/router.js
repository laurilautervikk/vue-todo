const express = require("express");
const router = express.Router();
const { Todos } = require("./dbConnection");

/* router.get("/calc", function (req, res) {
  const a = 4;
  const b = 4;
  const result = a + b;
  res.send({ result });
}); */

//Get all todos
router.get("/get-todos", async function (request, response) {
  const result = await Todos.find();
  //console.log(result);
  response.send(result);
});

//Get one todo
router.get("/get-todo/:id", async function (request, response) {
  const result = await Todos.findOne({ _id: request.params.id });
  console.log(result);
  response.send(result);
});

//Change one todo state
router.patch("/patch-todo/:id", async function (request, response) {
  //console.log("BE started");
  let state = await Todos.findOne({ _id: request.params.id });
  //console.log("BE state: ", state.status);
  //set value for update query, based on current state from db
  let flipflop = "";
  if (state.status === "ACTIVE") {
    flipflop = "DONE";
  } else {
    flipflop = "ACTIVE";
  }
  //display state value
  //console.log('BE flipflop ', flipflop);
  const result = await Todos.updateOne(
    { _id: request.params.id },
    { $set: { status: flipflop } }
  );
  console.log("state Flipped to: ", flipflop);
  response.send(result);
});

//Delete one todo
router.post("/delete-todo/:id", async function (request, response) {
  const result = await Todos.deleteOne({ _id: request.params.id });
  console.log(result);
  response.send(result);
});

//Add a new todo
router.post("/add-todo", async function (request, response) {
  if (request.body.title) {
    await Todos.create(request.body);
    console.log("BE Add todo");
  }
  response.send("BE Add todo done");
});

module.exports = router;
