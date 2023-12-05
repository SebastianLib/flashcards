import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewSet, startSetup} from "../redux/flashcards/flashcardsSlice";

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {flashcards, loading, error, status} = useSelector(state => state.flashcards)
  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch();

  const [items, setItems] = useState([
    {
      concept: "",
      definition: "",
    },
    {
      concept: "",
      definition: "",
    },
    {
      concept: "",
      definition: "",
    },
    {
      concept: "",
      definition: "",
    },
    {
      concept: "",
      definition: "",
    },
  ]);

  const addNewFlashcard = () => {
    setItems((prev) => [
      ...prev,
      {
        concept: "",
        definition: "",
      },
    ]);
  };

  const handleFlashcard = (e) => {
    const name = e.target.id.split(" ")[0];
    const id = e.target.id.split(" ")[1];
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[id] = {
        ...updatedItems[id],
        [name]: e.target.value,
      };
      return updatedItems;
    });
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    dispatch(createNewSet({
      title,
      description,
      items,
      userRef: currentUser?._id
    }))
   }

   useEffect(()=>{
    dispatch(startSetup());
   },[])

  return (
    <section className="min-h-screen bg-slate-100">
      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="md:min-w-[400px] mx-auto py-32 px-12 rounded-xl">
          <h1 className="text-4xl font-extrabold mb-4">
            Create a new study set
          </h1>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 lg:text-xl font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-white border border-gray-300 text-gray-900 lg:text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="enter a title for example 'learning English - home'"
              required
              onChange={(e)=>setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="block mb-2 lg:text-xl font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full lg:text-xl text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Add description..."
              onChange={(e)=>setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
          <div className="my-8">
            {items.map((item, index) => (
              <div key={index} className="mb-5 bg-white p-4 w-full rounded-lg">
                <h1 className="text-xl font-extrabold">{index+1}</h1>
                <div className="flex flex-col lg:flex-row lg:gap-16">
                  <div className="flex flex-col flex-1 ">
                    <input
                      type="text"
                      id={`concept ${index}`}
                      className="border-b-2 border-black text-gray-900 lg:text-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder=""
                      required
                      onChange={handleFlashcard}
                    />
                    <label
                      htmlFor={`concept ${index}`}
                      className="block mb-2 lg:text-xl font-medium text-gray-700  mt-2"
                    >
                      concept
                    </label>
                  </div>

                  <div className="flex flex-col flex-1 ">
                    <input
                      type="text"
                      id={`definition ${index}`}
                      className="border-b-2 border-black  text-gray-900 lg:text-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder=""
                      required
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
              </div>
            ))}
          </div>

          <button
            onClick={addNewFlashcard}
            className="w-full bg-white mb-4 py-8 text-2xl font-extrabold"
          >
            add a new flashcard <br />
            <span className="text-5xl text-blue-700">+</span>
          </button>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-10 py-4 text-center  disabled:opacity-80"
            disabled={loading}
          >
            Submit
          </button>
          {error && <p className="mt-2">{error}</p>}
          {status && <p className="mt-2">{status}</p>}
        </form>
      </div>
    </section>
  );
}
