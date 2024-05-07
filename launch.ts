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
            const data = parseFormData(body); // Utiliser la fonction pour convertir les données en objet
            console.log(data);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));

        // Additionner les valeurs
        const totalIncome = data.travail + data.investissement + data.autres;
        const totalExpense = data.depense;

        // Calculer le solde
        const balance = totalIncome - totalExpense;

        // Créer un objet pour renvoyer les résultats
        const result = {
            totalIncome,
            totalExpense,
            balance
        };

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