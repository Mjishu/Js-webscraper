import {JSDOM} from 'jsdom'
import {URL} from "url"

function normalizeUrl(url){
    const newUrl = new URL(url);
    let fullPath = `${newUrl.host}${newUrl.pathname}`
    if (fullPath.slice(-1) === "/"){
        fullPath = fullPath.slice(0,-1)
    }
    return fullPath
}

function getUrlsFromInput(htmlText,baseUrl){
    const normalizedUrl = []
    const dom = new JSDOM(htmlText);
    const anchored = dom.window.document.querySelectorAll("a");

    const hrefs = anchored.forEach(anchor =>{
        let item = anchor.getAttribute("href");

        if(item){
            item = new URL(item,baseUrl).href;
            normalizedUrl.push(item)
        }
    })
    return normalizedUrl
}

async function crawlPage(baseUrl,currentUrl = baseUrl,pages = {}){
    const base = new URL(baseUrl);
    const current = new URL(currentUrl)
    if(base.hostname !== current.hostname){return pages}

    const currentNormal = normalizeUrl(currentUrl)
    if(pages[currentNormal] > 0 ){
        pages[currentNormal] ++;
        return pages 
    }
    pages[currentNormal] = 1

    console.log(`actively crawling: ${currentUrl}`)

    try{
    //fetch call
    const response = await fetch(currentUrl);
    if(response.status > 400){
        console.error(`their was an issue accessing this site`)
        return pages
    }
    if(response.headers.get("content-type").split(";")[0] !== "text/html"){
        console.error("not the right content type")
        return pages
    }


    const resp = await response.text()

    const nextUrls = getUrlsFromInput(resp,currentUrl);

    for(const nextUrl of nextUrls){
        pages =await crawlPage(baseUrl,nextUrl,pages)
    }

}catch(error){
    console.error("error fetching page: ",error)
    return
}
return pages
}

export {normalizeUrl, getUrlsFromInput,crawlPage}