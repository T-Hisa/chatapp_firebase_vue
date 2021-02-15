const admin = require('firebase-admin')
const path = require('path')
const serviceAccount = require('./serviceAccount.json')
const bucketURL = 'gs://chat-app-db732.appspot.com/'
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketURL
})
const bucket = app.storage().bucket()
const project = 'sample'
const fileRef = bucket.file(`${project}/settings.js`)
const localFilePath = path.resolve(__dirname, 'settings.js')

const setupStorage = () => {
  fileRef.download({
    destination: localFilePath
  }).catch(e => {
    console.log('error', e)
  })
}
setupStorage();