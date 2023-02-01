import { createContext, useEffect, useState } from 'react';

export const GenresContext = createContext();

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  const getGenres = async () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=ec32ee203bb1918ee735c44c14ca245e';
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error('NO RESPONSE!');
      }
      const res = await data.json();
      setGenres(res.genres);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  const data = {
    genres,
    setGenres,
  };
  return <GenresContext.Provider value={data}>{children}</GenresContext.Provider>;
};
