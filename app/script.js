
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getFirestore, doc, getDocs, collection, addDoc, query, setDoc, updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

export const firebaseConfig = {
    apiKey: "AIzaSyBz07j_YkeaW0yE87C4e9w8qETSoyz4aJ8",
    authDomain: "carbon-9105d.firebaseapp.com",
    projectId: "carbon-9105d",
    storageBucket: "carbon-9105d.appspot.com",
    messagingSenderId: "740319411128",
    appId: "1:740319411128:web:2f78ab5d7c5f7e300f2d4d",
    measurementId: "G-SXFPWZT59L"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const userID = urlParams.get(`id`)
// console.log(userID);


window.addEventListener('scroll', () => {
    document.querySelector('#free-course-content').classList.toggle('window_scroll', window.scrollY < 0)
    // console.log('scrolled', scrollY, window.scrollY)
})


var index = 0;
let userID;
let editClick
let delClick
let updateBtn;

// if (!JSON.parse(localStorage.getItem('logged')) {
//     window.location.href='http://127.0.0.1:5500/login.html'
// }

document.getElementById('logout').addEventListener('click', function () { logout() })
function logout() {
    const user = JSON.parse(localStorage.getItem('logged'));
    userID = user.id
    localStorage.removeItem('logged')

    // await updateDoc(doc(db , "users" , userID) , {'loggin':false})
    window.location.href = 'http://127.0.0.1:5500/login.html'
}
async function display() {

    const user = JSON.parse(localStorage.getItem('logged'));
    console.log(user)
    userID = user.id
    console.log(userID)

    const userCollectionRef = collection(db, 'users')
    const data = await getDocs(userCollectionRef)
    const users = await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    let u = users.find(u => u.id === userID)
    console.log('uuuuuusers: ', u)
    document.getElementById('us').innerText = u.lastname + ' ' + u.firstname

}

display()
// -------------------------- Room --------------------
const rom = document.getElementById('room')
rom.addEventListener('click', () => {
    let url = `http://127.0.0.1:5501/app/room/chat.html`
    document.location.href = url
})


// ---------------------------- courses-----------
document.getElementById('courses').addEventListener('click', () => {

    document.getElementById('todos').style.display = 'none'
    document.getElementById('addTodo').style.display = 'none'
    document.getElementById('course-group').style.display = 'inline-block'
})



//#region  ========================== todoList ====================
// const todo = document.getElementById('todoList')
// todo.addEventListener('click',function() {
//     todoList(e)

// })
//#region  ============ to do list area ========================
const displayTodo = document.getElementById('todoList')
displayTodo.addEventListener('click', function () { displayTodoList() })

async function displayTodoList() {
    document.getElementById('course-group').style.display = 'none'
    console.log('clicked todo')
    document.getElementById('todos').style.display = 'inline-block'
    document.getElementById('addTodo').style.display = 'inline-block'
    document.getElementById('currentHeader').textContent = document.getElementById('todoList').textContent



    //read from firebase
    const todoCollectionRef = await collection(db, `users/${userID}/todo`)
    const data = await getDocs(todoCollectionRef)
    const todos = await data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))

    let tbody = document.getElementById('listTodos')
    tbody.innerHTML = ''

    console.log(todos)
    for (let i = 0; i < todos.length; i++) {

        let newRow = tbody.insertRow(tbody.length)
        newRow.setAttribute("id", await todos[i].id + '1');
        console.log('rowwwwwwwwwwww', newRow)
        let td0 = newRow.insertCell(0);
        let td1 = newRow.insertCell(1);
        let td2 = newRow.insertCell(2);
        let td3 = newRow.insertCell(3);

        td0.innerHTML = await todos[i].title
        td1.innerHTML = todos[i].data + ' ' + todos[i].time
        // d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ': ' + d.getMinutes()
        td2.innerHTML = await todos[i].description
        td3.innerHTML = `<a data-edit="edit" class="btn" data-bs-toggle="modal" data-bs-target="#EditModal"  id="${todos[i].id}">Edit</a>
        <a data-del class="btn" id="${todos[i].id}">Delete</a>
        `
    }

    //select rows 
    editClick = document.querySelectorAll('[data-edit]')
    delClick = document.querySelectorAll('[data-del]')

    //for edit
    editClick.forEach((e) => {
        e.addEventListener('click', async function () {
            Edit(e)
        })
    })

    // for delete
    delClick.forEach((e) => {
        e.addEventListener('click', async function () { del(e) })
    })


}



//  ====================== ADD TODO ==================

const add = document.getElementById('save')
add.addEventListener('click', function () { addTodos() })
async function addTodos() {
    console.log('pressed save', userID)

    //read user 
    const userCollectionRef = await query(collection(db, 'users'))
    // const userCollectionRef =await query(userRef)
    const data = await getDocs(userCollectionRef)

    // const path = query(collection(db, 'users'),`todo`)

    console.log(data)

    const users = await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    console.log(await data.docs)

    let u = users.find(u => u.id === userID)
    console.log(u)

    let title = document.getElementById('title').value
    let date = document.getElementById('date').value
    let time = document.getElementById('time').value
    let description = document.getElementById('description').value

    // add todo list as sub collection
    await setDoc(doc(collection(db, `users/${userID}/todo`)), {
        title: title,
        data: date,
        time: time,
        description: description
    })


    console.log(users)

    const todoCollectionRef = await collection(db, `users/${userID}/todo`)
    const dat = await getDocs(todoCollectionRef)
    const todos = await dat.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))

    let tbody = document.getElementById('listTodos')
    tbody.innerHTML = ''

    console.log(todos)
    for (let i = 0; i < todos.length; i++) {
        let newRow = tbody.insertRow(tbody.length)
        newRow.setAttribute("id", await todos[i].id);
        console.log('rowwwwwwwwwwww', newRow)
        let td0 = newRow.insertCell(0);
        let td1 = newRow.insertCell(1);
        let td2 = newRow.insertCell(2);
        let td3 = newRow.insertCell(3);

        td0.innerHTML = await todos[i].title
        td1.innerHTML = todos[i].data + ' ' + todos[i].time

        td2.innerHTML = await todos[i].description
        td3.innerHTML = `<a data-edit="edit" class="btn" data-bs-toggle="modal" data-bs-target="#EditModal"  id="${todos[i].id}">Edit</a>
        <a data-del class="btn" id="${todos[i].id}">Delete</a>
        `
    }
}


// ======================= update ========================
async function Edit(tr) {

    console.log(tr.id, tr.value)

    //read todo from forestore
    const todoCollection = await collection(db, `users/${userID}/todo`)
    const data = await getDocs(todoCollection)
    const todos = await data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))

    const todo = todos.find(d => d.id === tr.id)
    console.log('tttttttttttttt', todo)

    document.getElementById('modal-edit').innerHTML =
        `<div class="modal-header" >
    <h5 class="modal-title" id="editModalLabel">Edit Task </h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-edit-body">
    <div class="register_user_right">
        <div class="form_register">
            <input type="text" id="up_title" placeholder="Tile">
            <input type="date" id="up_date" placeholder="date">
            <input type="time" id="up_time" placeholder="date">
            <input data-register type="text" placeholder="description" id="up_description">
        </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary" id="update" data-bs-dismiss="modal">update</button>
  </div>`


    document.getElementById('up_title').value = todo.title
    document.getElementById('up_date').value = todo.data
    document.getElementById('time').value = todo.time
    document.getElementById('up_description').value = todo.description
    index = tr.id
    console.log(index)


    editClick = document.querySelectorAll('[data-edit]')
    delClick = document.querySelectorAll('[data-del]')

    //for edit
    editClick.forEach((e) => {
        e.addEventListener('click', async function () {
            Edit(e)
        })
    })

    // for delete
    delClick.forEach((e) => {
        e.addEventListener('click', async function () { del(e) })
    })

    document.getElementById('update').addEventListener('click', function () { update(tr.id) })

}

// ========================= UPDATE ========================



async function update(andis) {
    let title = document.getElementById('up_title').value
    let date = document.getElementById('up_date').value
    let time = document.getElementById('up_time').value
    let des = document.getElementById('up_description').value

    console.log(andis)
    let todo = { title: title, data: date, time: time, description: des }

    // toDos.splice(andis, 1, todo);
    // localStorage.setItem('toDos', JSON.stringify(toDos))
    // toDos = JSON.parse(localStorage.getItem('toDos'))

    console.log(doc(db, `users/${userID}/todo`, andis))
    await updateDoc(doc(db, `users/${userID}/todo`, andis), { todo })


    const todoCollectionRef = await collection(db, `users/${userID}/todo`)
    const dat = await getDocs(todoCollectionRef)
    const todos = await dat.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))

    let tbody = document.getElementById('listTodos')
    tbody.innerHTML = ''

    console.log(todos)
    for (let i = 0; i < todos.length; i++) {
        let newRow = tbody.insertRow(tbody.length)
        newRow.setAttribute("id", await todos[i].id);
        let td0 = newRow.insertCell(0);
        let td1 = newRow.insertCell(1);
        let td2 = newRow.insertCell(2);
        let td3 = newRow.insertCell(3);

        td0.innerHTML = await todos[i].title
        td1.innerHTML = todos[i].data + ' ' + todos[i].time

        td2.innerHTML = await todos[i].description
        td3.innerHTML = `<a data-edit="edit" class="btn" data-bs-toggle="modal" data-bs-target="#EditModal"  id="${todos[i].id}">Edit</a>
        <a data-del class="btn"  id="${todos[i].id}">Delete</a>
        `
    }


    editClick = document.querySelectorAll('[data-edit]')
    delClick = document.querySelectorAll('[data-del]')

    //for edit
    editClick.forEach((e) => {
        e.addEventListener('click', async function () {
            Edit(e)
        })
    })

    // for delete
    delClick.forEach((e) => {
        e.addEventListener('click', async function () { del(e) })
    })
}

async function del(andis) {
    console.log(andis.id)
    alert('are you sure to delete?')
    // toDos.splice(i, 1)
    // localStorage.setItem('toDos', JSON.stringify(toDos))
    // toDos = JSON.parse(localStorage.getItem('toDos'))

    // console.log(toDos)

    await deleteDoc(doc(db, `users/${userID}/todo`, andis.id))


    let tbody = document.getElementById('listTodos')
    tbody.innerHTML = ''

    console.log(todos)
    for (let i = 0; i < todos.length; i++) {
        let newRow = tbody.insertRow(tbody.length)
        newRow.setAttribute("id", await todos[i].id);
        let td0 = newRow.insertCell(0);
        let td1 = newRow.insertCell(1);
        let td2 = newRow.insertCell(2);
        let td3 = newRow.insertCell(3);

        td0.innerHTML = await todos[i].title
        td1.innerHTML = todos[i].data + ' ' + todos[i].time

        td2.innerHTML = await todos[i].description
        td3.innerHTML = `<a data-edit="edit" class="btn" data-bs-toggle="modal" data-bs-target="#EditModal"  id="${todos[i].id}">Edit</a>
        <a data-del class="btn" data-bs-toggle="modal" data-bs-target="#EditModal"  id="${todos[i].id}">Delete</a>
        `
    }


    editClick = document.querySelectorAll('[data-edit]')
    delClick = document.querySelectorAll('[data-del]')

    //for edit
    editClick.forEach((e) => {
        e.addEventListener('click', async function () {
            Edit(e)
        })
    })

    // for delete
    delClick.forEach((e) => {
        e.addEventListener('click', async function () { del(e) })
    })

}
//#endregion ================ todoList =============================





