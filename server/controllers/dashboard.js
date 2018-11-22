const User = require("../models/user");
const jwt = require ("jwt-simple");
const config = require("../../config");

exports.update = (req, res, next) => {
  const {groups} = req.body;
  const {authorization} = req.headers;
  const id = jwt.decode(authorization, config.secret).sub;
  User.findOneAndUpdate({"_id": id}, {$set:{"groups.$[group].title" : "gfdsgf"}},  //update a group title
    {arrayFilters: [{"group.title" : "lmao"}], new: true}, (err, updated) => {
      console.log(updated)
    })
};