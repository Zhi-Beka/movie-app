import React from 'react';
import { debounce } from 'lodash';
import { Pagination } from 'antd';
import 'antd/dist/reset.css';

import MovieList from '../MovieList';
import './App.css';
import ApiService from '../services/movieApi';
import ErrorIndicator from '../errorIndicator';
import TabsHeader from '../TabsHeader/TabsHeader';
import Search from '../Search';
import RatedList from '../RatedList/Rated';
import Spinner from '../Spinner/Spinner';
import { GenresContext } from '../contextAPI/GenresContext';

export default class App extends React.Component {
  apiData = new ApiService();

  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      ratedMovie: [],
      value: null,
      page: 1,
      totalPages: 1,
      totalResults: 10,
      loading: false,
      error: false,
      tabs: ['Search', 'Rated'],
      showRatedList: false,
      genres: [],
    };
  }

  getValueSearch = (e) => {
    this.setState({ value: e.target.value });
  };
  debouncedHandleChange = debounce(this.getValueSearch, 500);

  setTabsName = (e) => {
    if (e === 2) {
      this.setState({ showRatedList: true });
    } else {
      this.setState({ showRatedList: false });
    }
  };

  catchError = (err) => {
    this.setState({ error: true, loading: false });
    return <ErrorIndicator message={err.message} />;
  };

  onChangePage = (page) => {
    this.setState({ page });
    window.scroll(0, 0);
  };

  getData = (query, page = 1) => {
    return this.apiData
      .getMovieBySearch(query, page)
      .then((data) => {
        return this.setState({
          movie: data.results,
          totalPages: data.total_pages,
          totalResults: data.total_results ? data.total_results : 'no movies',
          loading: false,
          error: false,
        });
      })
      .catch((err) => this.catchError(err));
  };

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (value !== prevState.value || page !== prevState.page) {
      if (value) {
        this.setState({ loading: true });
        this.getData(value, page);
      }
    }
    if (this.state.ratedMovie.length !== prevState.movie.length) {
      this.apiData.getRatedMovies(page).then((data) =>
        this.setState(() => {
          return {
            ratedMovie: data.results,
          };
        })
      );
    }
  }

  componentDidMount() {
    this.apiData.createSessionID();

    this.apiData
      .getGenres()
      .then((data) => this.setState({ genres: data }))
      .catch((err) => err.message);
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    const { loading, movie, page, error, tabs, showRatedList, totalResults, genres } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const show = !(movie.length && showRatedList);
    const showContent = show ? (
      <MovieList
        movies={movie}
        loading={loading}
        res={totalResults}
        ratedMovie={this.state.ratedMovie}
        postRatedMovies={(...args) => this.apiData.postRatedMovies(...args)}
      />
    ) : null;

    return (
      <div className="app">
        {!error ? (
          <GenresContext.Provider value={genres}>
            <TabsHeader tabs={tabs} setTabs={this.setTabsName} />
            {!showRatedList ? <Search getValue={this.debouncedHandleChange} /> : null}

            {spinner}
            {showContent}
            {movie.length > 0 && !showRatedList ? (
              <Pagination
                style={{ marginTop: '20px', textAlign: 'center' }}
                current={page}
                onChange={this.onChangePage}
                total={this.state.totalResults}
                pageSize={20}
                showSizeChanger={false}
              />
            ) : null}
            {showRatedList ? <RatedList getRatedMovies={(...args) => this.apiData.getRatedMovies(...args)} /> : null}
          </GenresContext.Provider>
        ) : (
          <ErrorIndicator message="No Internet connection or VPN doesn't work!" />
        )}
      </div>
    );
  }
}
