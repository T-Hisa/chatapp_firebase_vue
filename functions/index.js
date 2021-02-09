// 諸々初期化処理
// const dbInstance = require("./dbInstance");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const serviceAccount = require("./serviceAccount.json");
adminConfig.credential = admin.credential.cert(serviceAccount);
const adminApp = admin.initializeApp(adminConfig);
const db = functions.database;
// const db = functions.database.instance(dbInstance);
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
exports.onCreateUser = auth.user().onCreate((user) => {
  console.log("userCreated!");
  const usersRef = adminDb.ref("users");
  const saveVal = {};
  const uid = user.uid;
  saveVal[uid] = {
    email: user.email,
  };
  return usersRef.update(saveVal);
});

exports.onWriteDirectChat =db.ref("/chat/direct/{userId}/{partnerId}/{chatId}")
    .onWrite((snapshot, context) => {
      console.log("onCreateChat!!");
      const value = snapshot.after.val();
      if (value.which === "you") {
        return null;
      }
      console.log("snapshot", JSON.stringify(snapshot));
      console.log("context", JSON.stringify(context));
      const userId = context.params.userId;
      const partnerId = context.params.partnerId;
      const chatId = context.params.chatId;
      const {body, timestamp} = value;
      const saveVal = {
        body: body,
        timestamp: timestamp,
        which: "you",
      };
      const pairChatRef = adminDb
          .ref(`/chat/direct/${partnerId}/${userId}/${chatId}`);
      return pairChatRef.set(saveVal);
    });
