const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');
const {response} = require('express');

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
        console.log({message: err.message});
        res.sendStatus(500);
      });
  }
};

module.exports.getAll = (req, res) => {
  Post.getAll()
    .then(([data, fields]) => {
      console.log(req.user, data);
      res.json({user: req.user, posts: data});
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

module.exports.getOne = (req, res) => {
  if (!req.params.id) return res.sendStatus(402);
  Post.getOne(req.params.id)
    .then(([data, fields]) => {
      if (data.length != 1) return res.sendStatus(404);
      res.json({user: req.user, post: data[0]});
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

module.exports.remove = (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(403);
  }
  Post.remove(id, req.user.id)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};
