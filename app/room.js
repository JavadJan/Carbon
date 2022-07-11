import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getFirestore,collection, getDocs  } 
from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

import { getDatabase, ref, set } 
from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBz07j_YkeaW0yE87C4e9w8qETSoyz4aJ8",
    authDomain: "carbon-9105d.firebaseapp.com",
    databaseURL: "https://carbon-9105d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "carbon-9105d",
    storageBucket: "carbon-9105d.appspot.com",
    messagingSenderId: "740319411128",
    appId: "1:740319411128:web:2f78ab5d7c5f7e300f2d4d",
    measurementId: "G-SXFPWZT59L"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);

// ----------- get user from URL ----------
const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('id');

// const dbRef = await getDatabse(app)


async function getUser() {
    
    const roomUserCollectionRef = collection(db, 'users')
    const data = await getDocs(roomUserCollectionRef);
    const users =await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    let user = users.find(u => u.id === userID)
    
    // console.log('add users:', userID,user.email,user.lastname)
    
    const dbRef =getDatabase();
  set(ref(dbRef, 'users/' + userID), {username: user.lastname,email: user.email});
}
getUser()
// get id grom ulr

const micMuted =document.querySelectorAll('.uil-microphone-slash')
console.log(micMuted)

micMuted.forEach((item)=>{
    item.addEventListener('click',()=>{
        item.classList.remove('active')
        item.nextElementSibling.classList.add("active")
    console.log(item)
})})

const micOn =document.querySelectorAll('.uil-microphone')
console.log(micOn)
micOn.forEach((item)=>{
    item.addEventListener('click',()=>{
        item.classList.remove('active')
        item.previousElementSibling.classList.add("active")
    console.log(item)
})})

