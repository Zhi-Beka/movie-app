import { Space, Alert } from 'antd';

import './ErrorIndicator.css';

export const ErrorIndicator = ({ message }) => {
  const text = message ? message : 'something went wrong';
  return (
    <Space direction="vertical" className="errorAlert">
      <Alert message={text} type="error" showIcon />
    </Space>
  );
};
