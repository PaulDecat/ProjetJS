import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { readFile } from "node:fs";
import { parseFormData } from "./expense.ts";
import mime from 'npm:mime';
import Chart from 'chart.js/auto';

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
                const filePath = 'Frontpage.html';

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
            } else if (req.url === '/url') {
    let body = "";
    req.on("data", function (chunk) {
        body += chunk;
    });

    req.on("end", function () {
        const data = parseFormData(body);
        console.log(data);
        const totalIncome = data.travail + data.investissement + data.autres;
        const totalExpense = data.depense;
        const balance = totalIncome - totalExpense;
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

    createChart(data: { totalIncome: any; totalExpense: any; balance: number; }, _res: ServerResponse) {
        const labels = ['Total Income', 'Total Expense', 'Balance'];
        const values = [data.totalIncome, data.totalExpense, data.balance];

        const canvas = document.getElementById('myChart') as HTMLCanvasElement;

        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Financial Overview',
                            data: values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(75, 192, 192, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            } else {
                console.error('Unable to get 2D context of canvas.');
            }
        } else {
            console.error('Canvas element with ID "myChart" not found.');
        }
    }
}

const myLaunch = new Launch();
myLaunch.startServer();
