import React, { useEffect, useState } from 'react';

//import { GenresContext } from '../contextAPI/GenresContext';
//import logo from '../images/shrek.jpg';
import RatedCard from '../RatedCard/RatedCard';
import ApiService from '../services/movieApi';

const RatedList = () => {
  //const { ratedList } = useContext(GenresContext);
  const [ratedMovies, setRatedMovies] = useState([]);
  const api = new ApiService();

  const getRatedMovie = async () => {
    return await api
      .getRatedMovies()
      .then((data) => setRatedMovies(data.results))
      .catch((err) => err);
  };
  useEffect(() => {
    getRatedMovie();
  }, [ratedMovies]);
  return (
    <div className="container">
      {ratedMovies.map((el) => {
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
      })}
    </div>
  );
};
export default RatedList;
