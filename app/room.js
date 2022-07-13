import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

import { getDatabase, ref, set, onDisconnect, get, onValue, push, child } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";

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
const db = getFirestore(app);

// ----------- get user from URL ----------
// const urlParams = new URLSearchParams(window.location.search);
// const userID = urlParams.get('id');

const user = JSON.parse(localStorage.getItem('logged'));
console.log(user)
const userID = user.id
console.log(userID)


async function getUser() {

    // read user from fireatore
    const roomUserCollectionRef = collection(db, 'users')
    const data = await getDocs(roomUserCollectionRef);
    const users = await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    let user = users.find(u => u.id === userID)


    console.log('add users:', userID, user.email, user.firstname)

    // connect to database real time
    const dbRef = getDatabase();


    const connectedRef = await ref(dbRef, 'participant')
    console.log(connectedRef)


    const participantRef = await child(ref(dbRef), 'participants')
    console.log('user:', participantRef)
    // stores the timestamp of my last disconnect (the last time I was seen online)
    // const lastOnlineRef = ref(dbRef, 'users/lastOnline');

    // const connectedRef = ref(dbRef, '.info/connected');
    onValue(connectedRef, (snap) => {

        console.log('snap: ', snap.val())

        if (snap.val() !== true) {
            console.log('connected')
            // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
            const performance = {
                audio: false,
                video: false,
                screen: true
            }
            const userRef = push(participantRef);
            set(userRef, { user, performance: performance })

            // When I disconnect, remove this device
            console.log('user will removed!', onDisconnect(participantRef))

            onDisconnect(userRef).remove();

            // Add this device to my connections list
            // this value could contain info about the device or a timestamp too
            // set(con, true);
            // When I disconnect, update the last time I was seen online
            // onDisconnect(lastOnlineRef).set(serverTimestamp());

        }
    });

    console.log(child(ref(dbRef), 'participants'))
    await get(ref(dbRef), 'participants').then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            console.log(snapshot.valueOf().size);

            const userUI = document.querySelector('.users')

            for (let i = 0; i < snapshot.valueOf().size + 1; i++) {
                userUI.innerHTML +=
                    `<div class="user">
          <div class="card">
              <video src="" class="video" autoplay playsInline></video>
              <div class="muted">
                  <i class="uil uil-microphone-slash"></i>
                  <i class="uil uil-microphone"></i>
              </div>

              <div class="pic-user">A</div>
              <div class="name">user1</div>
          </div>
      </div>`

            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
getUser()
// get id grom ulr

const micMuted = document.querySelectorAll('.uil-microphone-slash')

micMuted.forEach((item) => {
    item.addEventListener('click', () => {
        // item.classList.remove('active')
        item.style.display = 'none'
        item.nextElementSibling.style.display = "inline-block"
        console.log(item)
    })
})

const micOn = document.querySelectorAll('.uil-microphone')
micOn.forEach((item) => {
    item.addEventListener('click', () => {
        item.style.display = 'none'
        item.previousElementSibling.style.display = "inline-block"
        console.log(item)
    })
})

