import http = require('http');

class Launch {
    SERV;
    constructor() {
        this.SERV = {
            host : "localhost",
            port : "8080",
            http : http
        } ;
    }
    startServer() {
        const server = this.SERV.http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello, World!\n');
          });
        server.listen(this.SERV.port, this.SERV.host, () => {
            console.log(`Server running at http://${this.SERV.host}:${this.SERV.port}/`);
        });
    }
}

const myLaunch = new Launch();
myLaunch.startServer();