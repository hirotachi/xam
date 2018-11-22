const authentication = require("./controllers/authentication");
const checker = require("./controllers/checker");
const passportService= require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", {session: false})

module.exports = (app) => {
  app.get("/auth", requireAuth, (req, res, next) => {
    res.send({success: true});
  });
  app.post("/signup", authentication.signUp);
  app.post("/check", checker.check)
};