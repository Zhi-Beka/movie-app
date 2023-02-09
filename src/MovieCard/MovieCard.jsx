/* eslint-disable */
import { Rate, Tag, Typography } from 'antd';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { useState, useContext } from 'react';

import './MovieCard.css';
import imageShow from '../images/not-found.jpg';
import ApiService from '../services/movieApi';
import Spinner from '../Spinner/Spinner';
import { GenresContext } from '../contextAPI/GenresContext';

const MovieCard = (props) => {
  const [stars, setStars] = useState(0);
  const [imgLoad, setImgLoad] = useState(false);
  const { genres } = useContext(GenresContext);
  const { title, overview, img, date, vote, id, genre_ids, starRating, postRatedMovies } = props;
  const { Title, Text } = Typography;
  // const api = new ApiService();

  const postRates = (id, value) => {
    setStars(value);
    return postRatedMovies(id, value);
  };

  const starColor = classNames({
    rate: true,
    bad: stars <= 3,
    normal: stars > 3 && stars < 5,
    good: stars > 5 && stars < 7,
    wonderful: stars > 7,
  });

  const ratingColor = classNames({
    ratingVote: true,
    bad: vote < 3,
    normal: vote >= 3 && vote < 5,
    good: vote >= 5 && vote < 7,
    wonderful: vote >= 7,
  });

  if (!imgLoad) {
    let image = new Image();
    image.src = img;
    image.onload = () => {
      setImgLoad(true);
    };
  }
  const showImg = imgLoad ? <img src={img} alt="poster" loading={'lazy'} /> : <Spinner />;

  return (
    <div className="card">
      <div className="img-box">{showImg}</div>
      <div className="info-box">
        <div className="info-top">
          <Title level={5} className="title">
            {title}
          </Title>

          <div className={ratingColor}>
            <span> {vote}</span>
          </div>

          <Text level={7}>{date || '20-20-2020'}</Text>

          <span className="tags">
            {genre_ids?.map((el) => {
              let tagName = genres.find((item) => {
                if (item.id === el) {
                  return item;
                }
              });
              return <Tag key={el}>{tagName.name}</Tag>;
            })}
          </span>
        </div>
        <Text className="text">{overview}</Text>

        <Rate
          count={10}
          className={starColor}
          value={starRating || stars}
          onChange={(value) => postRates(id, value)}
          allowHalf
        />
      </div>
    </div>
  );
};
MovieCard.defaultProps = {
  title: 'Oops!',
  overview: 'No text here..',
  date: '15-10-2010',
  img: imageShow,
};
MovieCard.propTypes = {
  title: propTypes.string,
  img: propTypes.string,
  overview: propTypes.string,
  date: propTypes.string,
};
export default MovieCard;
