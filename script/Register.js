import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";


import { getFirestore, doc, getDoc, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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

const userCollectionRef = collection(db, "users")

const getUser = async () => {
    const data = await getDocs(userCollectionRef)
    const user = data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))
    console.log(user)
}

getUser()
// console.log('userrr',Userr)




//#region ========================= REGISTER =================

const btnRegister = document.getElementById('register')
btnRegister.addEventListener('click', function () { CreateAccount() })


const CreateAccount = async () => {
    console.log('register pressed!')
    const e = document.getElementById('user_email_register').value
    const p = document.getElementById('password_register').value
    const name = document.getElementById('name').value
    const lastname = document.getElementById('lastname').value
    let user = { firstname: name, lastname: lastname, email: e, password: p, status: 'logout' }


    for (const key in user) {
        console.log(user[key])
        if (user[key] === "") {
            const fill = document.getElementById('fill-form')
            fill.style.display = 'inline-block'
        }
    }


    // read from firestore
    const data = await getDocs(userCollectionRef)
    const users = data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))


    // check with firestore
    console.log(users.length, users[0].email)
    for (let i = 0; i < users.length; i++) {
        console.log(users.length, users[i].email)
        if (users[i].email === user.email) {
            document.getElementById('already_logged').textContent = `This email already exist!`
            document.getElementById('already_logged').style.color='red'
            return
        }

    }

    // write to database/firestore
    // const userCollectionRef = collection(db , 'users')
    await addDoc(userCollectionRef, { firstname: name, lastname: lastname, email: e, password: p, status: 'logout'})
    console.log('added!')

    window.location.href = 'http://127.0.0.1:5500/login.html'


}

//#endregion ============== REGISTER ========================



