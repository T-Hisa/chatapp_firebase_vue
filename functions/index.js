// 諸々初期化処理
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const serviceAccount = require("./serviceAccount.json");
adminConfig.credential = admin.credential.cert(serviceAccount);
const adminApp = admin.initializeApp(adminConfig);
const db = functions.database.instance("chat-app-db732-default-rtdb");
const adminDb = adminApp.database();
const auth = functions.auth;
// const auth = functions.auth;

// これより関数を定義
exports.addMessage = functions.https.onCall(() => {
  console.log("Hello, World!");
  console.log("function config", functions.config());
  return "message";
});

// exports.onUserCreate = db.ref("users").onCreate(() => {
//   // console.log("snapshot", snapshot);
//   // console.log("context", context);
//   console.log("invoked!!");
// });
exports.onUserCreated = auth.user().onCreate((user) => {
  console.log("userCreated!");
  const usersRef = adminDb.ref("users");
  const saveVal = {};
  const uid = user.uid;
  saveVal[uid] = {
    email: user.email,
  };
  return usersRef.set(saveVal).then((val) => {
    console.log("retVal", val);
  });
});
