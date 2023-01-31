import React from 'react';
import { debounce } from 'lodash';
import { Pagination, Spin } from 'antd';
import 'antd/dist/reset.css';

import MovieList from '../MovieList';
import './App.css';
import ApiService from '../services/movieApi';
//import Search from '../Search';
import ErrorIndicator from '../errorIndicator';
import { GenresProvider } from '../contextAPI/GenresContext';
import TabsHeader from '../TabsHeader/TabsHeader';
import Search from '../Search';
import RatedList from '../RatedList/Rated';

export default class App extends React.Component {
  apiData = new ApiService();
  sessionId = null;
  constructor() {
    super();
    this.state = {
      movie: [],
      value: 'return',
      page: 1,
      loading: true,
      error: false,
      tabs: ['Search', 'Rated'],

      showRatedList: false,
    };
  }

  getValueSearch = (e) => {
    this.setState({ value: e.target.value });
  };

  setTabsName = (e) => {
    //1=search, 2=rated
    if (e === 2) {
      this.setState({ showRatedList: true });
    } else {
      this.setState({ showRatedList: false });
    }
  };

  debouncedHandleChange = debounce(this.getValueSearch, 500);

  catchError = (err) => {
    this.setState({ error: true, loading: false });
    console.log(err.message);
  };

  onChangePage = (current) => {
    this.setState({ page: current });
    // window.scroll(0, 0);
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

  getSessionID = async () => {
    await this.apiData
      .createGuestSession()
      .then((data) => (this.sessionId = data.guest_session_id))
      .catch((err) => err.message);
    //pass into questSession
  };

  getRatedMovie = async () => {
    await this.apiData
      .getAllData(`/guest_session/${this.sessionId}/rated/movies&page=${this.state.value}`)
      .then((data) => console.log(data))
      .catch((err) => err.message);
  };

  componentDidMount() {
    const { value, page } = this.state;
    this.getData(value, page);
    this.getSessionID();
  }

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (value !== prevState.value || page !== prevState.page) {
      this.getData(value, page);
    }
  }

  render() {
    const { loading, page, movie, error, tabs, showRatedList } = this.state;
    const spinner = loading ? <Spin size="large" className="spin" /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const hasData = !(loading || error || showRatedList);
    const paginationShow = movie.length > 0 && !showRatedList;
    const showContent = hasData ? <MovieList movies={movie} page={page} /> : null;

    return (
      <GenresProvider>
        <div className="app">
          <TabsHeader tabs={tabs} setTabs={this.setTabsName} />

          {spinner}
          {errorMessage}
          {!showRatedList ? <Search getValue={this.debouncedHandleChange} /> : null}
          {movie.length ? showContent : <ErrorIndicator noResults={true} />}
          {paginationShow && (
            <Pagination
              style={{ marginTop: '20px', textAlign: 'center' }}
              current={page}
              onChange={this.onChangePage}
              pageSize={4}
              total={movie.length}
            />
          )}
          {showRatedList ? <RatedList /> : null}
        </div>
      </GenresProvider>
    );
  }
}
