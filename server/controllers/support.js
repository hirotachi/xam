const mail = require("../services/mail");
exports.send = (req, res, next) => {
  const message = req.body;
  mail(message)
    .then(term => res.status(200).send(term)).catch(err => next(err));
};