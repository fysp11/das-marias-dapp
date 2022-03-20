import { Skeleton, InputNumber, Button, Typography } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  DAI_ABI,
  DAI_ADDRESS,
  DAS_MARIAS_ADDRESS,
  DAS_MARIAS_ABI_DEPOSIT,
} from "constants/abi";
import { useWeb3 } from "hooks/useWeb3";

const { Text } = Typography;

function MyBalance() {
  const { connect, provider, ready } = useWeb3();

  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(420.11);
  const [inputValue, setInputValue] = useState("");

  const [daiContract, setDaiContract] = useState(null);
  const [dasMariasContract, setContract] = useState(null);

  useEffect(async () => {
    connect();
    if (ready) {
      setDaiContract(new ethers.Contract(DAI_ADDRESS, DAI_ABI, provider));
      console.log(daiContract);

      setContract(
        new ethers.Contract(
          DAS_MARIAS_ADDRESS,
          DAS_MARIAS_ABI_DEPOSIT,
          provider,
        ),
      );
      console.log(dasMariasContract);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading, setContract, setDaiContract, ready, provider, connect]);

  const boxProps = {
    size: "large",
    style: {
      width: "100%",
      maxWidth: "250px",
    },
  };

  const depositValue = () => {
    daiContract.approve(
      DAS_MARIAS_ADDRESS,
      ethers.utils.parseEther(inputValue.toString()),
    );
    // .then(() => {
    //   contract.deposit(inputValue);
    // });
  };

  const withdrawValue = () => {
    setBalance(balance - parseFloat(inputValue || 0));
    setInputValue("");
  };

  const handleChange = (value) => {
    let valueToSet = "";
    if (!isNaN(value) && value > 0) {
      valueToSet = value;
    } else {
      valueToSet = "";
    }
    setInputValue(valueToSet);
  };

  return (
    <div style={{ width: "95vw", padding: "5px" }}>
      <Skeleton loading={loading}>
        <div style={{ padding: 2, textAlign: "center" }}>
          <h1 style={{ padding: "15px" }}>💰 Minha Conta</h1>
          <InputNumber
            {...boxProps}
            addonBefore="PDD"
            value={balance * 1.2345}
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
          <Text italic>Saldo: {balance}</Text>
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
          {/* {depositData && <pre>{JSON.stringify(depositData, null, 2)}</pre>}
          {depositError && <pre>{JSON.stringify(depositError, null, 2)}</pre>} */}
          <br />
          <br />
          <Button
            {...boxProps}
            type="secondary"
            icon={<DownloadOutlined />}
            onClick={withdrawValue}
            disabled={
              // isLoadingBalances ||
              // isFetchingBalances ||
              !inputValue ||
              // isLoadingDeposit ||
              // isFetchingDeposit ||
              balance < inputValue
            }
          >
            Sacar
          </Button>
        </div>
      </Skeleton>
    </div>
  );
}
export default MyBalance;
