/* eslint-disable */
import React from 'react';
import propTypes from 'prop-types';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';
import imageShow from '../images/shrek.jpg';
import ApiService from '../services/movieApi';

const MovieList = (props) => {
  const { movies } = props;
  const apiData = new ApiService();

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
};

MovieList.defaultProps = {
  movies: [
    {
      title: 'Hi',
      overview: "Server doesn't work",
      img: imageShow,
      release_date: '10-10-2010',
      id: Math.floor(Math.random() * 25 + 7),
    },
  ],
};

export default MovieList;
