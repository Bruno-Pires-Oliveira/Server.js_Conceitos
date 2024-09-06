const http = require("http");

const host = "local host";
const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.write("<h1>Hello world</h1>")
})

server.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`)
})