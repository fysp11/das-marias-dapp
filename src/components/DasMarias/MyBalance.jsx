import { Skeleton, InputNumber, Button, Typography } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useApiContract } from "react-moralis";

const { Text } = Typography;
// import { getEllipsisTxt } from "../../helpers/formatters";

function MyBalance() {
  const contractAddress = "0x8d12a197cb00d4747a1fe03395095ce2a5cc6819";

  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(420.11);
  const [inputValue, setInputValue] = useState("");

  const {
    runContractFunction: runDepositFunction,
    // data: depositData,
    // error: depositError,
    isLoading: isLoadingDeposit,
    isFetching: isFetchingDeposit,
  } = useApiContract({
    address: contractAddress,
    functionName: "deposit",
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "DAIAmount",
            type: "uint256",
          },
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    params: { DAIAmount: inputValue },
  });

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
    runDepositFunction();
    setBalance(balance + parseFloat(inputValue || 0));
    setInputValue("");
  };

  const withdrawValue = () => {
    setBalance(balance - parseFloat(inputValue || 0));
    setInputValue("");
  };

  const handleChange = (value) => {
    if (!isNaN(value) && value > 0) {
      setInputValue(value);
    }
  };

  return (
    <div style={{ width: "95vw", padding: "5px" }}>
      <Skeleton loading={loading}>
        <div style={{ padding: 2, textAlign: "center" }}>
          <h1 style={{ padding: "15px" }}>💰 Minha Conta</h1>
          {/* <Row justify="center"></Row> */}
          <InputNumber
            {...boxProps}
            addonBefore="PDD"
            value={balance}
            precision={2}
            style={{ textAlign: "center" }}
            disabled={true}
          />
          <br />
          <br />
          <InputNumber
            {...boxProps}
            autoFocus={true}
            addonBefore="DAI"
            value={inputValue}
            onInput={handleChange}
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
            disabled={!inputValue || isLoadingDeposit || isFetchingDeposit}
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
            disabled={
              !inputValue ||
              isLoadingDeposit ||
              isFetchingDeposit ||
              balance < inputValue
            }
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
export default MyBalance;
