import { createContext, useEffect, useReducer } from 'react';

import GenresReducer from './GenresReducer';

const initialState = {
  ratedMovies: [],
};

export const GenresContext = createContext(initialState);

export const GenresProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GenresReducer, initialState);

  useEffect(() => {
    localStorage.setItem('ratedMovies', JSON.stringify(state.ratedMovies));
  }, [state]);

  const addMovieToRatedList = (movie) => {
    console.log(movie);
    dispatch({ type: 'ADD_MOVIE_TO_RATED', payload: movie });
  };
  console.log(state);

  const data = {
    ratedList: state.ratedMovies,
    addMovieToRatedList,
  };
  return <GenresContext.Provider value={data}>{children}</GenresContext.Provider>;
};
