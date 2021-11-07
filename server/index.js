const express = require("express");
const app = express();
const port = 3000;
const routes = require("./router");

app.get("/", (req, res) => {
  res.send("Hello World 2!");
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
