import { useState } from "react";

export default function AddNewFlashcard({ handleNewFlashcard }) {
  const [editNewFlashcard, setEditNewFlashcard] = useState(false);
  const [concept, setConcept] = useState("");
  const [definition, setDefinition] = useState("");
  return (
    <div>
      {!editNewFlashcard ? (
        <button
          onClick={() => setEditNewFlashcard(true)}
          className="w-full bg-white mb-4 py-3 text-2xl font-extrabold"
        >
          add a new flashcard <br />
          <span className="text-5xl text-blue-700">+</span>
        </button>
      ) : (
        <div className="mb-5 relative bg-white p-4 w-full rounded-lg">
          <form onSubmit={() => handleNewFlashcard(concept, definition)}>
            <div className="flex flex-col lg:flex-row lg:gap-16">
              <div className="flex flex-col flex-1 ">
                <input
                  type="text"
                  className="border-b-2 border-black text-gray-900 lg:text-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder=""
                  required
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                />
                <label className="block mb-2 lg:text-xl font-medium text-gray-700  mt-2">
                  concept
                </label>
              </div>

              <div className="flex flex-col flex-1 ">
                <input
                  type="text"
                  className="border-b-2 border-black  text-gray-900 lg:text-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder=""
                  required
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                />
                <label className="block mb-2 lg:text-xl font-medium text-gray-700  mt-2">
                  definition
                </label>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="transition-colors duration-300 rounded-xl text-white py-3 px-12 bg-blue-700 hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
