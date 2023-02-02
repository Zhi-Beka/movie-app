import React from 'react';
import { Input } from 'antd';

import './Search.css';

export default class Search extends React.Component {
  render() {
    const { getValue } = this.props;

    return (
      <div className="search-box">
        <Input size="large" placeholder="Type to search..." maxLength={20} onChange={getValue} autoFocus />
      </div>
    );
  }
}
