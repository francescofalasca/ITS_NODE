import 'dotenv/config';
// import http from 'http';
import express from 'express';

import productsRoute from './components/products/products.route.js';

const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log('Dentro middleware 1');

    next();
});

app.use((req, res, next) => {
    console.log('Dentro middleware 2');

    next();
});

app.use('/products', productsRoute);

app.use((req, res) => {
    res.status(404).send('Pagina non trovata.');
});

// const server = http.createServer((req, res) => {
//     console.log('Hello World!');

//     if (req.url === '/' && req.method === 'GET') {
//         res.writeHead(200, {'content-type': 'text/plain'})
//         res.end('Benvenuto nella home page');
//     } else if (req.url === '/about' && req.method === 'GET') {
//         res.writeHead(200, {'content-type': 'text/plain'});
//         res.end('Pagina About');
//     } else {
//         res.writeHead(404, {'content-type': 'text/plain'});
//         res.end('Pagina non trovata');
//     }
// });

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});

// server.listen(process.env.PORT);