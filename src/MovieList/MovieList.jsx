/* eslint-disable */
import React from 'react';
import propTypes from 'prop-types';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';
import ApiService from '../services/movieApi';
import ErrorIndicator from '../errorIndicator';
//import {GenresContext} from "../contextAPI/GenresContext";

export class MovieList extends React.Component {
  // static contextType = GenresContext;
  // const genresApi = this.context;
  static propTypes = {
    movies: propTypes.arrayOf(propTypes.object),
  };

  static defaultProps = {
    movies: [
      {
        title: 'OOPS!',
        overview: 'No text here',
        release_date: '10-10-2010',
      },
    ],
  };

  apiData = new ApiService();

  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }
  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { movies } = this.props;

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="container">
        {movies.map((el) => {
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
        })}
      </div>
    );
  }
}
