import { Space, Alert } from 'antd';

import './ErrorIndicator.css';

export const ErrorIndicator = ({ noResults, message }) => {
  const errorText = ' Please come later';
  const noResultText = 'There is no movie, that you are looking for...';
  const result = noResults ? noResultText : errorText;
  const noInternet = message ? message : null;
  return (
    <Space direction="vertical" className="errorAlert">
      <Alert message={noInternet} description={result} type="error" showIcon />
    </Space>
  );
};
