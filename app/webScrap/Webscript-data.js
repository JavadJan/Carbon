import puppeteer from "puppeteer" 
import fs from 'fs/promises'
import { rename } from "fs"


async function scrapeCourse(url){

    // lunch puppteer
    const browser = await puppeteer.launch()

    // create a browser web page
    const page = await browser.newPage()

    // go to the that web page
    await page.goto(url)

    const title = page.evaluate(()=>{
       return Array.from(document.querySelectorAll('.text-black').map((x)=>{x.getAttribute('href')}))
    })
    console.log(title)
    await fs.writeFile('example.txt', title.join("\r\n"))

    // const[el] =await page.$$eval('//*[@id="main-content"]/div[2]/div/div[1]/div/div[5]/div[1]/div')
    // const txt = await el.getProperty('textContent');
    // const srcText = await txt.jsonValue(); 

    // const[el2] =await page.$$eval('//*[@id="main-content"]/div[2]/div/div[1]/div/div[5]/div[1]/div')
    // const txt2 = await el.getProperty('textContent');
    // const srcText2 = await txt.jsonValue();

    // console.log(srcText,srcText2)

    // await page.screenshot({path:"amazing.png", fullPage:true})

    let txt = await page.$$eval('.pr-4 > p', (p)=>{
        p.map((x)=>{x.textContent})
    })
    console.log(txt)

    const photos = await page.$$eval('.mw-100 > img' , (img)=>{
        return img.map((x)=>x.src)
    })
    console.log(photos)
    
    // download picture
    for (const photo of photos) {
        const imagePage = await page.goto(photo);
        await fs.writeFile(photo.split("/").pop(),await imagePage.buffer())
    }

    browser.close()
}


// var linkPage =['https://www.edx.org/course/introduction-computer-science-harvardx-cs50x?source=aw&awc=6798_1658416462_58bc4228d611846eb3c8b3752f95482a&utm_source=aw&utm_medium=affiliate_partner&utm_content=text-link&utm_term=301045_https%3A%2F%2Fwww.class-central.com%2F' , 'https://www.edx.org/course/introduction-to-linux?source=aw&awc=6798_1658416566_de6c5f55b8c6fee2d5bd0efbe05928d2&utm_source=aw&utm_medium=affiliate_partner&utm_content=text-link&utm_term=301045_https%3A%2F%2Fwww.class-central.com%2F', 'https://www.edx.org/course/introduction-to-computer-science-and-programming-7?source=aw&awc=6798_1658416588_b603975d02db862d586c6b6cdcbc61b6&utm_source=aw&utm_medium=affiliate_partner&utm_content=text-link&utm_term=301045_https%3A%2F%2Fwww.class-central.com%2F']

var link = 'https://www.edx.org/search?q=free+'

scrapeCourse(link)
function hanldePage (){
    linkPage.map(x=>{scrapeCourse(x)})
}
// hanldePage()