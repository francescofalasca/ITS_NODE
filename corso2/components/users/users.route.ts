import express from 'express';
import * as usersController from './users.controller.js';

const router = express.Router();

router.get('/:id', usersController.getUserByID);
router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

export default router;