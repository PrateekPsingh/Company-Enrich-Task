// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCANAyAG2aNWAdz7fTXA9erHI4DPruVpa8",
    authDomain: "enrichtask.firebaseapp.com",
    projectId: "enrichtask",
    storageBucket: "enrichtask.firebasestorage.app",
    messagingSenderId: "1038201680756",
    appId: "1:1038201680756:web:dd383ff8427786cf7c3221",
    measurementId: "G-GG3390SF1B"
  };
  


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google Sign-In error:", error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-Out error:", error);
  }
};

export { auth };
