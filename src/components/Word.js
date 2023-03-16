import { useEffect, useState } from "react";
import Tile from "./Tile";
import classes from "./Word.module.css";

const getCorrectIndexes = (keyword, word) => {
  const indexes = [];
  for (let i = 0; i < keyword.length; i++) {
    if (keyword[i] === word[i]) {
      indexes.push(i);
    }
  }

  return indexes;
};

const getCommonIndexes = (keyword, word) => {
  const indexes = [];
  for (let i = 0; i < keyword.length; i++) {
    for (let j = 0; j < keyword.length; j++) {
      if (keyword[i] === word[j]) {
        indexes.push(j);
      }
    }
  }

  return [...new Set(indexes)];
};

const Word = (props) => {
  //TODO reveal animation
  const [hasBeenChecked, setHasBeenChecked] = useState(false);
  const [applyShake, setApplyShake] = useState(false);

  const fullWordEnteredHandler = () => {
    const correctIndexes = getCorrectIndexes(
      props.keyword,
      props.letters.join("")
    );
    const commonIndexes = getCommonIndexes(
      props.keyword,
      props.letters.join("")
    ).filter((el) => !correctIndexes.includes(el));

    return [correctIndexes, commonIndexes];
  };

  let tiles = [0, 1, 2, 3, 4].map((index) => {
    return <Tile key={index} letter={props.letters[index]} />;
  });

  if (props.letters.length > 4) {
    const [correctIndexes, commonIndexes] = fullWordEnteredHandler();

    tiles = [0, 1, 2, 3, 4].map((index) => {
      return (
        <Tile
          key={index}
          letter={props.letters[index]}
          correct={correctIndexes.includes(index) && props.canBeChecked}
          common={commonIndexes.includes(index) && props.canBeChecked}
        />
      );
    });
  }
  useEffect(() => {
    setApplyShake(true);
    const timer = setTimeout(() => {
      setApplyShake(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [hasBeenChecked]);

  const highlight = props.highlight ? classes.highlight : '';
  const shake = applyShake ? classes.shake : '';


  return <div className={`${classes.word} ${highlight} ${shake}`}>{tiles}</div>;
};

export default Word;
