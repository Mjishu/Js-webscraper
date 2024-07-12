import {argv} from "node:process"
import { crawlPage } from "./crawl.js";
import { printReport } from "./printReport.js";

async function main(){
    if(argv.length < 3) return;
    if(argv.length > 3) return;
    const baseUrl = argv[2]
    console.log(`starting crawler at ${baseUrl} url`)


    const pages = await crawlPage(baseUrl,baseUrl,{})
    printReport(pages)
}

main()  