const express = require('express');

const app = express();

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

app.use('/api/getRefer', (req, res, next) => {
  const refer = [{
    id: "fd345",
    title: "Some title",
    content: "some content"
  },
  {
    id: "ed345",
    title: "Some title2",
    content: "new content"
  },
]
  res.status(200).json({
    message: "get successfully",
    posts: refer
  });
});

module.exports = app;
