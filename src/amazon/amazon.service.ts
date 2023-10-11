import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer, { Browser } from 'puppeteer-core';


@Injectable()
export class AmazonService {
    constructor(private readonly configService:ConfigService){

    }
     async getProducts(product:string) {
        let browser:Browser
       
        try {
            
            browser = await puppeteer.connect({
                browserWSEndpoint: this.configService.get<string>('SBR_WS_ENDPOINT'),
    
            }); 
            console.log(browser)
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(2*60*1000)
            await Promise.all([
                page.waitForNavigation(),
                page.goto('https://www.amazon.com')
            ])
            await page.type('#twotabsearchtextbox',product)
            await Promise.all([
                page.waitForNavigation(),
                page.click('#nav-search-submit-button')
            ])
            return await page.$$eval(".s-search-results .s-card-container",(resultItmes)=>{
                return resultItmes.map((resultItem)=>{ 
                    const url = resultItem.querySelector("a").href
                    const title = resultItem.querySelector("s-title-instructions-style span")?.textContent
                    const price = resultItem.querySelector(".a-price a-offscreen")?.textContent
                    return {
                        url,title,price
                    }
                })
            })
        }catch(e){console.log(e)
         throw new HttpException(e.message,500)   
        }finally{
            if(browser)  await browser.close();
         
        
        }
       
    }
}
