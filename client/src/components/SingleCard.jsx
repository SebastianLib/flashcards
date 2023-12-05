import { Button, Tooltip } from "@material-tailwind/react";
import { useEffect, useState } from "react";

function SingleCard({actualFlashcards}) {
    const [showResults, setShowResults] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [incorrectAnswer, setIncorrectAnswer] = useState(0);
    const [actualIndex, setActualIndex] = useState(0);
    const [results, setResults] = useState([]);

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

      const countAnswers = () => {
        results.forEach((result) => {
          if (result === true) {
            setCorrectAnswer((prev) => prev + 1);
          } else {
            setIncorrectAnswer((prev) => prev + 1);
          }
        });
      };
    
      useEffect(() => {
        countAnswers();
      }, [showResults]);
    
  return (
    <div>
                {showResults ? (
          <div>
            <p>correct answers: {correctAnswer}</p>
            <p>incorrect answers: {incorrectAnswer}</p>
          </div>
        ) : (
          <div>
            <div className="group h-[500px] [perspective:1000px] mx-auto w-full max-w-[800px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
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
  )
}

export default SingleCard