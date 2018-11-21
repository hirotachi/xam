const Authentication = require("./controllers/authentication");
const passportService= require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", {session: false})

module.exports = (app) => {
  app.get("/auth", requireAuth, (req, res, next) => {
    res.send({success: true});
  });
  app.post("/signup", Authentication.signUp);
};