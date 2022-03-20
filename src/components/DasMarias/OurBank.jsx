// import { useERC20Balances } from "react-moralis";
import { Image } from "antd";

function OurBank() {
  // const { Moralis } = useMoralis();

  return (
    <div style={{ width: "450px", padding: "15px", textAlign: "center" }}>
      <h1 style={{ margin: "10px" }}>🔎 Stats</h1>
      <Image width="100%" preview={false} src="mocks/stats1.png" />
    </div>
  );
}
export default OurBank;
