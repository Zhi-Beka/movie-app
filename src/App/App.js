import React from 'react';
import propTypes from 'prop-types';

import MovieList from '../MovieList/MovieList';
import './App.css';
import ApiService from '../services/movieApi';
import imageShow from '../images/shrek.jpg';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: [],
    };
  }
  apiData = new ApiService();

  async getData() {
    await this.apiData
      .getSearchMovie('return')
      .then((data) => {
        return this.setState({
          movie: data.results,
        });
      })
      .catch((err) => console.log(err.message));
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="app">
        <MovieList movies={this.state.movie} />
      </div>
    );
  }

  static propTypes = {
    movies: propTypes.arrayOf(propTypes.object),
  };
  static defaultProps = {
    movies: [
      {
        title: 'OOPS!',
        overview: 'Something went wrong',
        img: imageShow,
        release_date: '11-11-2011',
        id: 14587,
      },
    ],
  };
}
