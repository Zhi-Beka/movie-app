import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';

import RatedCard from '../RatedCard/RatedCard';
import ApiService from '../services/movieApi';
import ErrorIndicator from '../errorIndicator';
import Spinner from '../Spinner/Spinner';

const RatedList = () => {
  //const { ratedList } = useContext(GenresContext);
  const [ratedMovies, setRatedMovies] = useState({
    results: [],
    totalResults: 1,
    totalPages: 1,
    loading: true,
  });
  const [page, setPage] = useState(1);
  const api = new ApiService();

  const getRatedMovie = async (page) => {
    return await api
      .getRatedMovies(page)
      .then((data) =>
        setRatedMovies({
          results: data.results,
          totalResults: data.total_results, //22
          totalPages: data.total_pages, //2
          loading: false,
        })
      )
      .catch((err) => err);
  };
  useEffect(() => {
    getRatedMovie(page);
    // setRatedMovies({...ratedMovies, loading:false})
  }, [ratedMovies.results]);

  const onChangePage = (current) => {
    setPage(current);
    window.scroll(0, 0);
  };

  const showResults = ratedMovies.results.length > 0 && !ratedMovies.loading;
  const spinner = ratedMovies.loading ? <Spinner /> : null;

  return (
    <>
      <div className="container">
        {spinner}
        {showResults ? (
          ratedMovies.results.map((el) => {
            const { title, overview, release_date, vote_average, id, poster_path } = el;
            return (
              <RatedCard
                title={title}
                overview={overview}
                img={api.getImage(poster_path)}
                date={release_date}
                vote={vote_average.toFixed(1)}
                key={id}
              />
            );
          })
        ) : (
          <ErrorIndicator noResults />
        )}
      </div>
      <Pagination
        style={{ marginTop: '20px', textAlign: 'center' }}
        current={page}
        onChange={onChangePage}
        total={ratedMovies.totalResults}
      />
    </>
  );
};
export default RatedList;
