import { Button, Tooltip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import {
  addNewFlashcard,
  removeFlashcard,
  updateSet,
} from "../redux/flashcards/flashcardsSlice";
import SingleCard from "../components/SingleCard";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import AddNewFlashcard from "../components/AddNewFlashcard";

export default function Set() {
  const [actualFlashcards, setactualFlashcards] = useState(null);
  const [actualSet, setActualSet] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { flashcards } = useSelector((state) => state.flashcards);

  const handleFlashcard = (e) => {
    const name = e.target.id.split(" ")[0];
    const id = e.target.id.split(" ")[1];
    setActualSet((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[id] = {
        ...updatedItems[id],
        [name]: e.target.value,
      };
      return updatedItems;
    });
  };

  const handleEditSubmit = () => {
    setEdit(false);
    setEdit(null);
    const newSet = { ...actualFlashcards, flashcards: actualSet };
    dispatch(updateSet(newSet));
  };

  const handleRemoveFlashcard = (id, index) => {
    const newArray = actualFlashcards?.flashcards?.filter(
      (flashcard) => flashcard._id !== id
    );
    const newSet = { ...actualFlashcards, flashcards: newArray };
    setActualSet(newSet.flashcards);
    setactualFlashcards(newSet);
    dispatch(
      removeFlashcard({
        setId: actualFlashcards._id,
        flashcardId: id,
        userRef: actualFlashcards.userRef,
      })
    );
  };

  const handleNewFlashcard = (concept, definition) => {
    event.preventDefault();
    dispatch(addNewFlashcard({concept,definition,_id:actualFlashcards._id, userRef:actualFlashcards.userRef}))
  };

  useEffect(() => {
    setShowResults(false);
    const set = flashcards?.filter((set) => set._id === id);
    setactualFlashcards(set[0]);
    setActualSet(set[0]?.flashcards);
  }, [flashcards]);

  return (
    <section className="min-h-screen bg-slate-100 overflow-x-hidden px-2">
      <div className="container mx-auto pt-32">
        <SingleCard actualFlashcards={actualFlashcards} />

        <div className="my-12 w-full max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold">
            Number of concepts in this set ({actualSet?.length})
          </h1>
          <div className="flex flex-col gap-4 mt-6">
            {actualSet?.map((flashcard, index) => {
              return (
                <div key={index}>
                  {edit === true && editId === flashcard._id ? (
                    <div className="flex flex-col lg:flex-row lg:gap-16 bg-white p-4">
                      <div className="flex flex-col sm:flex-row items-center w-full justify-between">
                        <div className="flex flex-col md:flex-row gap-8 w-full">
                          <div className="flex flex-col w-full">
                            <input
                              type="text"
                              id={`concept ${index}`}
                              className="border-b-2 border-black text-gray-900 lg:text-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                              required
                              defaultValue={flashcard.concept}
                              onChange={handleFlashcard}
                            />
                            <label
                              htmlFor={`concept ${index}`}
                              className="block mb-2 lg:text-xl font-medium text-gray-700  mt-2"
                            >
                              concept
                            </label>
                          </div>

                          <div className="flex flex-col w-full">
                            <input
                              type="text"
                              id={`definition ${index}`}
                              className="border-b-2 border-black  text-gray-900 lg:text-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                              required
                              defaultValue={flashcard.definition}
                              onChange={handleFlashcard}
                            />
                            <label
                              htmlFor={`definition ${index}`}
                              className="block mb-2 lg:text-xl font-medium text-gray-700  mt-2"
                            >
                              definition
                            </label>
                          </div>
                        </div>

                        <div className="px-4 pl-16">
                          <Button
                            onClick={handleEditSubmit}
                            className="bg-blue-700 transition-colors duration-300 hover:bg-blue-600 p-4 w-10 xl:w-12 h-10 xl:h-12 flex items-center text-2xl justify-center rounded-full text-white"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="w-full flex flex-col sm:flex-row items-center justify-between bg-white p-6 py-4 cursor-pointer rounded-xl"
                    >
                      <div className="flex items-center p-2">
                        <p className="text-lg px-4">{flashcard.concept}</p>
                        <p className="text-lg border-l-2 px-4">
                          {flashcard.definition}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <CiEdit
                          onClick={() => {
                            setEdit(true);
                            setEditId(flashcard._id);
                          }}
                          className="text-4xl transition-colors duration-300 text-black hover:text-slate-700"
                        />
                        <MdOutlineRemoveCircleOutline
                          onClick={() =>
                            handleRemoveFlashcard(flashcard._id, index)
                          }
                          className="text-4xl transition-colors duration-300 text-red-700 hover:text-red-600"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          <AddNewFlashcard handleNewFlashcard={handleNewFlashcard}/>
          </div>
        </div>
      </div>
    </section>
  );
}
