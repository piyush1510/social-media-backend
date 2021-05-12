const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

module.exports.create = async (req, res) => {
  const file = req.file;
  if (!req.body.email || !req.body.name || !req.body.password || !file) {
   return res.sendStatus(422);
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const newUser = new User(
      req.body.email,
      req.body.name,
      hashedPassword,
      file.filename
    );
    newUser
      .save()
      .then((response) => {
        User.getUserByEmail(req.body.email)
          .then(([data, field]) => {
            const user = data[0];
            jwt.sign(
              {
                id: user.id,
                name: user.name,
                email: user.email,
              },
              process.env.token_key,
              (err, token) => {
                if (err) {
                  res.sendStatus(500);
                } else {
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                    },
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        fs.unlink(
          path.join(__dirname, '../', 'public', file.filename),
          (err) => {
            res.sendStatus(409);
            console.log({message: err.message});
          }
        );
      });
  }
};

module.exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.sendStatus(409);
  }
  User.getUserByEmail(req.body.email).then(async ([data, fields]) => {
    if (!data.length) {
      return res.sendStatus(401);
    }
    const user = data[0];
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.sendStatus(401);
    }
    jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.token_key,
      (err, token) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      }
    );
  });
};
module.exports.validate = (req,res,next)=>{
    if(!req.headers['authorization']) {
        return res.sendStatus(401);
    }
    const token = req.headers['authorization'].split(' ')[1]
    if(!token){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.token_key,(err,decoded)=>{
        if(err){
            return res.sendStatus(401);
        }
        req.user=decoded;
        next();
    })
}