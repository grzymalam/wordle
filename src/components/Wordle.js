import { useEffect, useState } from "react";

import classes from "./Wordle.module.css";
import Word from "./Word";
import useKeyword from "../hooks/use-keyword";

const WORD_LENGTH = 5;
const ALLOWED_LETTERS = "abcdefghijklmnopqrstuvwxyz";

const Wordle = () => {
  const [letters, setLetters] = useState([]);
  const [word, setWord] = useState('');
  const [currentRow, setCurrentRow] = useState(0);

  const [keyword, keywords, getRandomKeyword] = useKeyword("data/words.txt");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace" && word.length !== 0) {
        setLetters(prevLetters => prevLetters.slice(0, -1));
        setWord(prevWord => prevWord.slice(0, prevWord.length - 1));
      }
      if (!ALLOWED_LETTERS.includes(event.key)) {
        return;
      }
      if (word.length < WORD_LENGTH) {
        setLetters(prevLetters => [...prevLetters, event.key]);
        setWord(prevWord => prevWord + event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [word, letters, keywords]);

  const checkHandler = () => {
    if(keywords.includes(word) && word.length === WORD_LENGTH){
      setCurrentRow(prevRow => prevRow + 1);
      setWord('');
    }
  };

  const resetHandler = () => {
    setWord('');
    setLetters([]);
    setCurrentRow(0);
    getRandomKeyword();
  };

  const words = Array.from(Array(6).keys()).map((val) => {
    const startIndex = val * WORD_LENGTH;
    return (
      <Word
        key={val}
        letters={letters.slice(startIndex, startIndex + WORD_LENGTH)}
        keyword={keyword}
        canBeChecked={val < currentRow}
        highlight={currentRow === val}
      />
    );
  });

  return (
    <div className={classes.tiles}>
      <h1>Wordle</h1>
      {words}
      <button onClick={resetHandler}>Reset</button>
      <button onClick={checkHandler}>Check</button>
    </div>
  );
};

export default Wordle;
