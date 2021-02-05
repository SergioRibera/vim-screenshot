const puppeteer = require('puppeteer');
const sh = require('shelljs');
const open = require('open');
const fs = require('fs');
const args = process.argv.slice(2);

function generateJsFile(pathJsonFile, pathOutput){
    fs.readFile(pathJsonFile, "utf-8", (err, data) => {
        if (err) console.log(err);
        fs.writeFile(pathOutput, `const data=${data.trim()};`, (err) => {
            if (err) console.log(err);
        });
    });
}

var adjustNum = function adjustNum(value) {
  return value < 10 ? "0" + value : value;
};

async function main() {
    if (args.length <= 0) throw new Error("This Application require arguments");
    console.dir(args);
    switch(args[0]){
        case "genjs":
            generateJsFile(args[1], args[2]);
            break;
        case "screenshot":
            sh.mkdir("-p", args[2]);
            puppeteer.launch({
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage'
                ]}).then(async browser => {
                    const page = await browser.newPage();
                    await page.goto("file://" + args[1], {
                        waitUntil: 'domcontentloaded'
                    }); // index File
                    await page.waitForSelector('#my-node');
                    try {
                        const url = await page.$('#my-node')
                        const contentBuffer = await url.screenshot({ omitBackground: true });
                        var d = new Date();
                        var date = "_" + adjustNum(d.getDay()) + adjustNum(d.getMonth()) + d.getFullYear() + "_" + adjustNum(d.getHours()) + adjustNum(d.getMinutes()) + adjustNum(d.getSeconds());
                        fs.writeFileSync(args[2]+"/Vim-Screenshot"+date+".png", contentBuffer, 'base64');
                    } catch (e) {
                        console.log(e);
                    }
                    browser.close();
                });
            break;
        default:
            open(args[0]);
            break;
    }
}
main();
