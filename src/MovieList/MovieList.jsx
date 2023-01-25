/* eslint-disable */
import propTypes from 'prop-types';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';
import ApiService from '../services/movieApi';

export const MovieList = ({ movies }) => {
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
