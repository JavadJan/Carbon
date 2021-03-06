import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDocs, collection, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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

var userId = '';
//#region ==========  LOGIN AREA <--------------------------

const btnLogin = document.getElementById('btnLogin')
btnLogin.addEventListener('click', function () { login() })
const login = async () => {
    console.log('login pressed!')
    let user = document.getElementById('User_email').value
    let pa = document.getElementById('password').value

    // compare with database then will login
    const userCollectionRef = collection(db, "users")
    const data = await getDocs(userCollectionRef)
    var users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === user) {

            console.log(users[i].id)
            if (users[i].password === pa) {
                console.log(users, '5')
                userId = await users[i].id

                localStorage.setItem('logged', JSON.stringify(users[i]))

                //update to log in
                await updateDoc(doc(db, "users", users[i].id), { 'loggin': true })

                console.log('updated!')
                let url = `http://127.0.0.1:5501/app/index.html#`
                document.location.href = url
                return
            } else {
                alert('username or password is incorrect!')

            }


        }

    }
    alert('username or password is incorrect!')


}

export default userId;
//#endregion  ==============END LOGIN =============

