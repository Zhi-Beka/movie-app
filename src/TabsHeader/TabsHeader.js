import { Tabs } from 'antd';

const TabsHeader = ({ tabs, setTabs }) => {
  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={tabs.map((el, i) => {
        return {
          label: el,
          key: i + 1,
        };
      })}
      onChange={setTabs}
    />
  );
};
export default TabsHeader;
