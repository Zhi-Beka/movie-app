import { Space, Alert } from 'antd';

export const ErrorIndicator = ({ message }) => {
  const text = message ? message : 'something went wrong';
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
        marginTop: '40px',
      }}
    >
      <Alert message={text} type="error" showIcon />
    </Space>
  );
};
