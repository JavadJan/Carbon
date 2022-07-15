
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userID = urlParams.get(`id`)
console.log(userID);




var index = 0;
if (!localStorage.toDos) {
    var toDos = [
        {
            title: "Work ou",
            date: "02/11/2022",
            description: "this is for",
        },
        {
            title: "Work ou",
            date: "02/11/2022",
            description: "this is for test",
        },
        {
            title: "Work ou",
            date: "02/11/2022",
            description: "this is for test",
        }
    ]
    localStorage.setItem('toDos', JSON.stringify(toDos))
}
else {
    var toDos = JSON.parse(localStorage.getItem('toDos'))
}

function logout() {
    localStorage.removeItem('logged')
    window.location.href = 'http://127.0.0.1:5500/login.html'
}

async function display() {

    const userCollectionRef = collection(db, 'users')
    const data = await getDocs(userCollectionRef)
    const users = await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    let u = users.find(u => u.id === userID)
    console.log(u)
    // document.getElementById('us').innerText = u.lastname + ' ' + u.firstname



}
export { userID }
display()
// -------------------------- Room --------------------
const rom = document.getElementById('room')
rom.addEventListener('click', () => {
    let url = `http://127.0.0.1:5501/app/chat.html`
    document.location.href = url
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
    console.log('clicked todo')
    document.getElementById('todos').style.display = 'inline-block'
    document.getElementById('addTodo').style.display = 'inline-block'
    document.getElementById('currentHeader').textContent = document.getElementById('todoList').textContent


    console.log(toDos.length)

    const todoCollectionRef = await collection(db, 'toDos')
    const data = await getDocs(todoCollectionRef)
    const todos = await data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))
    console.log(todos)
    for (let i = 0; i < todos.length; i++) {

        document.getElementById('listTodos').innerHTML +=
            `<tr data-cell>
        <td>${todos[i].title}</td>
        <td>${todos[i].date.toDate()}</td>
        <td>${todos[i].description}</td>
        <td>
            <button data-edit class="btn" data-bs-toggle="modal" data-bs-target="#EditModal"  onclick="Edit('${todos[i].title}','${todos[i].date}','${todos[i].description}','${todos[i].id}')">Edit</button>
            <button onclick="del('${todos[i].id}')" class="btn">Delete</button>
        </td>
    </tr>`
    }
}




//  ====================== ADD TODO ==================

const add = document.getElementById('save')
add.addEventListener('click', function () { addTodos() })
async function addTodos() {
    console.log('pressed save')
    const todoCollectionRef = collection(db, 'toDos')
    const data = await getDocs(todoCollectionRef)
    const todos = data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))

    let title = document.getElementById('title').value
    let date = document.getElementById('date').value
    let description = document.getElementById('description').value
    // const todo = {title:title,date:date,description:description}

    await addDoc(todoCollectionRef, { title: title, data: date, description: description })
    // localStorage.setItem('toDos',JSON.stringify(toDos));
    document.getElementById('listTodos').innerHTML +=

        todos.map((todo) => {
            `
            <tr data-cell>
            <td>${todo.title}</td>
            <td>${todo.date}</td>
            <td>${todo.description}</td>
            <td>
                <button class="btn" data-bs-toggle="modal" data-bs-target="#EditModal" onclick="Edit('${todo.title}','${todo.date}','${todo.description}','${todo.id}')">Edit</button>
                <button class="btn" onclick="del('${todo.id}')">Delete</button>
            </td>
        </tr>`
        })



}


// ======================= update ========================

function Edit(t, d, ds, i) {
    document.getElementById('modal-edit').innerHTML =
        `<div class="modal-header" >
    <h5 class="modal-title" id="editModalLabel">Add Project</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-edit-body">
    <div class="register_user_right">
        <div class="form_register">
            <input type="text" id="up_title" placeholder="Tile">
            <input type="date" id="up_date" placeholder="date">
            <input data-register type="text" placeholder="description" id="up_description">
        </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary" id="update" data-bs-dismiss="modal" onclick="update('${i}')">update</button>
  </div>`


    console.log(t, d, ds)
    document.getElementById('up_title').value = t
    document.getElementById('up_date').value = d
    document.getElementById('up_description').value = ds
    index = i
    console.log(index)
}

// ========================= UPDATE ========================
function update(indis) {
    let title = document.getElementById('up_title').value
    let date = document.getElementById('up_date').value
    let des = document.getElementById('up_description').value

    let todo = { title: title, date: date, description: des }
    toDos.splice(indis, 1, todo);
    localStorage.setItem('toDos', JSON.stringify(toDos))
    toDos = JSON.parse(localStorage.getItem('toDos'))
    document.getElementsByTagName('tbody')[0].innerHTML = ''

    for (let i = 0; i < toDos.length; i++) {
        document.getElementsByTagName('tbody')[0].innerHTML += `<tr data-cell>
    <td>${toDos[i].title}</td>
    <td>${toDos[i].date}</td>
    <td>${toDos[i].description}</td>
    <td>
        <button data-edit class="btn" data-bs-toggle="modal" data-bs-target="#EditModal"  onclick="Edit('${toDos[i].title}','${toDos[i].date}','${toDos[i].description}','${i}')">Edit</button>
        <button onclick="del('${toDos[i]}')" class="btn">Delete</button>
    </td>
</tr>`
    }
}

console.log('before del :', toDos)
function del(i) {
    console.log(i)
    toDos.splice(i, 1)
    localStorage.setItem('toDos', JSON.stringify(toDos))
    toDos = JSON.parse(localStorage.getItem('toDos'))
    console.log(toDos)
    document.getElementsByTagName('tbody')[0].innerHTML = ''
    for (let i = 0; i < toDos.length; i++) {
        document.getElementsByTagName('tbody')[0].innerHTML += `<tr data-cell>
    <td>${toDos[i].title}</td>
    <td>${toDos[i].date}</td>
    <td>${toDos[i].description}</td>
    <td>
        <button data-edit class="btn" data-bs-toggle="modal" data-bs-target="#EditModal"  onclick="Edit('${toDos[i].title}','${toDos[i].date}','${toDos[i].description}','${i}')">Edit</button>
        <button onclick="del('${toDos[i]}')" class="btn">Delete</button>
    </td>
</tr>`
    }

}
//#endregion ================ todoList =============================

