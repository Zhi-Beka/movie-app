import { Col, Image, Rate, Row, Space, Tag, Typography } from 'antd';
import { Spin } from 'antd/lib';
import { LoadingOutlined } from '@ant-design/icons';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { useState, useContext } from 'react';

/* eslint-disable */
import './MovieCard.css';
import imageShow from '../images/not-found.jpg';
import ApiService from '../services/movieApi';

import { GenresContext } from '../contextAPI/GenresContext';

const MovieCard = (props) => {
  const [stars, setStars] = useState(0);
  const { title, overview, img, date, vote, id, genre_ids } = props;
  const { Title, Text } = Typography;
  const api = new ApiService();
  const { genres } = useContext(GenresContext);

  const postRates = async (id, value) => {
    setStars(value);
    return await api
      .postRatedMovies(id, value)
      .then((data) => console.log(data, 'RESPONSE FROM SERVER'))
      .catch((err) => console.log(err.message));
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 48,
      }}
      spin
    />
  );

  const sliceText = (text) => {
    const len = 80;
    if (text.length > len) {
      return text.slice(0, len) + ' ...';
    }
  };

  const starColor = classNames({
    rate: true,
    bad: stars <= 3,
    normal: stars > 3 && stars < 5,
    good: stars > 5 && stars < 7,
    wonderful: stars > 7,
  });

  const ratingColor = classNames({
    rating: true,
    bad: vote < 3,
    normal: vote >= 3 && vote < 5,
    good: vote >= 5 && vote < 7,
    wonderful: vote >= 7,
  });

  const tagNames = genre_ids?.map((el) => {
    let tagName = genres?.find((item) => {
      if (item.id === el) {
        return item.name;
      }
    });
    return <Tag key={el}>{tagName.name}</Tag>;
  });

  return (
    <Row className="card" align>
      <Col lg={10} className="col-img">
        <Image
          src={img}
          height={280}
          fallback={imageShow}
          placeholder={<Spin indicator={antIcon} className="spin" />}
        />
      </Col>
      <Col span={12} className="col-text">
        <Title level={5}>{title}</Title>
        <Text level={7}>{date}</Text>
        <div className={ratingColor}>
          <span> {vote}</span>
        </div>
        <Space size={[0, 8]} wrap>
          {tagNames}
        </Space>

        <Text>{sliceText(overview) || 'No more information about this movie, sorry'}</Text>

        <Rate
          count={10}
          className={starColor}
          value={stars}
          onChange={(value) => postRates(id, value)}

          // disabled = {disableStars}
        />
      </Col>
    </Row>
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
