require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const INFURA_GOERLI_URL = process.env.INFURA_GOERLI_URL;
const INFURA_MUMBAI_URL = process.env.INFURA_MUMBAI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

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
      account: PRIVATE_KEY
    },
    mumbai: {
      url: INFURA_MUMBAI_URL,
      account: PRIVATE_KEY
    },
  },
};