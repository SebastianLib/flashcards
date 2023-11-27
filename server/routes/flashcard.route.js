import express from 'express';
import { createNewSet } from '../controllers/flashcard.controller.js';
import { verifyToken } from '../utils/verifyUsers.js';

const router = express.Router();

router.post("/create", verifyToken ,createNewSet);

export default router