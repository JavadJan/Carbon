// const puppeteer = require('puppeteer');
import puppeteer from "puppeteer" 
import fs from 'fs/promises'

// import puppeteer from 'https://cdn.jsdelivr.net/npm/puppeteer@15.3.1/lib/cjs/puppeteer/puppeteer.min.js'

async function scrapeCourse(url){

    // lunch puppteer
    const browser = await puppeteer.launch()

    // create a browser web page
    const page = await browser.newPage()

    // go to the that web page
    await page.goto(url)

    // const[el] =await page.$x('//*[@id="main"]/div[2]/h1')
    // const txt = await el.getProperty('textContent');
    // const srcText = await txt.jsonValue(); 

    // console.log([srcText])
    const photos = await page.$$eval('gallery-img' , (img)=>{
        return img.map((x)=>x.src)
    })
    console.log(photos)
    
    for (const photo of photos) {
        const imagePage = await page.goto(photo);
        await fs.writeFile(photo.split("/").pop(),await imagePage.buffer())
    }

    browser.close()
}
scrapeCourse('https://selskapslokaler.no/stavanger/stavanger-sentrum/gaffel-karaffel')