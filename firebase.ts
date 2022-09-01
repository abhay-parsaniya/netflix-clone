// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmMOuR45Rp0vFJWOYtODLlvhMYrYNL9QU",
    authDomain: "netflix-clone-ffda2.firebaseapp.com",
    projectId: "netflix-clone-ffda2",
    storageBucket: "netflix-clone-ffda2.appspot.com",
    messagingSenderId: "929204094361",
    appId: "1:929204094361:web:417fde7c124aea5f487f08"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }