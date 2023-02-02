import { Spin } from 'antd/lib';
import { LoadingOutlined } from '@ant-design/icons';

import './Spinner.css';

const Spinner = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 48,
      }}
      spin
    />
  );

  return <Spin indicator={antIcon} className="spin" />;
};
export default Spinner;
