const credentials = process.env.NODE_ENV || require("../../supportApi");
const api_key = process.env.API_KEY || credentials.API_KEY;
const DOMAIN = process.env.DOMAIN || credentials.DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});



module.exports = ({ fullName, email, subject, message}) => {
  return new Promise ((resolve, reject) => {
    const data = {
      from: `${fullName} <${email}>`,
      to: process.env.SUPPORT_EMAIL || credentials.email,
      subject,
      text: message
    };
    mailgun.messages().send(data, function(error, body) {
      if(body && body.message && body.message.toLowerCase().includes("queued")){
        resolve({success: true})
      }
      reject({success: false})
    });
  });
};
