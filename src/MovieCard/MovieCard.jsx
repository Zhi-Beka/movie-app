import { Button, Col, Divider, Image, Row, Typography } from 'antd';
import propTypes from 'prop-types';

/* eslint-disable */
import './MovieCard.css';
import imageShow from '../images/shrek.jpg';

const MovieCard = (props) => {
  const { title, overview, img, date, id } = props;
  const { Title, Text } = Typography;
  const sliceText = (text) => {
    const len = 120;
    if (text.length > len) {
      return text.slice(0, len) + ' ...';
    }
  };

  return (
    <Row className="card" align>
      <Col span={10}>
        <Image src={img} height={280} />
      </Col>
      <Col span={12} className="col-text">
        <Title level={5}>{title}</Title>
        <Text level={7}>{date}</Text>
        <div>
          <Button>Action</Button>
          <Divider type="vertical" />
          <Button>Drama</Button>
        </div>
        <Text>{sliceText(overview)}</Text>
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
