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

  return (
    <div className="spin">
      <Spin indicator={antIcon} />
    </div>
  );
};
export default Spinner;
