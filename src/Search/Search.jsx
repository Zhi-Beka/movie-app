import React from 'react';
import { Input } from 'antd';

import './Search.css';

export default class Search extends React.Component {
  render() {
    const { getValue } = this.props;

    return (
      <div className="search-box">
        <h3>
          <a href="#">Search</a>
          <a href="#">Rated</a>
        </h3>

        <Input size="large" placeholder="Type to search..." onChange={getValue} />
      </div>
    );
  }
}
