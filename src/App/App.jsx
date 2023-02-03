import React from 'react';
import { debounce } from 'lodash';
import { Pagination } from 'antd';
import 'antd/dist/reset.css';

import MovieList from '../MovieList';
import './App.css';
import ApiService from '../services/movieApi';

import ErrorIndicator from '../errorIndicator';
import { GenresProvider } from '../contextAPI/GenresContext';
import TabsHeader from '../TabsHeader/TabsHeader';
import Search from '../Search';
import RatedList from '../RatedList/Rated';
import Spinner from '../Spinner/Spinner';

export default class App extends React.Component {
  apiData = new ApiService();

  constructor() {
    super();
    this.state = {
      movie: [],
      value: 'return',
      page: 1,
      totalPages: 1,
      totalResults: 10,
      loading: false,
      error: false,
      tabs: ['Search', 'Rated'],
      showRatedList: false,
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
    console.log(err.message);
  };

  onChangePage = (page) => {
    this.setState({ page });
    window.scroll(0, 0);
  };

  getData = async (query, page = 1) => {
    await this.apiData
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

  componentDidMount() {
    this.apiData.createSessionID().catch((err) => console.log(err.message));
  }

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (value !== prevState.value || page !== prevState.page) {
      if (value) {
        this.setState({ loading: true });
        this.getData(value, page).catch((err) => this.catchError(err));
      }
    }
  }

  componentDidCatch(err) {
    this.setState({ error: true });
    console.log(err);
  }

  render() {
    const { loading, movie, page, error, tabs, showRatedList, totalResults } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const show = !(movie.length && showRatedList);
    const showContent = show ? <MovieList movies={movie} loading={loading} res={totalResults} /> : null;

    return (
      <div className="app">
        {!error ? (
          <GenresProvider>
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
            {showRatedList ? <RatedList /> : null}
          </GenresProvider>
        ) : (
          <ErrorIndicator message="No Internet connection or VPN doesn't work!" />
        )}
      </div>
    );
  }
}
