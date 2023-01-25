import React from 'react';
import { Divider, Input, Typography } from 'antd';

import './Search.css';

export default class Search extends React.Component {
  render() {
    const { getValue } = this.props;
    const { Title } = Typography;
    return (
      <div className="search-box">
        <Divider orientation="center">
          <Title level={5}>
            <a href="#">Search</a>
            <Divider type="vertical" />
            <a href="#">Rated</a>
          </Title>
        </Divider>

        <Input size="large" placeholder="Type to search..." maxLength={20} onChange={getValue} />
      </div>
    );
  }
}
