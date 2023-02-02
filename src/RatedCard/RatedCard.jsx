import { Button, Col, Divider, Image, Rate, Row, Typography } from 'antd';
import propTypes from 'prop-types';
import classNames from 'classnames';
/* eslint-disable */
import imageShow from '../images/not-found.jpg';
import './RatedCard.css';
import Spinner from '../Spinner/Spinner';

const RatedCard = (props) => {
  const { title, overview, img, date, vote, id, rating } = props;
  const { Title, Text } = Typography;

  const sliceText = (text) => {
    const len = 120;
    if (text.length > len) {
      return text.slice(0, len) + ' ...';
    }
  };
  const starsColor = classNames({
    rate2: true,
    bad2: rating <= 3,
    normal2: rating > 3 && rating < 5,
    good2: rating > 5 && rating < 7,
    wonderful2: rating > 7,
  });

  const ratingColor = classNames({
    rating: true,
    bad: vote < 3,
    normal: vote >= 3 && vote < 5,
    good: vote >= 5 && vote < 7,
    wonderful: vote >= 7,
  });

  return (
    <Row className="card" align>
      <Col lg={10} className="col-img">
        <Image src={img} height={280} placeholder={<Spinner />} />
      </Col>
      <Col span={12} className="col-text">
        <Title level={5}>{title}</Title>
        <Text level={7}>{date}</Text>
        <div className={ratingColor}>
          <span> {vote}</span>
        </div>
        <div>
          <Button>Action</Button>
          <Divider type="vertical" />
          <Button>Drama</Button>
        </div>
        <Text>{sliceText(overview) || 'No more information about this movie, sorry'}</Text>
        <Rate count={10} value={rating} className={starsColor} />
      </Col>
    </Row>
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
