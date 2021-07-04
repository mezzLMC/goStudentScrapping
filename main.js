const { element2selector } = require("puppeteer-element2selector")
var webdriver = require('selenium-webdriver');
var express = require('express')
const puppeteer = require('puppeteer');
const { Keyboard } = require('selenium-webdriver/lib/input');
//var app = express()

//var port = process.env.PORT || 14000;
var By = webdriver.By;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function main(){
    const browser = await puppeteer.launch({ headless: false, product: 'firefox'});
    const page = await browser.newPage();
    await page.goto('https://www.gostudent.org/login/?lng=fr');
    await page.waitForXPath('(//div[@class="col"]/div)')
    let id = await page.$x('(//div[@class="col"]/div)')
    await id[0].click()
    await page.waitForXPath('//*[@id="root"]/div[2]/div/div/div[2]/div[1]/div/div[2]/div/div/span')
    let collapse = await page.$x('//*[@id="root"]/div[2]/div/div/div[2]/div[1]/div/div[2]/div/div/div')
    await collapse[0].click()
    await sleep(1000)
    let frIndic = await page.$x('//*[@id="root"]/div[2]/div/div/div[2]/div[1]/div/div[2]/div/div/ul/li[5]')
    await frIndic[0].click()
    let numberIndice = await page.$x('//*[@id="root"]/div[2]/div/div/div[2]/div[1]/div/div[2]/div/div/span')
    let numberInput = await page.$x('//input[@type="tel"]')
    await numberInput[0].type("0630800818", {delay: 20})
    let validButton = await page.$x('//*[@id="root"]/div[2]/div/div/div[2]/div[2]/div')
    await validButton[0].click()
    await page.waitForXPath('//input[@id="digit-1"]')
    let d1 = await page.$x('//input[@id="digit-1"]')
    await d1[0].type("2309", {delay: 30})
    let loginButton = await page.$x('//*[@id="root"]/div[2]/div/div/div[4]/div')
    await loginButton[0].click()
    await page.waitForXPath('//*[@id="root"]/div[1]/div[1]/div/div[2]/div/div[1]/div/div[1]/div')
    try{
        let container = await page.$x('//*[@id="root"]/div[1]/div[1]/div/div[2]/div/div[1]/div/div[1]/div')
        let childrens = await container[0].evaluate((e) => {
            let arr = [1,2,3]
            console.log("cc 1")
            Array.from(e.children).forEach(el=> {
                if(el.children[1]) console.log(el.children[0].innerHTML)
            })
            return arr
        })
        console.log(childrens)
    }
    catch(err){
        console.log(err)
    }
    try{
        let c2 = await page.$x('//*[@id="root"]/div[1]/div[1]/div/div[2]/div/div/div/div[1]/div/div[2]')
        let nChild = await c2[0].evaluate((e) => Array.from(e.children).length)
        for (let i = 1; i <= nChild; i++) {
            console.log()
        }
        let x = await page.$x('//*[@id="root"]/div[1]/div[1]/div/div[2]/div/div/div/div[1]/div/div[2]/div')
        let y = []
        x.forEach(el=>{
            let resp = el.$eval(element => element.innerHTML)
            y.push(resp)
        })
        console.log(y)
    }
    catch(err){
        console.log(err)
    }
    
    

    
}

main()


