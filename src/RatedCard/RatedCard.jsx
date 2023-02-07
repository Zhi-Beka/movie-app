/* eslint-disable */
import { Rate, Tag, Typography } from 'antd';
import propTypes from 'prop-types';
import classNames from 'classnames';

import imageShow from '../images/not-found.jpg';
import './RatedCard.css';
import Spinner from '../Spinner/Spinner';

import { useState } from 'react';
import { GenresConsumer } from '../contextAPI';

const RatedCard = (props) => {
  const { title, overview, imgCard, date, vote, genre_ids, starResult } = props;
  const { Title, Text } = Typography;
  const [imgLoad, setImgLoad] = useState(false);

  const starsColor = classNames({
    rate: true,
    bad: starResult <= 3,
    normal: starResult > 3 && starResult < 5,
    good: starResult > 5 && starResult < 7,
    wonderful: starResult > 7,
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
    image.src = imgCard;
    image.onload = () => {
      setImgLoad(true);
    };
  }
  const showImg = imgLoad ? <img src={imgCard} alt="poster" /> : <Spinner />;

  return (
    <GenresConsumer>
      {({ genres }) => {
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

              <Rate count={10} className={starsColor} value={starResult} allowHalf />
            </div>
          </div>
        );
      }}
    </GenresConsumer>
  );
};
RatedCard.defaultProps = {
  title: 'Oops!',
  overview: 'No text here..',
  date: '15-10-2010',
  img: imageShow,
};
RatedCard.propTypes = {
  title: propTypes.string,
  img: propTypes.string,
  overview: propTypes.string,
  date: propTypes.string,
};
export default RatedCard;
