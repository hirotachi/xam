const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const userSchema = new Schema ({
  userName: {type: String, unique: true, lowercase: true},
  email: {type: String, unique: true, lowercase: true},
  password: String
});

userSchema.pre("save", function (next){
  const user = this;
  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => next(err))
});

const userModelClass = mongoose.model("user", userSchema);

module.exports = userModelClass;