const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp();
// const db = functions.database;
// const auth = functions.auth;
exports.addMessage = functions.https.onCall((data, context) => {
  console.log("Hello, World!");
  console.log("data", data);
  console.log("context", context);
  return "message";
});

