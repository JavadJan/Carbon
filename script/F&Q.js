
window.addEventListener('scroll', () => {
    console.log('scroll')
    document.querySelector('nav').classList.toggle('window_scroll', window.scrollY > 0);
})

//content text Area
document.getElementById('submit').addEventListener('click', function(){SubAnswer()})

function SubAnswer() {
    console.log(CKEDITOR.instances.editor.getData())
}





const menu = document.querySelector('.nav-menu');
const open_menu_btn = document.querySelector('#open-menu-btn');
const close_menu_btn = document.querySelector('#close-menu-btn');

open_menu_btn.addEventListener('click', () => {
    menu.style.display = 'flex'
    close_menu_btn.style.display = 'inline-block'
    open_menu_btn.style.display = 'none'
})
close_menu_btn.addEventListener('click', () => {
    menu.style.display = 'none'
    open_menu_btn.style.display = 'inline-block'
    close_menu_btn.style.display = 'none'
})



// --------- SHOW / HIDE 
// const menu = document.querySelector('.nav-menu');
const open_menu_bt = document.querySelector('#open-menu-bt');
const close_menu_bt = document.querySelector('#close-menu-bt');
const navi = document.querySelector('.navigation')

open_menu_bt.addEventListener('click', () => {
    navi.style.display = 'flex'
    close_menu_bt.style.display = 'inline-block'
    open_menu_bt.style.display = 'none'
    // open_menu_bt.classList.toggle('active')
})
close_menu_bt.addEventListener('click', () => {
    navi.style.display = 'none'
    open_menu_bt.style.display = 'inline-block'
    close_menu_bt.style.display = 'none'
})