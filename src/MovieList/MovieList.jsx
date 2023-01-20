/* eslint-disable no-unused-vars */
import { Row, Col, Card, Image, Button, Layout } from 'antd';
import './MovieList.css';

//const test = new ApiService()
//test.getOneData(550).then(data => console.log(data))

//test.getSearchMovie("return").then(data => console.log(data))
const MovieList = () => {
  return (
    <div className="container">
      <Row className="card" hoverable>
        <Col flex="185px">
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" height={280} />
        </Col>
        <Col flex="265px" className="col">
          <h4>The way back</h4>
          <p>March 5, 2020</p>
          <Button gray-4>Action</Button>
          <Button>Drama</Button>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas sit repellat distinctio animi corporis
            blanditiis sint veniam fuga perspiciatis ex. Numquam minus nisi
          </p>
        </Col>
      </Row>
      <Row className="card" hoverable>
        <Col flex="185px">
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" height={280} />
        </Col>
        <Col flex="265px" className="col">
          <h4>The way back</h4>
          <p>March 5, 2020</p>
          <Button gray-4>Action</Button>
          <Button>Drama</Button>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas sit repellat distinctio animi corporis
            blanditiis sint veniam fuga perspiciatis ex. Numquam minus nisi
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default MovieList;
