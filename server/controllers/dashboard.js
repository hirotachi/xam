const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../../config");

const secret = process.env.CONFIG_SECRET || config.secret;

exports.create = (req, res, next) => { //add group to user groups
  const { group } = req.body;
  const { authorization } = req.headers;
  const id = jwt.decode(authorization, secret).sub;
  User.findOneAndUpdate({ "_id": id }, { $addToSet: { groups: group } }, { new: true }, (err, data) => {
    if (err) { return next(err) }
    const group = data.groups[data.groups.length - 1];
    res.status(200).json(group);
  });
};

exports.view = (req, res, next) => { // list all groups for user
  const { authorization } = req.headers;
  const id = jwt.decode(authorization, secret).sub;
  User.findById({ "_id": id }, (err, user) => {
    if (err) { return next(err) }
    const { groups } = user;
    res.status(200).json(groups);
  });
};

exports.remove = (req, res, next) => {
  const { groupId, groups } = req.body;
  const { authorization } = req.headers;
  const id = jwt.decode(authorization, secret).sub;
  User.findOneAndUpdate({ "_id": id }, { $pull: { groups: { _id: groupId } } }, { new: true }, (err, update) => {
    if (err) { return next(err) }
    if (groups.length > update.groups.filter(group => !!group).length) {
      return res.json({ success: true })
    }
  })
};

exports.save = (req, res, next) => {
  const { authorization } = req.headers;
  const { groupId, group } = req.body;
  const id = jwt.decode(authorization, secret).sub;
  User.findOneAndUpdate({ "_id": id, "groups._id": groupId },
    { $set: { "groups.$": group } }, { new: true }, (err, updated) => {
      if (err) { return next(err) }
      const { groups } = updated;
      res.send(groups)
    })
};

exports.update = (req, res, next) => {
  const { groups } = req.body;
  const { authorization } = req.headers;
  const id = jwt.decode(authorization, secret).sub;
  User.findOneAndUpdate({ "_id": id }, { $set: { "groups.$[group].title": "gfdsgf" } },  //update a group title
    { arrayFilters: [{ "group.title": "Title" }], new: true }, (err, updated) => {
      console.log(updated)
    })
};