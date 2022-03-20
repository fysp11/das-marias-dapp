import { Skeleton, InputNumber, Button, Typography } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const { Text } = Typography;
// import { getEllipsisTxt } from "../../helpers/formatters";

function ERC20Balance() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(420.11);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading]);

  const boxProps = {
    size: "large",
    style: {
      width: "100%",
      maxWidth: "250px",
    },
  };

  const depositValue = () => {
    setBalance(balance + parseFloat(inputValue || 0));
    setInputValue("");
  };

  const withdrawValue = () => {
    setBalance(balance - parseFloat(inputValue || 0));
    setInputValue("");
  };

  return (
    <div style={{ width: "95vw", padding: "5px", textAlign: "center" }}>
      <h1 style={{ padding: "15px" }}>💰 Minha Conta</h1>
      <Skeleton loading={loading}>
        <div style={{ padding: 2, textAlign: "center" }}>
          {/* <Row justify="center"></Row> */}
          <InputNumber
            {...boxProps}
            addonBefore="PDD"
            value={balance * 1.2345}
            precision={2}
            style={{ textAlign: "center" }}
            disabled
          />
          <br />
          <br />
          <InputNumber
            {...boxProps}
            autoFocus={true}
            addonBefore="DAI"
            value={inputValue}
            onInput={(value) => setInputValue(value)}
          />
          <br />
          <Text italic>Current: {balance}</Text>
          <br />
          <br />
          <Button
            {...boxProps}
            type="primary"
            icon={<UploadOutlined />}
            onClick={depositValue}
            disabled={!inputValue}
          >
            Depositar
          </Button>
          <br />
          <br />
          <Button
            {...boxProps}
            type="secondary"
            icon={<DownloadOutlined />}
            onClick={withdrawValue}
            disabled={!inputValue || balance < inputValue}
          >
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
