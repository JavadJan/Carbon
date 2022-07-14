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

// -------------------->get connection peer-to-peer with server
const server = {
    iceServer: [
        {
            urls: ['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
        }
    ]
}

let pc = new RTCPeerConnection(server);

// your webcam
let localStream = null;
var audio = false
var video = true
// your friend's webcam
let remoteStream = null;




// ----------- get user from URL ----------
// const urlParams = new URLSearchParams(window.location.search);
// const userID = urlParams.get('id');

const user = JSON.parse(localStorage.getItem('logged'));
console.log(user)
const userID = user.id
console.log(userID)

const dbRef = getDatabase();


//  ----------> for click audio
let micMuted = document.querySelectorAll('.uil-microphone-slash')
micMuted.forEach((item) => {
    item.addEventListener('click', () => {
        item.style.display = 'none'
        item.nextElementSibling.style.display = "inline-block"
        audio = true
        connection()
        console.log(item)
    })
})

let micOn = document.querySelectorAll('.uil-microphone')
micOn.forEach((item) => {
    item.addEventListener('click', () => {
        item.style.display = 'none'
        item.previousElementSibling.style.display = "inline-block"
        console.log(item)
        audio=false
        video=true
        connection()
    })
})
// -----------> end click


//  ----------> for click video
let vidOf = document.querySelectorAll('.uil-video-slash')

vidOf.forEach((item) => {
    item.addEventListener('click', () => {
        // item.classList.remove('active')
        item.style.display = 'none'
        item.nextElementSibling.style.display = "inline-block"
        video = true
        connection()
        console.log(item)
    })
})

let vidOn = document.querySelectorAll('.uil-video')
vidOn.forEach((item) => {
    item.addEventListener('click', () => {
        item.style.display = 'none'
        item.previousElementSibling.style.display = "inline-block"
        console.log('unvideo')
        video = false
        audio=true
        connection()
    })
})
// -----------> end click

// -----------> Timer 
setInterval(myTimer, 1000);

function myTimer() {
    const d = new Date();
    document.getElementById("timer").innerHTML = d.toLocaleTimeString();
}
document.getElementById('copy').addEventListener('click', function () {
    copy()
})


function copy() {
    /* Get the text field */
    var copyText = document.getElementById("link");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    document.getElementById('copy').textContent = 'Copied'
}






async function getUser() {

    // read user from fireatore
    const roomUserCollectionRef = collection(db, 'users')
    const data = await getDocs(roomUserCollectionRef);
    const users = await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    let user = users.find(u => u.id === userID)
    console.log('add users:', userID, user.email, user.firstname)

    // connect to database real time



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

    get(ref(dbRef, 'participants'), 'participants').then((snapshot) => {
        console.log(snapshot.valueOf().size + 1);
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            const userUI = document.querySelector('.users')
            for (let i = 0; i < snapshot.valueOf().size; i++) {
                userUI.innerHTML +=
                    `<div class="user">
                    <div class="card">
                        <video src="#" id=${userID} class="video" autoplay playsInline></video>
                        <div class="muted">
                            <i class="uil uil-microphone-slash"></i>
                            <i class="uil uil-microphone"></i>
                        </div>
                        <div class="pic-user">A</div>
                        <div class="name">${user.firstname + ' ' + user.lastname}</div>
                    </div>
                </div>`

            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });


    connection()

}
getUser()

// ----------> for connection
async function connection() {
    // -----------> access to my camera 

    console.log('video:', video, 'audio:', audio)
    localStream = await navigator.mediaDevices.getUserMedia({ video: video, audio: audio });

    // ------------> get video from your friend
    remoteStream = await new MediaStream()

    // -------->push tracks from localstream to peer-to-peer connection
    localStream.getTracks().forEach((track) => {
        // push audio and video on peer-to-peer connection
        pc.addTrack(track, localStream)
    })

    // --------> pull tracks from remote stream/ add to peer-to-peer connection
    pc.ontrack = (e) => {
        e.streams[0].getTracks().forEach(track => { remoteStream.addTrack(track) })
    }

    // pc.onicecandidate = async (event) => {
    //     if (event.candidate) {
    //         console.log('New ICE candidate:', event.candidate)
    //     }
    // }

    // let offer = await pc.connection()
    // await pc.setLocalDescription(offer)


    document.getElementById(`host`).srcObject = localStream
    console.log(document.getElementById(`${userID}`))
    document.getElementById(`${userID}`).srcObject = localStream

    document.querySelector('.pic-user').style.display = 'none'
}




/* Get the element you want displayed in fullscreen mode (a video in this example): */
let elem = document.getElementById('fullscreen').parentElement.childNodes[1]
var fullscreen = document.getElementById("fullscreen");

fullscreen.addEventListener('click', function () {
    openFullscreen()
})

function openFullscreen() {
    console.log(elem)
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}












