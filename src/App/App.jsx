import React from 'react';
import { debounce } from 'lodash';
import { Pagination, Spin } from 'antd';

import MovieList from '../MovieList';
import './App.css';
import ApiService from '../services/movieApi';
import Search from '../Search';
import { ErrorIndicator } from '../errorIndicator';

export default class App extends React.Component {
  apiData = new ApiService();

  constructor() {
    super();
    this.state = {
      movie: [],
      paginateData: [],
      value: 'return',
      page: 1,
      loading: true,
      error: false,
    };
  }

  getValueSearch = (e) => {
    this.setState({ value: e.target.value });
  };

  debouncedHandleChange = debounce(this.getValueSearch, 500);

  catchError = (err) => {
    this.setState({ error: true, loading: false });
    console.log(err.message);
  };

  onChangePage = (current) => {
    this.setState({ page: current });
    window.scroll(0, 0);
  };

  getData = async (query, page = 1) => {
    await this.apiData
      .getMovieBySearch(query, page)
      .then((data) => {
        return this.setState({
          movie: data.results,
          loading: false,
        });
      })
      .catch((err) => this.catchError(err));
  };

  componentDidMount() {
    const { value, page } = this.state;
    this.getData(value, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (value !== prevState.value || page !== prevState.page) {
      this.getData(value, page);
    }
  }

  render() {
    const { loading, page, movie, error } = this.state;
    const spinner = loading ? <Spin size="large" className="spin" /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const hasData = !(loading || error);
    const showContent = hasData ? <MovieList movies={movie} page={page} /> : null;

    return (
      <div className="app">
        <Search getValue={this.debouncedHandleChange} />
        {spinner}
        {errorMessage}
        {movie.length ? showContent : <ErrorIndicator noResults={true} />}
        {movie.length > 0 && (
          <Pagination
            style={{ marginTop: '20px', textAlign: 'center' }}
            current={page}
            onChange={this.onChangePage}
            pageSize={4}
            total={movie.length}
          />
        )}
      </div>
    );
  }
}
