import { Button, Tooltip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function SingleCard({ actualFlashcards }) {
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [actualIndex, setActualIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [percentage, setPercentage] = useState(false);

  const handleCorrect = () => {
    setActualIndex((prev) => prev + 1);
    setResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[actualIndex] = true;
      return newResults;
    });
    if (actualIndex + 1 >= actualFlashcards?.flashcards.length) {
      return setShowResults(true);
    }
  };

  const handleIncorrect = () => {
    setActualIndex((prev) => prev + 1);
    setResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[actualIndex] = false;
      return newResults;
    });
    if (actualIndex + 1 >= actualFlashcards?.flashcards.length) {
      return setShowResults(true);
    }
  };

  const countAnswers = async () => {
    const promises = results.map(async (result) => {
      if (result === true) {
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setIncorrectAnswers((prev) => prev + 1);
      }
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
  };

  const calculatePercentage = () => {
    const totalQuestions = correctAnswers + incorrectAnswers;
    if (totalQuestions === 0) {
      return 0;
    }
    const percentage = (correctAnswers / totalQuestions) * 100;

    return setPercentage(percentage.toFixed(0));
  };

  const handleRestart = () => {
    setShowResults(false)
    setCorrectAnswers(0)
    setIncorrectAnswers(0)
    setActualIndex(0)
    setResults([]);
    setShowCard(false);
    setPercentage(0)
  }

  useEffect(() => {
    countAnswers();
  }, [showResults]);

  useEffect(() => {
    calculatePercentage();
  }, [correctAnswers, incorrectAnswers]);
  return (
    <div>
      {showResults ? (

        <div className="flex items-center max-w-4xl mx-auto justify-center px-4 py-12 rounded-xl shadow-xl gap-8 bg-white">
          <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar value={percentage} text={percentage + "%"} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-medium text-green-600">correct answers: {correctAnswers}</p>
            <p className="text-xl font-medium text-red-600">incorrect answers: {incorrectAnswers}</p>
            <button onClick={handleRestart} className="py-4 rounded-xl text-white mt-2 bg-blue-700 hover:bg-blue-600 transition-all duration-300">Restart</button>
          </div>
        </div>
      ) : (
        <div>
          <div
            onClick={() => setShowCard((prev) => !prev)}
            className="group cursor-pointer h-[500px] [perspective:1000px] mx-auto w-full max-w-[800px]"
          >
            <div
              className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
                showCard && "[transform:rotateY(180deg)]"
              }`}
            >
              <div className="absolute bg-white inset-0 flex items-center justify-center rounded-xl">
                <h1 className="text-flip-x text-4xl font-bold">
                  {actualFlashcards?.flashcards[actualIndex]?.definition}
                </h1>
              </div>
              <div className="absolute bg-white inset-0 flex items-center justify-center rounded-xl [backface-visibility:hidden]">
                <h1 className=" text-4xl font-bold">
                  {actualFlashcards?.flashcards[actualIndex]?.concept}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 mt-12 mx-auto">
            <Tooltip
              className="bg-red-700 py-1 px-3 z-30"
              content="I'm still learning"
              placement="bottom-start"
            >
              <Button
                onClick={handleIncorrect}
                className="bg-red-700 transition-colors duration-300 hover:bg-red-600 p-4 w-10 xl:w-12 h-10 xl:h-12 flex items-center text-2xl justify-center rounded-full text-white"
              >
                -
              </Button>
            </Tooltip>
            <p className="text-xl">
              {actualIndex + 1}/{actualFlashcards?.flashcards?.length}
            </p>
            <Tooltip
              className="bg-green-700 py-1 px-3 z-30"
              content="I remember"
              placement="bottom-start"
            >
              <Button
                onClick={handleCorrect}
                className="bg-green-700 transition-colors duration-300 hover:bg-green-600 p-4 w-10 xl:w-12 h-10 xl:h-12 flex items-center text-2xl justify-center rounded-full text-white"
              >
                +
              </Button>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleCard;
