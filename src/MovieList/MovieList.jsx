import React from 'react';
import propTypes from 'prop-types';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';
import ErrorIndicator from '../errorIndicator';

export class MovieList extends React.Component {
  render() {
    const { movies, loading, res, sessionID, ratedMovie } = this.props;
    const show = movies.length && !loading;
    const errorMessage = !loading && res === 'no movies' ? <ErrorIndicator message="No more films, sorry" /> : null;

    return (
      <div className="container">
        {show
          ? movies.map((el) => {
              const { title, overview, poster_path, release_date, id, vote_average, genre_ids, rating } = el;
              let starValue;
              if (!rating) {
                let checkRating = ratedMovie.find((el) => el.id === id);
                checkRating ? (starValue = checkRating.rating) : null;
              }

              return (
                <MovieCard
                  title={title}
                  overview={overview}
                  img={poster_path}
                  date={release_date}
                  key={id}
                  vote={vote_average}
                  id={id}
                  genre_ids={genre_ids}
                  starRating={starValue}
                  sessionID={sessionID}
                />
              );
            })
          : errorMessage}
      </div>
    );
  }

  static propTypes = {
    movies: propTypes.arrayOf(propTypes.object),
  };

  static defaultProps = {
    movies: [],
  };
}
