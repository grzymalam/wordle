import { useCallback, useEffect, useState } from "react";
import axios from 'axios';

const useKeyword = (path) => {
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);

  const getRandomKeyword = useCallback(() => {
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    setKeyword(randomKeyword);
  }, [keywords]);

  useEffect(() => {
    const setKeywordsState = async () => {
      const response = await axios.get(path);
  
      const keywordsArr = response.data.split("\n");
      const cleanedKeywords = keywordsArr.map(str => str.replace('\r', ''));
      setKeywords(cleanedKeywords);
    }
  
    setKeywordsState();
  }, [path])

  useEffect(() => {
    getRandomKeyword();
  }, [keywords, getRandomKeyword]);

  return [keyword, keywords, getRandomKeyword];
};

export default useKeyword;
