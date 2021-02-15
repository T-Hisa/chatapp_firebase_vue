'use strict'
const admin = require('firebase-admin')
const path = require('path')
const serviceAccount = require('./serviceAccount.json')
const bucketURL = 'gs://chat-app-db732.appspot.com/'
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketURL
})
const bucket = app.storage().bucket()
const project = process.env.PROJECT
const fileName = `${project}/settings.js`
const fileRef = bucket.file(fileName)
const localFilePath = path.resolve(__dirname, 'src/config/settings.js')

const setupStorage = () => {
  fileRef.exists().then(flag => {
    if (flag[0]) {
      fileRef.download({
        destination: localFilePath
      }).catch(e => {
        console.log('download error!', e)
      })
    } else {
      console.log('file not exist!!!')
    }
  })
}
setupStorage();
