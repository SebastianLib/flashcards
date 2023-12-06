import FlashcardSet from "../models/flashcard.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createNewSet = async (req, res, next) => {
  try {
    const validUser = await User.findOne({ _id: req.body.userRef });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const newFlashcardSet = new FlashcardSet({
      name: req.body.name,
      description: req.body.description || null,
      userRef: req.body.userRef,
      flashcards: req.body.items,
    });
    await newFlashcardSet.save();

    const flashcards = await FlashcardSet.find({ userRef: req.body.userRef });
    res.status(201).json(flashcards);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getFlashcards = async (req, res, next) => {
  try {
    const flashcards = await FlashcardSet.find({ userRef: req.query.userRef });
    res.status(201).json(flashcards);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateSet = async (req, res, next) => {
  try {
    await FlashcardSet.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        flashcards: req.body.flashcards,
      }
    );
    const flashcards = await FlashcardSet.find({ userRef: req.body.userRef });

    res.status(201).json(flashcards);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const removeSet = async (req, res, next) => {
  console.log(req.body.setId);
  try {
    await FlashcardSet.deleteOne({ _id: req.body.setId });
    const flashcards = await FlashcardSet.find({ userRef: req.body.userRef });

    res.status(201).json({ flashcards });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const removeFlashcard = async (req, res, next) => {
  try {
    const result = await FlashcardSet.findOneAndUpdate(
      { _id: req.body.setId },
      { $pull: { flashcards: { _id: req.body.flashcardId } } },
      { new: true }
    );
    const flashcards = await FlashcardSet.find({ userRef: req.body.userRef });

    res.status(201).json({ flashcards });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addNewFlashcard = async (req, res, next) => {
  try {
    await FlashcardSet.updateOne(
      { _id: req.body._id },
      {
        $push: {
          flashcards: {
            concept: req.body.concept,
            definition: req.body.definition,
          },
        },
      }
    );

    const flashcards = await FlashcardSet.find({ userRef: req.body.userRef });

    res.status(201).json({ flashcards });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
