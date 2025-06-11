import 'dotenv/config';
import http from 'http';

const server = http.createServer((req, res) => {
    console.log('Hello World!');

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, {'content-type': 'text/plain'})
        res.end('Benvenuto nella home page');
    } else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('Pagina About');
    } else {
        res.writeHead(404, {'content-type': 'text/plain'});
        res.end('Pagina non trovata');
    }
});

server.listen(process.env.PORT);