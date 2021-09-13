import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const config = {
  apiKey: 'AIzaSyAo1mWTl8Rf7VFFl5gELFCKdiUAXXtouRk',
  authDomain: 'drcallaway-40a14.firebaseapp.com',
  projectId: 'drcallaway-40a14',
  storageBucket: 'drcallaway-40a14.appspot.com',
  messagingSenderId: '334993917685',
  appId: '1:334993917685:web:2e64110327644b3cf267bc',
  measurementId: 'G-W7F6HNBF7P',
}
firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true })

const fireDb = firebase.firestore()
const storage = firebase.storage()
export { fireDb, storage }
