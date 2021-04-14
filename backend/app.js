const express = require('express');

const app = express();

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
