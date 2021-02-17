'use strict'
const admin = require('firebase-admin')
const path = require('path')
let project = process.env.PROJECT
const wholeSettings = require('./settings.js')
if (!wholeSettings.hasOwnProperty(project)) {
  project = "default"
}
const settings = wholeSettings[project]
const {serviceAccount} = settings
const bucketURL = settings.bucketURL
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketURL
})
const bucket = app.storage().bucket()
const fileName = 'config/settings.js'
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
