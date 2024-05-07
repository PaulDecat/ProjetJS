import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { readFile,  } from "node:fs";
import { parseFormData } from "./expense.ts";
import mime from 'npm:mime';
import qs from 'npm:querystring';


export class Launch {
    SERV: any;

    constructor() {
        this.SERV = {
            host: "localhost",
            port: "8080",
            http: createServer,
        };
    }

    startServer() {
        const server = this.SERV.http((req: IncomingMessage, res: ServerResponse) => {
            if (req.url === '/') {
                const filePath = ('Frontpage.html');

                readFile(filePath, (err, data) => {
                    if (err) {
                        res.writeHead(404);
                        res.end("404 Not Found");
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    return res.end();
                });
            } else if (req.url === '/result') { 
                const filePath2 = ('result.html');

                readFile(filePath2, (err, data) => {
                    if (err) {
                        res.writeHead(404);
                        res.end("404 Not Found");
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    return res.end();
                });


            } else if (req.url?.startsWith('/static')) {
                const fileName = req.url.replace('/static/', '');
                const filePath = `public/${fileName}`;                
                readFile(filePath, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.writeHead(404);
                        res.end("404 Not Found");
                        return;
                    }
                    const type = mime.getType(filePath);
                    res.writeHead(200, { 'Content-Type': type ?? 'text/plain' });
                    res.write(data);
                    return res.end();
                });
            } else if (req.url === '/url'){
                let body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });

        req.on("end", function(){
            const data = parseFormData(body); 
            console.log(data);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));

        
        const totalIncome = data.travail + data.investissement + data.autres;
        const totalExpense = data.depense;

        const balance = totalIncome - totalExpense;

        const result = {
            totalIncome,
            totalExpense,
            balance
        };

        const expenseLog = totalIncome*0.3;
        const expenseNou = 300;
        const expenseAbo = totalIncome*0.1;
        const expenseAssu = totalIncome*0.2;
        const expenseSau = totalIncome*0.1;
        const expenseAutre = totalIncome - expenseAbo - expenseNou - expenseAssu - expenseSau - expenseLog;


        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
        console.log(result);
        });
             
            } else {
                res.writeHead(404);
                res.end("404 Not Found");
            }
        });

        server.listen(this.SERV.port, this.SERV.host, () => {
            console.log(`Server running at http://${this.SERV.host}:${this.SERV.port}/`);
        });
    }
}


const myLaunch = new Launch();
myLaunch.startServer();