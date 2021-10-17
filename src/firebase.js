// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEosoKOyyBA0AaifbwWqNd1JOT7Af2k5c",
  authDomain: "whatsapp-clone-mern-17201.firebaseapp.com",
  projectId: "whatsapp-clone-mern-17201",
  storageBucket: "whatsapp-clone-mern-17201.appspot.com",
  messagingSenderId: "178097637779",
  appId: "1:178097637779:web:a278dcc9e17e500c840066",
  measurementId: "G-9YSVBKXL09",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
