require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const INFURA_GOERLI_URL = process.env.INFURA_GOERLI_URL;
const INFURA_MUMBAI_URL = process.env.INFURA_MUMBAI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    localgoerli: {
      url: "http://127.0.0.1:8545/"
    },
    localmumbai: {
      url: "http://127.0.0.1:8546/"
    },
    goerli: {
      url: INFURA_GOERLI_URL,
      accounts: [PRIVATE_KEY]
    },
    mumbai: {
      url: INFURA_MUMBAI_URL,
      accounts: [PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY
    }
  }
};