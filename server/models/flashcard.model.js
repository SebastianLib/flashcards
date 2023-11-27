import mongoose from "mongoose";
const { Schema } = mongoose;

const flashcardSchema = new Schema({
  concept: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
});

const flashcardSetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userRef: {
    type: String,
    required: true,
  },
  flashcards: [flashcardSchema], 
});

const FlashcardSet = mongoose.model("Flashcard", flashcardSetSchema);

export default FlashcardSet;
