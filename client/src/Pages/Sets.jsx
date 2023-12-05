import { FaSearch, FaArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { removeSet } from "../redux/flashcards/flashcardsSlice";

function Sets() {
  const { flashcards } = useSelector((state) => state.flashcards);

  const dispatch = useDispatch();

  const handleRemoveSet = (setId, userRef) => {
    dispatch(removeSet({ setId, userRef }));
  };
  return (
    <section className="min-h-screen bg-slate-100 p-2">
      <div className="max-w-6xl mx-auto">
        <div className="pt-32">
          <form className="flex flex-col lg:flex-row w-full justify-between items-center gap-4">
            <div className="relative w-full max-w-[250px]">
              <select className="w-full p-2.5 text-gray-600 bg-transparent border border-gray-400 rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                <option className="text-xl">last sets</option>
                <option className="text-xl">oldest sets</option>
              </select>
              <FaArrowDown className="absolute top-[50%] translate-y-[-50%] right-4 text-slate-600" />
            </div>
            <div className="w-full max-w-xl relative">
              <input
                type="text"
                placeholder="find your set"
                className="bg-white focus:outline-none w-full py-4 px-4 rounded-lg"
              />
              <button className="absolute top-[50%] translate-y-[-50%] right-4">
                <FaSearch className="text-slate-600" />
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-2 mt-6">
            {flashcards.map((set, index) => {
              return (
                <Link key={index} to={`/set/${set._id}`}>
                  <div className="flex justify-between items-center gap-2 bg-white p-6 py-4 cursor-pointer">
                    <div>
                      <p>{set.flashcards.length} concepts</p>
                      <h1 className="text-2xl font-bold">{set.name}</h1>
                    </div>
                    <MdOutlineRemoveCircleOutline
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveSet(set._id, set.userRef);
                      }}
                      className="text-4xl transition-colors duration-300 text-red-700 hover:text-red-600"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sets;
