/* eslint-disable */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';
import imageShow from '../images/shrek.jpg';
import ApiService from '../services/movieApi';

export const MovieList = (props) => {
  const [moviesData, setMoviesData] = useState([]);
  const { movies, query } = props;
  const apiData = new ApiService();
  // console.log(query,"query")
  //
  //     const getData=()=>{
  //       let data= apiData.getSearchMovie(query)
  //       data.then(searchData=> setMoviesData(searchData.results))
  //           .catch((err)=> console.log(err.message))
  //     }
  //     useEffect(()=>{
  //       getData()
  //     },[])
  //
  //
  //
  // console.log(moviesData,"state")

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
