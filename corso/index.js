import 'dotenv/config';
import express from 'express';
import productsRoute from './components/products/products.route.js';

const app = express();

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

app.use((err, req, res, next) => {
    if (err.statusCode >= 400 && err.statusCode < 499) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        console.error(err.stack);

        res.status(500).json({ error: 'Si è verificato un errore, riprova più tardi.' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});