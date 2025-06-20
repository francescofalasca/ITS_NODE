import express from 'express';
import * as AuthenticationController from './authentication.controller.js';

const router = express.Router();

router.post('/signin', AuthenticationController.signin);

export default router;