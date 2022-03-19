import { useERC20Balances } from "react-moralis";
import { Skeleton, InputNumber, Button } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
// import { getEllipsisTxt } from "../../helpers/formatters";

function ERC20Balance(props) {
  const { data: assets } = useERC20Balances(props);
  // const { Moralis } = useMoralis();

  // const columns = [
  //   {
  //     title: "Balance",
  //     dataIndex: "balance",
  //     key: "balance",
  //     render: (value, item) =>
  //       parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(6),
  //   },
  // ];

  const boxProps = {
    size: "large",
    style: {
      width: "100%",
      maxWidth: "250px",
    },
  };

  return (
    <div style={{ width: "95vw", padding: "5px" }}>
      <Skeleton loading={!assets}>
        <div style={{ padding: 2, textAlign: "center" }}>
          <h1 style={{ padding: "15px" }}>💰 Minha Conta</h1>
          {/* <Row justify="center"></Row> */}
          <InputNumber {...boxProps} addonBefore="PDD" disabled />
          <br />
          <br />
          <InputNumber {...boxProps} addonBefore="ETH" />
          <br />
          <br />
          <Button {...boxProps} type="primary" icon={<UploadOutlined />}>
            Depositar
          </Button>
          <br />
          <br />
          <Button {...boxProps} type="secondary" icon={<DownloadOutlined />}>
            Sacar
          </Button>
        </div>
        {/* <Table
          dataSource={assets}
          columns={columns}
          rowKey={(record) => {
            return record.token_address;
          }}
        /> */}
      </Skeleton>
    </div>
  );
}
export default ERC20Balance;
