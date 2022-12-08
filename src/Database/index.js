import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import 'firebase/auth'
import 'firebase/compat/database'
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAeNfpMksjim-PrKcISGXOyq3Ycy5SjKi0",
  authDomain: "login-11861.firebaseapp.com",
  projectId: "login-11861",
  storageBucket: "login-11861.appspot.com",
  messagingSenderId: "933822219909",
  appId: "1:933822219909:web:ee8ec9c35aec3042438bec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
