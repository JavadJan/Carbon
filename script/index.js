import { format } from 'path';
import {db} from './firebase-config'
import {collection , getDocs} from 'firebase/firestore'

if (!localStorage.getItem("user")) {
    let user = []
    localStorage.setItem('user',JSON.stringify(user)) 
}
else{
    var users = JSON.parse(localStorage.getItem("user"));
}


// #region ======================== VALIDATION ===================
const valid = document.querySelectorAll('[data-register]')
valid.forEach( e =>{
    e.addEventListener('focusout',function(){validation(e)
    })
})

function validation(user) {
    console.log(user.value)

    // ========== VALIDATE EMAIL ================
    if (user.id ==='user_email_register') {
        
        if (!checkEmail(user)) {
            document.querySelector('.error_email').innerHTML=`Format email is wrong! <i class="uil uil-exclamation-triangle"></i>`
            document.querySelector('.error_email').style.display = 'inline-block'
            document.getElementById('user_email_register').focus();
        }
        else{
            document.querySelector('.error_email').style.display = 'none'
            document.getElementById('password_register').focus()
        }
        
    }
    else if(user.id==='password_register'){
        
        if (!checkPass(user)) {
            document.querySelector('.error_pass').innerHTML=`Use strong password! <i class="uil uil-exclamation-triangle"></i>`
            document.querySelector('.error_pass').style.display = 'inline-block'
            document.getElementById('password_register').focus();
        }
        else{
            document.querySelector('.error_pass').style.display = 'none'
            document.getElementById('confirm_password').focus()
        }
    }
    if(user.id==='confirm_password'){
        
        if (!checkPasst(user)) {
            document.querySelector('.error_pass_confirm').innerHTML=`your password is not the same!<i class="uil uil-exclamation-triangle"></i>`
            document.querySelector('.error_pass_confirm').style.display = 'inline-block';           
             document.getElementById('confirm_password').focus()
        }
        else{
            document.querySelector('.error_pass_confirm').style.display = 'none';
            document.getElementById('register').focus()
        }
    }
   
    console.log(user)
}


const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
function checkEmail(us) {
    if (regEmail.test(us.value) && us.value!=='') {
        return true
    }
    else{
        
        return false
    }
    
}
function checkPass(pass) {
    if (regPass.test(pass.value) && pass.value!=='') {
        return true
    }
    else{
        return false
    }
}

function checkPasst(tPass) {
    if (tPass.value===document.getElementById('password_register').value) {
        return true
    }
    return false
}
// #endregion  ============================ END VALIDATION =========================
    

//#region ========================= REGISTER =================
function register() {
    const e = document.getElementById('user_email_register').value
    const p = document.getElementById('password_register').value
    const name = document.getElementById('name').value
    const lastname= document.getElementById('lastname').value
    let user ={name: name,lastname:lastname, email: e , password:p , status:'logout'}
    console.log(user)
    // const users=JSON.parse(localStorage.getItem('user')) 
    for (let i = 0; i < users.length; i++) {
        console.log(users.length)
        if (users[i].email===user.email) {
            document.getElementById('already_logged').textContent=`This email already exist!`
             return
        }
    }
    users.push(user)
    localStorage.setItem('user',JSON.stringify(users))
    window.location.href='http://127.0.0.1:5500/login.html'
}
//#endregion ============== REGISTER ========================

//#region ==========  LOGIN AREA <--------------------------

function login() {
    let user =document.getElementById('User_email').value
    let pa = document.getElementById('password').value
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


// change navbar styles on scroll

window.addEventListener('scroll',() => {
    document.querySelector('nav').classList.toggle('window_scroll', window.scrollY > 0)
})

//  Show/Hide faq answer
const faqs = document.querySelectorAll('.faq');
faqs.forEach(faq=>{
    faq.addEventListener('click',()=>{
        faq.classList.toggle('open');
        // change icon 
        const icon = faq.querySelector('.faq_icon i');
        if (icon.className==="uil uil-plus") {
            icon.className='uil uil-minus'
        }
        else{
            icon.className='uil uil-plus'
        }
    })
})

// --------- SHOW / HIDE 
const menu = document.querySelector('.nav-menu');
const open_menu_btn = document.querySelector('#open-menu-btn');
const close_menu_btn = document.querySelector('#close-menu-btn');

open_menu_btn.addEventListener('click',()=>{
    menu.style.display='flex'
    close_menu_btn.style.display='inline-block'
    open_menu_btn.style.display='none'
})
close_menu_btn.addEventListener('click',()=>{
    menu.style.display='none'
    open_menu_btn.style.display='inline-block'
    close_menu_btn.style.display='none'
})

