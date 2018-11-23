const Authentication = require("./controllers/authentication");
const Dashboard = require("./controllers/dashboard");
const checker = require("./controllers/checker");
const passportService= require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", {session: false});
const requireLogin = passport.authenticate("local", {session: false});

module.exports = (app) => {
  app.get("/auth", requireAuth, (req, res, next) => {
    res.send({success: true});
  });
  app.post("/signup", Authentication.signUp);
  app.post("/login", requireLogin, Authentication.login);
  app.post("/dashboard/create", requireAuth, Dashboard.create);
  app.get("/dashboard/view", requireAuth, Dashboard.view);
  app.post("/dashboard/remove", requireAuth, Dashboard.remove);
  app.post("/check", checker.check)
};