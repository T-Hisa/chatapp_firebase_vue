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

exports.onWriteDirectChat = db.ref("/chat/direct/{userId}/{partnerId}/{chatId}")
    .onWrite((change, context) => {
      console.log("onWriteDirectChat!!");
      const value = change.after.val();
      if (value.which === "you") {
        return null;
      }
      console.log("change", JSON.stringify(change));
      console.log("context", JSON.stringify(context));
      const {userId, partnerId, chatId} = context.params;
      const {body, timestamp} = value;
      const saveVal = {
        body,
        timestamp,
        which: "you",
      };
      const promises = [];
      const notifyParams = {
        fromId: userId,
        toId: partnerId,
      };
      promises.push(notifyChat("direct", notifyParams));
      // promises.push(notifyChat("direct", context.params));
      const pairChatRef = adminDb
          .ref(`/chat/direct/${partnerId}/${userId}/${chatId}`);
      promises.push(pairChatRef.set(saveVal));
      return Promise.all(promises);
    });

exports.onWriteGroupsChat = db.ref("chat/groups/{groupId}/{chatId}")
    .onWrite((_, context) => {
      console.log("onWriteDirectChat!!");
      const {uid} = context.auth;
      const {groupId} = context.params;
      const promises = [];
      return adminDb.ref(`groups/${groupId}`).once("value", (snapshot) => {
        const value = snapshot.val();
        const {memberIds} = value;
        for (const memberId of Object.keys(memberIds)
            .filter((id) => id !== uid)) {
          const notifyParams = {
            toId: memberId,
            fromId: groupId,
          };
          promises.push(notifyChat("groups", notifyParams));
        }
        return Promise.all(promises);
      });
    });

const notifyChat = (type, params) => {
  const {fromId, toId} = params;
  const notifyRef = adminDb.ref(`notifications/${toId}`);
  const newNotifyKey = notifyRef.push().key;
  return notifyRef.child(newNotifyKey).set({
    type,
    fromId,
  });
};
