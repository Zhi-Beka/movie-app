import React from 'react';
import { debounce } from 'lodash';
import { Spin } from 'antd';

import MovieList from '../MovieList';
import './App.css';
import ApiService from '../services/movieApi';
import Search from '../Search';
import { ErrorIndicator } from '../errorIndicator';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: [],
      value: '',
      loading: true,
      error: false,
    };
  }
  apiData = new ApiService();

  getValueSearch = (e) => {
    this.setState({ value: e.target.value });
  };

  debouncedHandleChange = debounce(this.getValueSearch, 500);

  catchError = (err) => {
    this.setState({ error: true, loading: false });
    console.log(err.message);
  };

  getData = async () => {
    await this.apiData
      .getSearchMovie('return')
      .then((data) => {
        return this.setState({
          movie: data.results,
          loading: false,
        });
      })
      .catch((err) => this.catchError(err));
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { loading, value, movie, error } = this.state;
    const spinner = loading ? <Spin size="large" className="spin" /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const showContent = !(loading || error) ? <MovieList movies={movie} query={value} /> : null;

    return (
      <div className="app">
        <Search getValue={this.debouncedHandleChange} />
        {spinner}
        {errorMessage}
        {showContent}
      </div>
    );
  }
}
