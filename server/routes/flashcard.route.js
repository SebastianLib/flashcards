import express from 'express';
import { addNewFlashcard, createNewSet, getFlashcards, removeFlashcard, removeSet, updateSet } from '../controllers/flashcard.controller.js';
import { verifyToken } from '../utils/verifyUsers.js';

const router = express.Router();

// router.post("/create", verifyToken ,createNewSet);
router.post("/create", verifyToken ,createNewSet);
router.get("/getFlashcards",verifyToken,getFlashcards);
router.post("/updateSet", verifyToken ,updateSet);
router.delete("/removeSet", verifyToken ,removeSet);
router.delete("/removeFlashcard", verifyToken ,removeFlashcard);
router.post("/addNewFlashcard", verifyToken ,addNewFlashcard);

export default router