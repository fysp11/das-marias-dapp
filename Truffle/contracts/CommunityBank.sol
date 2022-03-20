// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";


interface cDAI {
    
    // define functions of COMPOUND we'll be using
    
    function mint(uint256) external returns (uint256); // to deposit to compound
    function redeem(uint redeemTokens) external returns (uint256); // to withdraw from compound
    
    //following 2 functions to determine how much you'll be able to withdraw
    function exchangeRateStored() external view returns (uint256); 
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
    address COMPOUND_CDAI_ADDRESS = 0x6D7F0754FFeb405d23C51CE938289d4835bE3b14;
    cDAI cDai = cDAI(COMPOUND_CDAI_ADDRESS);
    address DAI_ADDRESS = 0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa;
    DAI dai = DAI(DAI_ADDRESS);
 


    constructor (
        string memory _name,
        string memory _symbol
    ) public  ERC20(_name, _symbol) payable {}

    function getTotalContractValue() public view returns (uint256) { 
        uint256 cDaiBalance = cDai.balanceOf(address(this));
        uint256 rate = cDai.exchangeRateStored();
        uint256 cDaiValue = (cDaiBalance / 1e8) * (rate / 1e18);
				uint256 daiBalance = dai.balanceOf(address(this));
				uint256 value = daiBalance + cDaiValue;
        return  value;
    }

    function getProofOfDepositPrice() public view returns (uint256) {
        uint256 proofOfDepositPrice = 0;
        uint256 totalBalance = getTotalContractValue();
        if (totalSupply() > 0) {
            proofOfDepositPrice = (totalBalance *1e18)/totalSupply();
        }
        return proofOfDepositPrice;
    }

     function deposit(uint256 DAIAmount) public returns (uint256) {
        require(dai.allowance(msg.sender, address(this)) >= DAIAmount, "Contract is not allowed to spend user's DAI.");
        require(dai.balanceOf(msg.sender) >= DAIAmount, "Attempted to deposit more than balance.");
        // mint amount of POD to be transferred to user for this deposit 

        // 50% of this goes to reserve and the resto continues the process 
        uint amountForYield = DAIAmount/2;
    
        dai.transferFrom(msg.sender, address(this), DAIAmount);
        // deposit 50% eth  to compound
        dai.approve(COMPOUND_CDAI_ADDRESS,amountForYield);
        uint256 cDaiMintResult = cDai.mint(amountForYield);

        uint256 currentPodUnitPrice = getProofOfDepositPrice();
         uint256 podToMint = 0;
        if (totalSupply() == 0 ) {
            podToMint = DAIAmount/5;
        } else {
          podToMint = (DAIAmount / currentPodUnitPrice/1e18) *1e18 ;
        }

        _mint(msg.sender, podToMint);
        return cDaiMintResult;
    }

       
    function getContractBalance() public view returns(uint){
        return cDai.balanceOf(address(this)) + dai.balanceOf(address(this));
    }

    function withdraw (uint256 PODAmount) public {
      uint256 currentPODPrice = getProofOfDepositPrice();
      uint256 daiAmount = PODAmount *(currentPODPrice *1e18);
      uint256 currentDaiBalance = dai.balanceOf(address(this));
      uint256 contractTotal = getTotalContractValue()  ;
      require(contractTotal>= daiAmount, "Attempted to withdraw more than balance.");
      require(currentDaiBalance >= daiAmount,"Not enough liquidity for withdrawal");
      if(currentDaiBalance >= daiAmount){
          dai.approve(msg.sender,daiAmount);
          dai.transferFrom(address(this), msg.sender,daiAmount );
      }

      _burn(msg.sender,PODAmount);
    }

}


