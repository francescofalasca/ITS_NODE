import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Benvenuto nella home page');
});

router.get('/about', (req, res) => {
    res.status(200).send('Pagina About');
});

export default router;