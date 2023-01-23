import { Button, Col, Image, Row } from 'antd';
import propTypes from 'prop-types';

/* eslint-disable */
import './MovieCard.css';
import imageShow from '../images/shrek.jpg';

const MovieCard = (props) => {
  const { title, overview, img, date, id } = props;

  const sliceText = (text) => {
    const len = 120;
    if (text.length > len) {
      return text.slice(0, len) + ' ...';
    }
  };

  return (
    <Row className="card">
      <Col flex="185px">
        <Image src={img} height={280} />
      </Col>
      <Col flex="265px" className="col">
        <h4>{title}</h4>
        <p>{date}</p>
        <Button>Action</Button>
        <Button>Drama</Button>
        <p>{sliceText(overview)}</p>
      </Col>
    </Row>
  );
};
MovieCard.defaultProps = {
  title: 'Oops!',
  overview: 'Somtehing went wrong...',
  date: '15-10-2010',
  img: imageShow,
  id: Math.floor(Math.random() * 25 + 7),
};
MovieCard.propTypes = {
  title: propTypes.string,
  img: propTypes.string,
  overview: propTypes.string,
  date: propTypes.string,
  id: propTypes.number,
};
export default MovieCard;
