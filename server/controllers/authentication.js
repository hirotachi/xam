const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../../config");
const statusConfig = require("../../existEncrypt");

const secret = process.env.CONFIG_SECRET || config.secret;
const statusSecret = process.env.STATUS_CONFIG || statusConfig.secret;
const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret)
};
const statusEncrypt = (status) => {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: status, iat: timestamp}, statusSecret)
};

exports.signUp = (req, res, next) => {
  const { userName, email, password } = req.body;
  const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if ( !userName || (!email || !emailReg.test(email)) || !password ) { // if one of the fields is empty return error
    return res.status(422).send({ error: "you must provide and fill fields correctly" });
  }

  User.findOne({ userName }, (err, existingUser) => { // another check for email and username when submitted
    if ( err ) {
      return next(err)
    }
    if ( existingUser ) {
      return res.send({status: statusEncrypt("409")})
    } else {
      User.findOne({ email }, (err, existingUser) => {
        if ( err ) {
          return next(err)
        }
        if ( existingUser ) {
          return res.send({status: statusEncrypt("409")})
        } else {
          User.create({ userName, email, password,  groups: []}, (err, user) => {
            if ( err ) {
              return next(err)
            }
            res.json({ token: tokenForUser(user) });
          })
        }
      })
    }
  })
};
//=======================================================================
exports.login = (req, res, next) => {
  res.send({token: tokenForUser(req.user)})
};