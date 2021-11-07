const express = require("express");
const router = express.Router();

/* router.get("/calc", function (req, res) {
  const a = 23;
  const b = 24;
  const d = new Date();
  const result = String(a + b + " ---- " + d);

  res.send(result);
}); */

const exampleTodos = [
  {
    title: "Do something",
    status: "ACTIVE",
  },
  {
    title: "Clean stuff",
    status: "ACTIVE",
  },
  {
    title: "Feed the cats",
    status: "COMPLETE",
  },
];

router.get("/get-todos", function (req, res) {
  res.send(exampleTodos);
});

// POST method route
router.post("/post-todos", function (req, res) {
  exampleTodos.push(req.data);
  console.log("request: ", req);
  console.log("new list: ", exampleTodos);
  res.send("You made a successful POST request to the homepage");
});

module.exports = router;
