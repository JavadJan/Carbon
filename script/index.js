// import db from './firebase-config'
// import {collection ,getDocs, addDoc,doc , updateDoc } from 'firebase/firestore'

// import { initializeApp } from "firebase/app";
// import { getFirestore,collection,getDoc,addDoc,doc } from "firebase/firestore";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";


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


// if (!localStorage.getItem("user")) {
//     let user = []
//     localStorage.setItem('user',JSON.stringify(user)) 
// }
// else{
//     var users = JSON.parse(localStorage.getItem("Users"));
// }
//  crud from database for users
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

const getUser = async () => {
    const userCollectionRef = collection(db, "users")
    const data = await getDocs(userCollectionRef)

    const user = data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))

}



// #region ======================== VALIDATION ===================
const valid = document.querySelectorAll('[data-register]')
valid.forEach(e => {
    e.addEventListener('focusout', function () {
        validation(e)
    })
})

const validation = async (user) => {
    console.log(user.value)

    // ========== VALIDATE EMAIL ================
    if (user.id === 'user_email_register') {

        // check in firestore
        const userCollectionRef = collection(db, "users")
        const data = await getDocs(userCollectionRef)
        const user = data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }))

        if (regEmail.test(user.value) && !user.some((u) => u.email === user.value)) {
            document.querySelector('.error_email').style.display = 'none'
            document.getElementById('password_register').focus()
        }
        else {
            if (user.value==='') {
                document.getElementById('register').focus;
            }
            else{
                console.log('email na dororst! ')
                document.querySelector('.error_email').innerHTML = `Format email is wrong! <i class="uil uil-exclamation-triangle"></i>`
                document.querySelector('.error_email').style.display = 'inline-block'
                document.getElementById('user_email_register').focus();
            }
        }

    }
    else if (user.id === 'password_register') {
        // ------ validation password ------------
        if (regPass.test(user.value)) {
            document.querySelector('.error_pass').style.display = 'none'
            document.getElementById('confirm_password').focus()
            console.log('pass pattern dorost')
        }
        else {
            if (user.value==='') {
                document.getElementById('register').focus;
            }
            else{
                document.querySelector('.error_pass').innerHTML = `Use strong password! <i class="uil uil-exclamation-triangle"></i>`
                document.querySelector('.error_pass').style.display = 'inline-block'
                document.getElementById('password_register').focus();
            }
            
        }
    }
    if (user.id === 'confirm_password') {

        if (!checkPasst(user)) {
            document.querySelector('.error_pass_confirm').innerHTML = `your password is not the same!<i class="uil uil-exclamation-triangle"></i>`
            document.querySelector('.error_pass_confirm').style.display = 'inline-block';
            document.getElementById('confirm_password').focus()
        }
        else {
            document.querySelector('.error_pass_confirm').style.display = 'none';
            document.getElementById('register').focus()
        }
    }

}






function checkPass(pass) {
    if (regPass.test(pass.value) && pass.value === '' && pass.value.length > 8) {
        console.log(true)
        return true
    }
    else {
        console.log(false)
        return false
    }
}

function checkPasst(tPass) {
    if (tPass.value === document.getElementById('password_register').value) {
        return true
    }
    return false
}





// #endregion  ============================ END VALIDATION =========================




// change navbar styles on scroll

window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('window_scroll', window.scrollY > 0)
})

//  Show/Hide faq answer
const faqs = document.querySelectorAll('.faq');
faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('open');
        // change icon 
        const icon = faq.querySelector('.faq_icon i');
        if (icon.className === "uil uil-plus") {
            icon.className = 'uil uil-minus'
        }
        else {
            icon.className = 'uil uil-plus'
        }
    })
})

// --------- SHOW / HIDE 
const menu = document.querySelector('.nav-menu');
const open_menu_btn = document.querySelector('#open-menu-btn');
const close_menu_btn = document.querySelector('#close-menu-btn');

open_menu_btn.addEventListener('click', () => {
    menu.style.display = 'flex'
    close_menu_btn.style.display = 'inline-block'
    open_menu_btn.style.display = 'none'
})
close_menu_btn.addEventListener('click', () => {
    menu.style.display = 'none'
    open_menu_btn.style.display = 'inline-block'
    close_menu_btn.style.display = 'none'
})

