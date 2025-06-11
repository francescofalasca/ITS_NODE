import express from 'express';

const router = express.Router();

router.get('/products/add-product', (req, res) => {
    res.status(200).send(`
        <form action="/products" method="POST"> 
            <input type="text" name="title" required>
            <button type="submit">Aggiungi prodotto</button>
        </form>        
    `);
});

router.post('/products', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

export default router;