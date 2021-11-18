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
  console.log(result);
  response.send(result);
});

//Get one todo
router.get("/get-todo/:id", async function (request, response) {
  const result = await Todos.findOne({ _id: request.params.id });
  console.log(result);
  response.send(result);
});

//Change one todo
router.patch("/patch-todo/:id", async function (request, response) { //NOT WORKING
  const result = await Todos.updateOne({ _id: request.params.id },{$set: {STATUS: req.body.STATUS}});
  console.log("/patch-todo/:id ",result);//NOT WORKING
  response.send("/patch-todo/:id ",result);//NOT WORKING
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
    console.log("Lisa todo");
  }
  response.send("done");
});

module.exports = router;
