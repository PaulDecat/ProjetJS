import * as cheerio from 'https://deno.land/x/cheerio@1.0.7/mod.ts';


class HtmlProcessor {

    private filepath: string;

    constructor(filepath: string) {
        this.filepath = filepath;
    }

    private getNumberFromHTML(html: string): number {
        const $ = cheerio.load(html);
        const number = $('h1').text();
        return Number(number);
    }

}

const htmlProcessor = new htmlProcessor("Frontpage.html");