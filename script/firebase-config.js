import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz07j_YkeaW0yE87C4e9w8qETSoyz4aJ8",
  authDomain: "carbon-9105d.firebaseapp.com",
  projectId: "carbon-9105d",
  storageBucket: "carbon-9105d.appspot.com",
  messagingSenderId: "740319411128",
  appId: "1:740319411128:web:2f78ab5d7c5f7e300f2d4d",
  measurementId: "G-SXFPWZT59L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);












