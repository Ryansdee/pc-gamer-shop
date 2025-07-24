// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC3Tz1UYq--bkDpijqk1RS8jg_JJZFcRg0",
  authDomain: "liquid-flow-pc.firebaseapp.com",
  projectId: "liquid-flow-pc",
  storageBucket: "liquid-flow-pc.firebasestorage.app",
  messagingSenderId: "374920363726",
  appId: "1:374920363726:web:433e756e823e1ad481da9f",
  measurementId: "G-YT9XRLG9RB"
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
