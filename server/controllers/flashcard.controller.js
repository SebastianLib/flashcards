import FlashcardSet from "../models/flashcard.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const createNewSet = async (req, res, next) => {

    try {
        const validUser = await User.findOne({ _id: req.body.userRef});
        if (!validUser) return next(errorHandler(404, "User not found!"));
        const newFlashcardSet = new FlashcardSet({
            name: req.body.name,
            description: req.body.description || null,
            userRef: req.body.userRef,
            flashcards: [
                {
                  "concept": "JavaScript",
                  "definition": "JavaScript is a programming language that enables interactive web pages."
                },
                {
                  "concept": "Node.js",
                  "definition": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
                },
                {
                  "concept": "MongoDB",
                  "definition": "MongoDB is a NoSQL database that provides high performance, high availability, and easy scalability."
                }
              ]
          });
          await newFlashcardSet.save();
          res.status(201).json(newFlashcardSet)
    } catch (error) {
        next(error);
    }
}