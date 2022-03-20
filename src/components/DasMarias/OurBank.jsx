// import { useERC20Balances } from "react-moralis";
import { Tabs, Image, Skeleton } from "antd";
import { useEffect, useState } from "react"

const { TabPane } = Tabs;

function OurBank() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading])

  return (
    <div style={{ width: "450px", padding: "15px", textAlign: "center" }}>
      <Skeleton loading={loading}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Meu Banco" key="1">
            <Image width="100%" preview={false} src="mocks/stats1.png" />
          </TabPane>
          <TabPane tab="Nosso Banco" key="2">
            <Image width="100%" preview={false} src="mocks/stats2.png" />
          </TabPane>
        </Tabs>
      </Skeleton>
    </div>
  );
}
export default OurBank;
