const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../../config");

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
};

exports.signUp = (req, res, next) => {
  console.log(req.body)
  const {userName, email, password} = req.body;
  const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!userName || (!email || !emailReg.test(email))|| !password){
    return res.status(422).send({error: "you must provide and fill fields correctly"});
  }
  User.findOne({email}, (err, existingUser) => {
    if(err) {return next(err)}
    if(existingUser){
      return res.status(422).send({error: "email is in use"})
    }else {
      User.findOne({userName}, (err, existingUser) => {
        if(err) {return next(err)}
        if(existingUser){
          return res.status(422).send({error: "Username is in use"})
          }else {
          User.create({userName, email, password}, (err, user) => {
            if(err) {return next(err)}
            res.json({token: tokenForUser(user)});
          })
        }
      })
    }
  })
};