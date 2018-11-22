const passport = require("passport");
const User = require("../models/user");
const config = require("../../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const localOptions = {
  usernameField: "userName"
};
const localLogin = new LocalStrategy(localOptions, (userName, password, done) => {
  User.findOne({userName}, (err, user) => {
    if(err) {return done(err)}
    if(!user){return done(null, false)}

    user.comparePassword(password, (err, isMatch) => {
        if(err) {return done(err)}
        if(!isMatch){return done(null, false)}

        return done(null, user)
    })
  })
});


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
      if(err) {return done(err, false)}
      if(user) {
         done(null, user)
      }else {
         done(null, false)
      }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);