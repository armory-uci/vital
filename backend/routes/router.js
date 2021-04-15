const express = require("express")

const router = express.Router()

router.post('/api/postRefer', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
})

router.get('/api/getRefer', (req, res, next) => {
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

module.exports = router;
