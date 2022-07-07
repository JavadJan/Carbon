// const puppeteer = require('puppeteer');
import puppeteer from "puppeteer" 
// import puppeteer from 'https://cdn.jsdelivr.net/npm/puppeteer@15.3.1/lib/cjs/puppeteer/puppeteer.min.js'

async function scrapeCourse(url){

    // lunch puppteer
    const browser = await puppeteer.launch()

    // create a browser web page
    const page = await browser.newPage()

    // go to the that web page
    await page.goto(url)

    const[el] =await page.$x('//*[@id="main"]/div[2]/h1')
    const txt = await el.getProperty('textContent');
    const srcText = await txt.jsonValue(); 

    console.log([srcText])

    browser.close()
}
scrapeCourse('https://www.coursera.org/learn/learning-how-to-learn?irclickid=WesXXjViExyIUwtQopym208zUkD0%3Apwv4wqLSI0&irgwc=1&utm_medium=partners&utm_source=impact&utm_campaign=259799&utm_content=b2c')