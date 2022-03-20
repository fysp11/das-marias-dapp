// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";


interface cDAI {
  
  // define functions of COMPOUND we'll be using
  
  function mint() external payable; // to deposit to compound
  function redeem(uint redeemTokens) external returns (uint); // to withdraw from compound
  
  //following 2 functions to determine how much you'll be able to withdraw
  function exchangeRateStored() external view returns (uint); 
  function balanceOf(address owner) external view returns (uint256 balance);
}


interface DAI  {
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);

  function transfer(address recipient, uint256 amount) external returns (bool);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

}

interface UniswapRouter {
  function WETH() external pure returns (address);
  
  function swapExactTokensForETH(
    uint amountIn,
    uint amountOutMin,
    address[] calldata path,
    address to,
    uint deadline
  ) external returns (uint[] memory amounts);
}



contract BaseVault is ERC20 {

  address UNISWAP_ROUTER_ADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  UniswapRouter uniswap = UniswapRouter(UNISWAP_ROUTER_ADDRESS);
  address COMPUND_CDAI_ADDRESS = 0x859e9d8a4edadfEDb5A2fF311243af80F85A91b8;
  cDAI cDai = cDAI(COMPUND_CDAI_ADDRESS);
  address DAI_ADDRESS = 0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa;
  DAI dai = DAI(DAI_ADDRESS);

  constructor(
    string memory _name,
    string memory _symbol
  ) public ERC20(_name, _symbol) {
      
  }

  function getTotalContractValue() public view returns (uint256) { 
    uint256 cDaiValue = cDai.balanceOf(address(this)).div(1e8) * cDai.exchangeRateStored().div(1e28);
    return dai.balanceOf(address(this)) + cDaiValue;
  }

  function getProofOfDepositPrice() public view override returns (uint256) {
      uint256 proofOfDepositPrice = 0;
      uint256 totalBalance = getTotalContractValue();
      if (totalSupply() > 0) {
          proofOfDepositPrice = totalBalance.mul(1e18).div(totalSupply());
      }
      return proofOfDepositPrice;
  }

  function deposit(uint256 DAIAmount) public {
    require(dai.allowance(msg.sender, address(this)) >= DAIAmount, "Contract is not allowed to spend user's DRC.");
    require(dai.balanceOf(msg.sender) >= DAIAmount, "Attempted to deposit more than balance.");
    // mint amount of POD to be transferred to user for this deposit 

    // 50% of this goes to reserve and the resto continues the process 
    uint amountForYield = DAIAmount.div(2);
    address to = address(this);
    uint deadline = block.timestamp + (24 * 60 * 60);

    dai.transferFrom(msg.sender, address(this), DAIAmount);
    // deposit 50% eth  to compound
    cDai.mint(amountForYield);

    uint256 currentPodUnitPrice = getProofOfDepositPrice();
    uint256 podToMint = 0;
    if (totalSupply() == 0) {
        podToMint = drcAmount.mul(1e15);
    } else {
        uint256 totalBalance = getTotalContractValue();
        uint256 newPodTotal = totalBalance.mul(1e18).div(currentPodUnitPrice);
        podToMint = newPodTotal.sub(totalSupply());
    }

    _mint(msg.sender, podToMint);
  }

  function getContractBalance() public view returns(uint){
    return cDai.balanceOf(address(this)) + dai.balanceOf(address(this));
  }

}

