import React, { useContext } from 'react';

import { GenresContext } from '../contextAPI/GenresContext';
import logo from '../images/shrek.jpg';
import RatedCard from '../RatedCard/RatedCard';

const RatedList = () => {
  const { ratedList } = useContext(GenresContext);

  return (
    <div className="container">
      {ratedList.map((el, index) => {
        const { title, overview, release_date, vote_average } = el;

        return (
          <RatedCard title={title} overview={overview} img={logo} date={release_date} vote={vote_average} key={index} />
        );
      })}
    </div>
  );
};
export default RatedList;
