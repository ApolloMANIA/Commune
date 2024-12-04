
import express from 'express';
import { googleAuth } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/callback', googleAuth);

export default router;