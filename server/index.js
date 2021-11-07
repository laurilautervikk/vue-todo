const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const port = 3000;
const routes = require("./router");


app.get("/", (req, res) => {
  res.send("Hello World 2!");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/api", routes);
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
