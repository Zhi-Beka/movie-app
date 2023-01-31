import { Space, Alert } from 'antd';

export const ErrorIndicator = ({ noResults }) => {
  const errorText = 'Oops, something went wrong... Please come later';
  const noResultText = 'There is no movie, that you are looking for...';
  const result = noResults ? noResultText : errorText;
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert message="Error" description={result} type="error" showIcon />
    </Space>
  );
};
