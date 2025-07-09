// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBImKDL5EPQhIqTBmKYEKofEBXyyPBXvsY",
  authDomain: "walmartwise-7761a.firebaseapp.com",
  projectId: "walmartwise-7761a",
  storageBucket: "walmartwise-7761a.appspot.com",
  messagingSenderId: "466982241867",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
