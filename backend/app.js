const express = require('express');
const bodyparser = require('body-parser');
const path = require("path");

const routes = require("./routes/router")

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use("/", express.static(path.join(__dirname, "frontend")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(routes);
//expermenting for default routes
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "frontend", "index.html"))
// });
module.exports = app;
