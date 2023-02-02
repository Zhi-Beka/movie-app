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
      value: '',
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
    console.log(err);
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
          totalResults: data.total_results,
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
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    const { loading, movie, page, error, tabs, showRatedList, totalResults } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const paginationShow = movie.length > 0 && !showRatedList;
    const showContent = paginationShow ? <MovieList movies={movie} /> : null;
    const errorMessage = !totalResults ? <ErrorIndicator noResults={true} /> : null;
    return (
      <div className="app">
        {!error ? (
          <GenresProvider>
            <TabsHeader tabs={tabs} setTabs={this.setTabsName} />
            {!showRatedList ? <Search getValue={this.debouncedHandleChange} /> : null}
            {errorMessage}
            {spinner}
            {showContent}
            {paginationShow && (
              <Pagination
                style={{ marginTop: '20px', textAlign: 'center' }}
                current={page}
                onChange={this.onChangePage}
                total={this.state.totalResults}
                defaultPageSize={1}
                showSizeChanger={false}
              />
            )}
            {showRatedList ? <RatedList /> : null}
          </GenresProvider>
        ) : (
          <ErrorIndicator message="No Internet connection!" />
        )}
      </div>
    );
  }
}
