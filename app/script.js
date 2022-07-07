// const webData = require('./Webscript-data')
// if (!logged) {
//     window.location.href='http://127.0.0.1:5500/login.html'
// }
var index=0
if (!localStorage.toDos) {
    var toDos= [
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
    localStorage.setItem('toDos',JSON.stringify(toDos))
}
else{
    var toDos = JSON.parse(localStorage.getItem('toDos'))
}

function logout() {
    localStorage.removeItem('logged')
    window.location.href='http://127.0.0.1:5500/login.html'
}

function display() {
    const logged= JSON.parse(localStorage.getItem('logged'))
    document.getElementById('us').innerText=`${logged.name , logged.lastname}`


}
display()

//#region  ========================== todoList ====================
// const todo = document.getElementById('todoList')
// todo.addEventListener('click',function() {
//     todoList(e)
    
// })

//#region  ============ to do list area ========================
function displayList() {
    document.getElementById('addTodo').style.display='inline-block'
    document.getElementById('currentHeader').textContent=document.getElementById('todoList').textContent
    
    document.querySelector('.currentDo').innerHTML+=`<table>
    <thead>
        <tr>
            <td>Title</td>
            <td>time</td>
            <td>description</td>
            <td></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
    </tbody id="upd-date">
    </table>`
    console.log(toDos.length)
    document.getElementsByTagName('tbody')[0].innerHTML=''
    for (let i = 0; i < toDos.length; i++) {
        document.getElementsByTagName('tbody')[0].innerHTML+=`<tr data-cell>
        <td>${toDos[i].title}</td>
        <td>${toDos[i].date}</td>
        <td>${toDos[i].description}</td>
        <td>
            <button data-edit class="btn" data-bs-toggle="modal" data-bs-target="#EditModal"  onclick="Edit('${toDos[i].title}','${toDos[i].date}','${toDos[i].description}','${i}')">Edit</button>
            <button onclick="del('${i}')" class="btn">Delete</button>
        </td>
    </tr>`
    }
}
// {title:toDos[i].title,date:toDos[i].date,description:toDos[i].description}
// edit.forEach((e,i) => function() {Edit(e,i)});
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

const product = urlParams.get('product')
console.log(product);
//  ====================== ADD TODO ==================
function add() {
    let title= document.getElementById('title').value
    let date= document.getElementById('date').value
    let description = document.getElementById('description').value
    const todo = {title:title,date:date,description:description}
    
    toDos.push(todo)
    localStorage.setItem('toDos',JSON.stringify(toDos));
    document.getElementsByTagName('tbody')[0].innerHTML+=`<tr data-cell>
        <td>${title}</td>
        <td>${date}</td>
        <td>${description}</td>
        <td>
            <button class="btn" data-bs-toggle="modal" data-bs-target="#EditModal" onclick="Edit('${toDos[i].title}','${toDos[i].date}','${toDos[i].description}')">Edit</button>
            <button class="btn" onclick="del('${i}')">Delete</button>
        </td>
    </tr>`
    
}


// ======================= update ========================

function Edit(t,d,ds,i) {
    document.getElementById('modal-edit').innerHTML=
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


    console.log(t,d,ds)
    document.getElementById('up_title').value=t
    document.getElementById('up_date').value=d
    document.getElementById('up_description').value=ds
    index =i
    console.log(index)
}

// ========================= UPDATE ========================
function update(indis) {
   let title= document.getElementById('up_title').value
   let date = document.getElementById('up_date').value
   let des  = document.getElementById('up_description').value

   let todo ={title:title,date:date,description:des}
   toDos.splice(indis, 1, todo);
   localStorage.setItem('toDos',JSON.stringify(toDos))
   toDos = JSON.parse(localStorage.getItem('toDos'))
   document.getElementsByTagName('tbody')[0].innerHTML=''

   for (let i = 0; i < toDos.length; i++) {
    document.getElementsByTagName('tbody')[0].innerHTML+=`<tr data-cell>
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
    toDos.splice(i,1)
   localStorage.setItem('toDos',JSON.stringify(toDos))
   toDos = JSON.parse(localStorage.getItem('toDos'))
   console.log(toDos)
   document.getElementsByTagName('tbody')[0].innerHTML=''
   for (let i = 0; i < toDos.length; i++) {
    document.getElementsByTagName('tbody')[0].innerHTML+=`<tr data-cell>
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

