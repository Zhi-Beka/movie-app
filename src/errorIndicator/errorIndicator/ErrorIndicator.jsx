import { Space, Alert } from 'antd';

export const ErrorIndicator = ({ noResults }) => {
  const errorText = 'Oops, something went wrong... Please reload again';
  const noResultText = 'There is no such kind of movie that you are looking for!';
  const result = noResults ? noResultText : errorText;
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert message="Error" description={result} type="error" showIcon />
    </Space>
  );
};
