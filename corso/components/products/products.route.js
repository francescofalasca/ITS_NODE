import express from 'express';
import * as productsController from './products.controller.js';

const router = express.Router();

router.get('/:id', productsController.getProductByID);
router.get('/', productsController.getProducts);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;