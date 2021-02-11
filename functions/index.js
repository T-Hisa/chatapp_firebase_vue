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
// exports.addMessage = functions.https.onCall(() => {
//   console.log("Hello, World!");
//   console.log("function config", functions.config());
//   return "message";
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

exports.
    onCreateDirectChat = db.ref("/chat/direct/{userId}/{partnerId}/{chatId}")
        .onCreate((snapshot, context) => {
          console.log("onCreateDirectChat!!");
          const value = snapshot.val();
          if (value.which === "you") {
            return null;
          }
          console.log("snapshot.val()", value);
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
          promises.push(notify("chat-direct", notifyParams));
          // promises.push(notifyChat("direct", context.params));
          const pairChatRef = adminDb
              .ref(`/chat/direct/${partnerId}/${userId}/${chatId}`);
          promises.push(pairChatRef.set(saveVal));
          return Promise.all(promises);
        });

exports.onCreateGroupsChat = db.ref("chat/groups/{groupId}/{chatId}")
    .onCreate((_, context) => {
      console.log("onCreateDirectChat!!");
      const {uid} = context.auth;
      const {groupId} = context.params;
      const promises = [];
      return adminDb.ref(`groups/${groupId}`).once("value", (snapshot) => {
        const value = snapshot.val();
        const {memberIds} = value;
        for (const memberId of Object.keys(memberIds)) {
          if (memberId === uid) break;
          const notifyParams = {
            toId: memberId,
            fromId: groupId,
          };
          promises.push(notify("chat-groups", notifyParams));
        }
        return Promise.all(promises);
      });
    });

const notify = (type, params) => {
  const {fromId, toId} = params;
  const notifyRef = adminDb.ref(`notifications/${toId}`);
  const newNotifyKey = notifyRef.push().key;
  return notifyRef.child(newNotifyKey).set({
    type,
    fromId,
  });
};

const writeUsersGroupIds = (uid, gid, type) => {
  if (type === "remove") {
    return adminDb.ref(`users/${uid}/groupIds/${gid}`).remove();
  } else {
    return adminDb.ref(`users/${uid}/groupIds/${gid}`).set(0);
  }
};

exports.onWriteGroup = db.ref("groups/{groupId}").onWrite((change, context) => {
  console.log("onWriteGroup!");
  const {uid} = context.auth;
  const prevVal = change.before.val() || {};
  const aftVal = change.after.val() || {};
  const prevMemberIds = Object.keys((prevVal.memberIds || {}));
  const aftMemberIds = Object.keys((aftVal.memberIds || {}));
  let isDeletePhysical = false;
  if (aftMemberIds.length === 0) isDeletePhysical = true;
  const {isDelete} = aftVal;
  const {groupId} = context.params;
  const promises = [];
  if (!isDeletePhysical) {
    if (isDelete) {
      promises.push(writeUsersGroupIds(uid, groupId, "remove"));
      for (const prevMemberId of prevMemberIds) {
        if (prevMemberId !== uid) {
          const notifyParams = {
            fromId: groupId,
            toId: prevMemberId,
          };
          promises.push(notify("delete-group", notifyParams));
          promises.push(writeUsersGroupIds(prevMemberId, groupId, "remove"));
        }
      }
    } else {
      promises.push(writeUsersGroupIds(uid, groupId, "set"));
      for (const aftMemberId of aftMemberIds) {
        if (!(aftMemberId === uid || prevMemberIds.includes(aftMemberId))) {
          const notifyParams = {
            fromId: groupId,
            toId: aftMemberId,
          };
          promises.push(notify("entry-group", notifyParams));
          promises.push(writeUsersGroupIds(aftMemberId, groupId, "set"));
        }
      }
      for (const prevMemberId of prevMemberIds) {
        if (!(aftMemberIds.includes(prevMemberId) || prevMemberId === uid)) {
          const notifyParams = {
            fromId: groupId,
            toId: prevMemberId,
          };
          promises.purhs(notify("leave-group", notifyParams));
          promises.push(writeUsersGroupIds(prevMemberId, groupId, "remove"));
        }
      }
    }
  }
  return Promise.all(promises);
});
