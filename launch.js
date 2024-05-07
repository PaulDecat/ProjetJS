"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Launch = void 0;
var node_http_1 = require("node:http");
var node_fs_1 = require("node:fs");
var expense_ts_1 = require("./expense.ts");
var npm_mime_1 = require("npm:mime");
var Launch = /** @class */ (function () {
    function Launch() {
        this.SERV = {
            host: "localhost",
            port: "8080",
            http: node_http_1.createServer,
        };
    }
    Launch.prototype.startServer = function () {
        var _this = this;
        var server = this.SERV.http(function (req, res) {
            var _a;
            if (req.url === '/') {
                var filePath = ('Frontpage.html');
                (0, node_fs_1.readFile)(filePath, function (err, data) {
                    if (err) {
                        res.writeHead(404);
                        res.end("404 Not Found");
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    return res.end();
                });
            }
            else if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/static')) {
                var fileName = req.url.replace('/static/', '');
                var filePath_1 = "public/".concat(fileName);
                (0, node_fs_1.readFile)(filePath_1, function (err, data) {
                    if (err) {
                        console.error(err);
                        res.writeHead(404);
                        res.end("404 Not Found");
                        return;
                    }
                    var type = npm_mime_1.default.getType(filePath_1);
                    res.writeHead(200, { 'Content-Type': type !== null && type !== void 0 ? type : 'text/plain' });
                    res.write(data);
                    return res.end();
                });
            }
            else if (req.url === '/url') {
                var body_1 = "";
                req.on("data", function (chunk) {
                    body_1 += chunk;
                });
                req.on("end", function () {
                    var data = (0, expense_ts_1.parseFormData)(body_1); // Utiliser la fonction pour convertir les données en objet
                    console.log(data);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(data));
                    // Additionner les valeurs
                    var totalIncome = data.travail + data.investissement + data.autres;
                    var totalExpense = data.depense;
                    // Calculer le solde
                    var balance = totalIncome - totalExpense;
                    // Créer un objet pour renvoyer les résultats
                    var result = {
                        totalIncome: totalIncome,
                        totalExpense: totalExpense,
                        balance: balance
                    };
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(result));
                    console.log(result);
                });
            }
            else {
                res.writeHead(404);
                res.end("404 Not Found");
            }
        });
        server.listen(this.SERV.port, this.SERV.host, function () {
            console.log("Server running at http://".concat(_this.SERV.host, ":").concat(_this.SERV.port, "/"));
        });
    };
    return Launch;
}());
exports.Launch = Launch;
var myLaunch = new Launch();
myLaunch.startServer();
