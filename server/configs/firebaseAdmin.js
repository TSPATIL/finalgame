var admin = require("firebase-admin");

var serviceAccount = require("./final-project-9a212-firebase-adminsdk-4lbfq-7123055594.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;