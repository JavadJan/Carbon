import puppeteer from "puppeteer"
import fs from 'fs/promises'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

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

export async function scrapeCourse(url) {
    
    // lunch puppteer
    const browser = await puppeteer.launch()

    // create a browser web page
    const page = await browser.newPage()

    // go to the that web page
    await page.goto(url)

    //read title
    const titles =await page.evaluate(()=>{
       return Array.from(document.querySelectorAll('.h4.text-black')).map(x=>x.textContent)
    })
    for (let i = 0; i < titles.length; i++) {
        console.log(titles[i])
    }
    // await fs.writeFile('example.txt', titles.join("\r\n"))

    // const[el] =await page.$$eval('//*[@id="main-content"]/div[2]/div/div[1]/div/div[5]/div[1]/div')
    // const txt = await el.getProperty('textContent');
    // const srcText = await txt.jsonValue(); 

    // const[el2] =await page.$$eval('//*[@id="main-content"]/div[2]/div/div[1]/div/div[5]/div[1]/div')
    // const txt2 = await el.getProperty('textContent');
    // const srcText2 = await txt.jsonValue();

    // console.log(srcText,srcText2)

    // await page.screenshot({path:"amazing.png", fullPage:true})

    // let text = await page.$$eval('.h4.text-black', (a)=>{
    //     a.map((x)=>{console.log(x.innerText)})

    // })
    // console.log(text)

    const title = await page.$$('.scrollable-discovery-card-spacing > a')
    for (let i = 0; i < title.length; i++) {
        const element = title[i].getProperty('innerText');
        let txt =(await element).jsonValue()
        console.log(txt)
    }
    //
    var freeCourse = [
        'https://www.edx.org/course/python-basics-for-data-science?index=product&queryID=95772c564ea988b1f53ab5866fecab54&position=1',
        'https://www.edx.org/course/successful-negotiation-essential-strategies-and-skills?index=product&queryID=95772c564ea988b1f53ab5866fecab54&position=2',
        'https://www.edx.org/course/project-management-for-development?index=product&queryID=95772c564ea988b1f53ab5866fecab54&position=3',
        'https://www.edx.org/course/the-science-of-happiness-3?index=product&queryID=95772c564ea988b1f53ab5866fecab54&position=4'
    ]
    var arrLink = []
    let links = await page.$$('.scrollable-discovery-card-spacing > a[href]')
    for (const link of links) {
        let valueHandel = await link.getProperty('href')
        arrLink.push(await valueHandel.jsonValue())
    }
    console.log(arrLink)

    const photos = await page.$$eval('.lazy.d-card-hero-image.entered.loaded' , (imgs)=>{
        return imgs.map(x=>x.src)
    })
    console.log(photos)
    
    // download picture
    for (const i in photos) {
        const imagePage = await page.goto(photos[i]);
        let pho = photos[i].split("/")[photos[i].split("/").length-1]=i+'.jpg'
        console.log('poooooooooooo: ',pho)
        await fs.writeFile(pho,await imagePage.buffer())
    }


//     document.querySelector('.categories_right').innerHTML+=`<article class="category">
//     <span class="category_icon"><i class="uil uil-html5-alt"></i></span>
//     <h5>python</h5>
//     <p><a href="https://www.edx.org/course/introduction-computer-science-harvardx-cs50x?source=aw&awc=6798_1658416462_58bc4228d611846eb3c8b3752f95482a&utm_source=aw&utm_medium=affiliate_partner&utm_content=text-link&utm_term=301045_https%3A%2F%2Fwww.class-central.com%2F"></a>Python Basics for DataScience…</p>
// </article>`

    browser.close()
}


var linkPage =['https://www.edx.org/course/introduction-computer-science-harvardx-cs50x?source=aw&awc=6798_1658416462_58bc4228d611846eb3c8b3752f95482a&utm_source=aw&utm_medium=affiliate_partner&utm_content=text-link&utm_term=301045_https%3A%2F%2Fwww.class-central.com%2F' , 'https://www.edx.org/course/introduction-to-linux?source=aw&awc=6798_1658416566_de6c5f55b8c6fee2d5bd0efbe05928d2&utm_source=aw&utm_medium=affiliate_partner&utm_content=text-link&utm_term=301045_https%3A%2F%2Fwww.class-central.com%2F', 'https://www.edx.org/course/introduction-to-computer-science-and-programming-7?source=aw&awc=6798_1658416588_b603975d02db862d586c6b6cdcbc61b6&utm_source=aw&utm_medium=affiliate_partner&utm_content=text-link&utm_term=301045_https%3A%2F%2Fwww.class-central.com%2F']

var courseObj = {
    kaggle: 'https://www.kaggle.com/learn',

}
var link = 'https://www.edx.org/search?q=free+'

scrapeCourse(link)

// hanldePage()