import { Button, Col, Divider, Image, Rate, Row, Typography } from 'antd';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { useState } from 'react';

/* eslint-disable */
import './MovieCard.css';
import imageShow from '../images/shrek.jpg';

const MovieCard = (props) => {
  const [value, setValue] = useState(0);
  const { title, overview, img, date, rating } = props;
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const { Title, Text } = Typography;
  const sliceText = (text) => {
    const len = 120;
    if (text.length > len) {
      return text.slice(0, len) + ' ...';
    }
  };

  const starColor = classNames({
    rate: true,
    bad: value < 3,
    notBad: value > 3 && value < 5,
    good: value > 5 && value < 7,
    excellent: value > 7,
  });

  return (
    <Row className="card" align>
      <Col span={10}>
        <Image src={img} height={280} />
      </Col>
      <Col span={12} className="col-text">
        <Title level={5}>{title}</Title>
        <Text level={7}>{date}</Text>
        <p className="rating">{rating}</p>
        <div>
          <Button>Action</Button>
          <Divider type="vertical" />
          <Button>Drama</Button>
        </div>
        <Text>{sliceText(overview) || 'No more information about this movie, sorry'}</Text>
        <Rate count={10} className={starColor} onChange={setValue} value={value} />
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
