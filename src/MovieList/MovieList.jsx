import React from 'react';
import propTypes from 'prop-types';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';
import ApiService from '../services/movieApi';
import ErrorIndicator from '../errorIndicator';

export class MovieList extends React.Component {
  static propTypes = {
    movies: propTypes.arrayOf(propTypes.object),
  };

  static defaultProps = {
    movies: [],
  };

  apiData = new ApiService();

  render() {
    const { movies, loading, res } = this.props;
    const show = movies.length && !loading;
    const errorMessage = !loading && res === 'no movies' ? <ErrorIndicator message="No more films, sorry" /> : null;
    return (
      <div className="container">
        {show
          ? movies.map((el) => {
              const { title, overview, poster_path, release_date, id, vote_average, genre_ids } = el;

              return (
                <MovieCard
                  title={title}
                  overview={overview}
                  img={this.apiData.getImage(poster_path)}
                  date={release_date}
                  key={id}
                  vote={vote_average}
                  id={id}
                  genre_ids={genre_ids}
                />
              );
            })
          : errorMessage}
      </div>
    );
  }
}
