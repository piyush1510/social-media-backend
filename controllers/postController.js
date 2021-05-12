const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

module.exports.create = (req, res) => {
  const file = req.file;
  const title = req.body.title;
  const content = req.body.content;
  const user = req.user;
  if (!file || !title || !content || !user) {
    if (file) {
      fs.unlink(path.join(__dirname, '../', 'public', file.filename), (err) => {
        res.sendStatus(409);
        console.log({message: err.message});
      });
      return res.sendStatus(422);
    }
  } else {
    const newPost = new Post(title, content, file.filename, user.id);
    newPost
      .save()
      .then((response) => {
        res.json(newPost);
      })
      .catch((err) => {
          console.log({message:err.message});
        res.sendStatus(500);
      });
  }
};

