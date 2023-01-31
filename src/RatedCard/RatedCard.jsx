import { Button, Col, Divider, Image, Row, Typography } from 'antd';
import propTypes from 'prop-types';

/* eslint-disable */
import imageShow from '../images/not-found.jpg';
import './RatedCard.css';

const RatedCard = (props) => {
  const { title, overview, img, date, vote } = props;
  const { Title, Text } = Typography;

  const sliceText = (text) => {
    const len = 120;
    if (text.length > len) {
      return text.slice(0, len) + ' ...';
    }
  };

  return (
    <Row className="card" align>
      <Col lg={10} className="col-img">
        <Image src={img} height={280} fallback={imageShow} />
      </Col>
      <Col span={12} className="col-text">
        <Title level={5}>{title}</Title>
        <Text level={7}>{date}</Text>
        <div className="rating">
          <span> {vote}</span>
        </div>
        <div>
          <Button>Action</Button>
          <Divider type="vertical" />
          <Button>Drama</Button>
        </div>
        <Text>{sliceText(overview) || 'No more information about this movie, sorry'}</Text>
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
