/* eslint-disable */
import React, { useEffect } from 'react';
import { useState } from 'react';
import propTypes from 'prop-types';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';
import ApiService from '../services/movieApi';

export const MovieList = ({ movies, page }) => {
  //const [current, setCurrent] = useState(3);
  //const [findMovie, setFindMovie] = useState([])

  const apiData = new ApiService();

  // async function  getPagination(title, page){
  //  await apiData.getPaginationMovie(title, page)
  //      .then(data=> setFindMovie(data.results))
  //      .catch(err=>console.log(err.message))
  // }

  // useEffect(()=>{
  //   getPagination("avatar", current)
  // },[current])

  // console.log(findMovie)

  // const onChange = (page) => {
  //   console.log(page);
  //   setCurrent(page);
  // };
  return (
    <div className="container">
      {movies.map((el) => {
        const { title, overview, poster_path, release_date, id } = el;

        return (
          <MovieCard
            title={title}
            overview={overview}
            img={apiData.getImage(poster_path)}
            date={release_date}
            key={id}
          />
        );
      })}
    </div>
  );
};

MovieList.propTypes = {
  movies: propTypes.arrayOf(propTypes.object),
  query: propTypes.string,
};

MovieList.defaultProps = {
  movies: [
    {
      title: 'OOPS!',
      overview: "Server doesn't work",
      release_date: '10-10-2010',
    },
  ],
  query: 'return',
};
