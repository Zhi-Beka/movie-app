import { useEffect, useState } from 'react';
import { Pagination } from 'antd';

import Spinner from '../Spinner/Spinner';
import RatedCard from '../RatedCard/RatedCard';

const RatedList = ({ getRatedMovies }) => {
  const [ratedMovies, setRatedMovies] = useState({
    results: [],
    totalResults: 1,
    totalPages: 1,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getRateMovie = (page) => {
    return getRatedMovies(page)
      .then((data) => {
        setRatedMovies({
          results: data.results,
          totalResults: data.total_results, //22
          totalPages: data.total_pages, //2
        });
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getRateMovie(page);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [ratedMovies.results, page]);

  const onChangePage = (current) => {
    setPage(current);
    window.scroll(0, 0);
  };
  const showResults = ratedMovies.results.length > 0;
  const spinner = loading ? <Spinner /> : null;

  return (
    <>
      <div className="container">
        {spinner}
        {showResults
          ? ratedMovies.results.map((el) => {
              const { title, overview, release_date, vote_average, id, poster_path, genre_ids, rating } = el;
              return (
                <RatedCard
                  title={title}
                  overview={overview}
                  imgCard={poster_path}
                  date={release_date}
                  vote={vote_average.toFixed(1)}
                  key={id}
                  genre_ids={genre_ids}
                  starResult={rating}
                  loading={loading}
                />
              );
            })
          : null}
      </div>
      {!loading && ratedMovies.totalPages ? (
        <Pagination
          style={{ marginTop: '20px', textAlign: 'center' }}
          current={page}
          pageSize={20}
          onChange={onChangePage}
          total={ratedMovies.totalResults}
        />
      ) : null}
    </>
  );
};
export default RatedList;
