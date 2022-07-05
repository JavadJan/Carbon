// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection, getDocs } from "@firebase/firestore";
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore-lite.js';

const firebaseConfig = {
  apiKey: "AIzaSyDWFQqIQ0zzxtwAlQOO2uZDe2TJEPhC4sk",
  authDomain: "todolist-de9c0.firebaseapp.com",
  projectId: "todolist-de9c0",
  storageBucket: "todolist-de9c0.appspot.com",
  messagingSenderId: "552384689075",
  appId: "1:552384689075:web:b8eab7a2153a71bda851c6",
  measurementId: "G-JXPNCJ96KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



