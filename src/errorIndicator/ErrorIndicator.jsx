import { Space, Alert } from 'antd';

export const ErrorIndicator = ({ message }) => {
  const text = message ? message : 'something went wrong';
  return (
    <Space direction="vertical" className="errorAlert">
      <Alert message={text} type="error" showIcon />
    </Space>
  );
};
