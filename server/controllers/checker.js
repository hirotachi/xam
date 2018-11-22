const User = require("../models/user");



exports.check = (req, res, next) => {
  const {userName, email, currentCheck} = req.body;
  if(!!userName && currentCheck === "userName"){
    User.findOne({userName}, (err, existingUser) => {
      if(err){next(err)}
      if(existingUser){
        return res.send({userNameUsed: true});
      }else {
        return res.send({userNameUsed: false});
      }
    })
  }else if(!!email && currentCheck === "email"){
    User.findOne({email}, (err, existingUser) => {
      if(err){next(err)}
      if(existingUser){
        return res.send({emailUsed: true});
      }else {
        return res.send({emailUsed: false});
      }
    })
  }
};