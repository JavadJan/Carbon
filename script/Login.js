import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";


//#region ==========  LOGIN AREA <--------------------------

const btnogin = document.getElementById('btnLogin')
btnLogin.addEventListener('click',function(){login()})
function login() {
    console.log('login pressed!')
    let user =document.getElementById('User_email').value
    let pa = document.getElementById('password').value

    // compare with database then will login
    var users = JSON.parse(localStorage.getItem('user')) 

    console.log(users,typeof users,users.length)
    for (let i = 0; i < users.length; i++) {
        console.log(typeof users[i].email,'2',typeof user)
        if (users[i].email===user) {
            console.log(users,'4', users.password)
            if (users[i].password===pa) {
                console.log(users,'5')
                localStorage.setItem('logged', JSON.stringify(users[i]))
                window.location.href='http://127.0.0.1:5500/app/index.html'
                return
            }
        }
        alert('username or password is incorrect!')
        
    }
}
//#endregion  ==============END LOGIN =============

