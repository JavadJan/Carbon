
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

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const userID = urlParams.get(`id`)
// console.log(userID);


window.addEventListener('scroll', () => {
    document.querySelector('#free-course-content').classList.toggle('window_scroll', window.scrollY < 0)
    console.log('scrolled', scrollY, window.scrollY)
})


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

    const user = JSON.parse(localStorage.getItem('logged'));
    console.log(user)
    const userID = user.id
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


    console.log(toDos.length)

    //read from firebase
    const todoCollectionRef = await collection(db, 'toDos')
    const data = await getDocs(todoCollectionRef)
    const todos = await data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))

    
    console.log(todos)
    for (let i = 0; i < todos.length; i++) {
       
       let time = {
        seconds: await todos[i].date.seconds,
        nanoseconds: await todos[i].date.nanoseconds
      }
      
      let fireBaseTime = new Date(
        time.seconds * 1000 + time.nanoseconds / 1000000,
      );
        console.log(i , await todos[i].date,time,fireBaseTime)

        let dat = fireBaseTime.toDateString();
        let atTime = fireBaseTime.toLocaleTimeString();
        
        console.log(dat , atTime)
        let tbody = document.getElementById('listTodos')
        let newRow = tbody.insertRow(tbody.length)
        newRow.setAttribute("id",await todos[i].id);
        console.log('rowwwwwwwwwwww', newRow)
        let td0 = newRow.insertCell(0);
        let td1 = newRow.insertCell(1);
        let td2 = newRow.insertCell(2);
        let td3 = newRow.insertCell(3);

        td0.innerHTML =await todos[i].title
        td1.innerHTML = dat + atTime
        // d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ': ' + d.getMinutes()
        td2.innerHTML = await todos[i].description
        td3.innerHTML = `<a data-cell="edit" class="btn" data-bs-toggle="modal" data-bs-target="#EditModal"  onclick="Edit('${todos[i].id}')">Edit</a>
        <a data-edit class="btn" data-bs-toggle="modal" data-bs-target="#EditModal"  onclick="del('${newRow}')">Delete</a>
        `

        console.log('bo ro dovom: ',newRow)
        time={seconds:'',nanoseconds:''}
    }
    console.log('data-edit: ', document.querySelectorAll('[data-cell]'))
}
// '${todos[i].title}','${todos[i].date}','${todos[i].description}','${todos[i].id}'
// .getDay()+'/'+todos[i].date.toDate().getMonth()+'/'+todos[i].date.toDate().getFullYear() + ' ' +todos[i].date.toDate().getHours()+':'+todos[i].date.toDate().getMinutes()





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
                <a class="btn" data-bs-toggle="modal" data-bs-target="#EditModal" onClick="Edit(this)">Edit</a>
                <a class="btn" onclick="del('${todo.id}')">Delete</a>
            </td>
        </tr>`
        })


    // '${todo.title}','${todo.date}','${todo.description}','${todo.id}'
}


// ======================= update ========================
document.querySelectorAll('[data-edit]')
function Edit(tr) {
    console.log(tr)
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
    <button type="button" class="btn btn-primary" id="update" data-bs-dismiss="modal" onClick="${update()}">update</button>
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
    <td class="Ttitle">${toDos[i].title}</td>
    <td class="Ttime">${toDos[i].date}</td>
    <td class="Tdisc">${toDos[i].description}</td>
    <td class="Tbtn">
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

