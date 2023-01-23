import { Space, Alert } from 'antd';

export const ErrorIndicator = () => {
  const errorText = 'Oops, something went wrong... Please reload again';
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert message="Error" description={errorText} type="error" showIcon />
    </Space>
  );
};
