import puppeteer from "puppeteer"
import fs from 'fs/promises'
import { rename } from "fs"


async function scrapeCourse(url) {

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

    // const photos = await page.$$eval('.scrollable-discovery-card-spacing > a[href]' , (a)=>{
    //     return img.map((x)=>x.getAttribute('href'))
    // })
    // console.log(photos)

    // // download picture
    // for (const photo of photos) {
    //     const imagePage = await page.goto(photo);
    //     await fs.writeFile(photo.split("/").pop(),await imagePage.buffer())
    // }

    browser.close()
}


// var linkPage =['https://www.edx.org/course/introduction-computer-science-harvardx-cs50x?source=aw&awc=6798_1658416462_58bc4228d611846eb3c8b3752f95482a&utm_source=aw&utm_medium=affiliate_partner&utm_content=text-link&utm_term=301045_https%3A%2F%2Fwww.class-central.com%2F' , 'https://www.edx.org/course/introduction-to-linux?source=aw&awc=6798_1658416566_de6c5f55b8c6fee2d5bd0efbe05928d2&utm_source=aw&utm_medium=affiliate_partner&utm_content=text-link&utm_term=301045_https%3A%2F%2Fwww.class-central.com%2F', 'https://www.edx.org/course/introduction-to-computer-science-and-programming-7?source=aw&awc=6798_1658416588_b603975d02db862d586c6b6cdcbc61b6&utm_source=aw&utm_medium=affiliate_partner&utm_content=text-link&utm_term=301045_https%3A%2F%2Fwww.class-central.com%2F']

var courseObj = {
    kaggle: 'https://www.kaggle.com/learn',

}
var link = 'https://www.edx.org/search?q=free+'

scrapeCourse(link)
function hanldePage() {
    linkPage.map(x => { scrapeCourse(x) })
}
// hanldePage()