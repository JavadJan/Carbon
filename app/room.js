import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {getFirestore,collection} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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
const db = getFirestore(app);

// get id grom ulr 
const usrParams = new URLSearchParams(window.location.search)
const roomId = usrParams.get('id')




const roomUserCollectionRef = collection(db , 'users')
console.log(roomUserCollectionRef)
