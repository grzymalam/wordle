import { useEffect, useState } from "react";

import classes from "./Wordle.module.css";
import Word from "./Word";
import useKeyword from "../hooks/use-keyword";

const WORD_LENGTH = 5;
const ALLOWED_LETTERS = "abcdefghijklmnopqrstuvwxyz";

const Wordle = () => {
  const [letters, setLetters] = useState([]);
  const [checkedRows, setCheckedRows] = useState(0); 

  const previousWordStart = checkedRows * WORD_LENGTH;

  const word = letters.slice(previousWordStart, previousWordStart+WORD_LENGTH).join('');
  console.log(letters);
  console.log(word);

  const [keyword, keywords, getRandomKeyword] = useKeyword("data/words.txt");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace" && word.length !== 0 ) {
        setLetters(prevLetters => prevLetters.slice(0, -1));
      }
      if (!ALLOWED_LETTERS.includes(event.key)) {
        return;
      }
      if ((letters.length) % WORD_LENGTH > 0 || letters.length===0 || letters.length / checkedRows === WORD_LENGTH) {
        setLetters(prevLetters => [...prevLetters, event.key]);
      } 
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [letters, keywords, checkedRows, word.length]);

  const checkHandler = () => {
    if(keywords.includes(word) && word.length === WORD_LENGTH){
      setCheckedRows(prev => prev + 1);
    }
  };

  const resetHandler = () => {
    setLetters([]);
    setCheckedRows(0);
    getRandomKeyword();
  };

  const words = Array.from(Array(6).keys()).map((val) => {
    const startIndex = val * WORD_LENGTH;
    return (
      <Word
        key={val}
        letters={letters.slice(startIndex, startIndex + WORD_LENGTH)}
        keyword={keyword}
        canBeChecked={val < checkedRows}
        highlight={val === checkedRows}
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
