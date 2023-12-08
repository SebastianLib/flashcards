import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlashcards } from "../redux/flashcards/flashcardsSlice";
import defaultUser from "../assets/defaultUser.png";
import { TbCards } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const { flashcards } = useSelector((state) => state.flashcards);
  const [latestSet, setLatestSet] = useState();
  const [randomSet, setRandomSet] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFlashcards(currentUser));
  }, []);

  const getLatestSet = () => {
    return flashcards[flashcards.length - 1];
  };

  const getRandomSet = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    return flashcards[randomIndex];
  };

  useEffect(() => {
    setLatestSet(getLatestSet());
    setRandomSet(getRandomSet());
  }, []);

  return (
    <section className="min-h-screen bg-slate-100">
      <div className="pt-32 max-w-5xl w-full mx-auto p-4">
        <h1 className="text-4xl font-medium text-center">
          Hello <span className="font-bold">Sebastian!</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-12 my-12">
          <div className="w-full">
            <div className="bg-white max-w-max py-1 px-4 rounded-t-xl">
              <h2 className="text-xl">User</h2>
            </div>
            <div className="flex flex-col h-[300px] md:h-[200px] sm:flex-row gap-4 sm:gap-2 justify-center items-center bg-white py-12 px-2 rounded-b-xl rounded-r-xl">
              <div className="h-24 w-24 min-w-[100px] mr-2">
                <img
                  src={defaultUser}
                  className="rounded-full overflow-hidden object-cover w-full "
                  alt="user image"
                />
              </div>
              <div className="flex flex-col flex-wrap">
                <p>
                  <span className="text-lg font-bold">Username:</span>{" "}
                  {currentUser.username}
                </p>
                <p>
                  <span className="text-lg font-bold">Email:</span>{" "}
                  {currentUser.email}
                </p>
                <p>
                  <span className="text-lg font-bold">Created Sets:</span>{" "}
                  {flashcards.length}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="bg-white max-w-max py-1 px-4 rounded-t-xl">
              <h2 className="text-xl">Latest Set</h2>
            </div>
            {flashcards.length > 0 ? (
              <div className="flex flex-col h-[300px] md:h-[200px] sm:flex-row gap-4 sm:gap-2 justify-center items-center bg-white py-12 px-2 rounded-b-xl rounded-r-xl">
                <div className="h-24 w-24 min-w-[100px] mr-2">
                  <TbCards className="text-8xl" />
                </div>
                <div className="flex flex-col flex-wrap">
                  <p>
                    <span className="text-lg font-bold">Name:</span>{" "}
                    {latestSet?.name}
                  </p>
                  <p>
                    <span className="text-lg font-bold">
                      number of flashcards:
                    </span>{" "}
                    {latestSet?.flashcards?.length || 0}
                  </p>
                  <Link
                    className="flex justify-center sm:justify-start"
                    to={`/set/${latestSet?._id}`}
                  >
                    <button className="text-white px-8 py-2 mt-2 bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-xl">
                      Go there!
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-[300px] md:h-[200px] gap-4 sm:gap-2 justify-center items-center bg-white py-12 px-2 rounded-b-xl rounded-r-xl">
                <p className="text-xl">You don't have any sets :(</p>
                <Link
                  className="flex justify-center sm:justify-start"
                  to="/create"
                >
                  <button className="text-white px-8 py-2 mt-2 bg-blue-700 hover:bg-blue-600 transition-colors duration-300 rounded-xl">
                    create your first set!
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          {flashcards.length > 0 ? null : (
            <p>To use this button you must have at least 1 set</p>
          )}
          <Link to={`/set/${randomSet?._id}`}>
            <button
              disabled={flashcards.length > 0 ? false : true}
              className="text-white text-xl px-16 py-4 mt-2 bg-blue-700 hover:bg-blue-600 disabled:opacity-30 transition-colors duration-300 rounded-xl"
            >
              go to random set
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
