// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "homes-a579f.firebaseapp.com",
  projectId: "homes-a579f",
  storageBucket: "homes-a579f.firebasestorage.app",
  messagingSenderId: "324174666775",
  appId: "1:324174666775:web:ff4410654c570527019052"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);