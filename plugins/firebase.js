import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const config = {
  apiKey: 'AIzaSyD1pRphGib7I8QhwT-nPyNnbGImCVvLlXM',
  authDomain: 'drcallaway-8f12d.firebaseapp.com',
  projectId: 'drcallaway-8f12d',
  storageBucket: 'drcallaway-8f12d.appspot.com',
  messagingSenderId: '508077289432',
  appId: '1:508077289432:web:ce8e58ceb1c99c98aa4cad',
  measurementId: 'G-HZEPEKRDDQ',
}
firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true })

const fireDb = firebase.firestore()
const storage = firebase.storage()
export { fireDb, storage }
