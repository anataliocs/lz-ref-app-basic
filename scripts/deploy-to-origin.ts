const {ethers} = require("hardhat");
const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
const CONSTANTS = require("../constants/index.ts")
require("dotenv").config({path: ".env"});

async function main() {
    const endpointNetworkName = CONSTANTS.ENDPOINT_NETWORK_NAME_ORIGIN;

    const crossChainCounterContract = await ethers.getContractFactory(
        "CrossChainCounter"
    );

    // get the Endpoint address
    const endpointAddr = LZ_ENDPOINTS[endpointNetworkName]
    console.log(
        `Deploying CrossChainCounter to origin chain [${endpointNetworkName}] \n`,
        `[${endpointNetworkName}] Endpoint contract address: ${endpointAddr} \n`,
        `Deploying... \n`
    );

    // Deploy the contract with endpoint set to endpointNetworkName value
    const deployedOmniCounterContract = await crossChainCounterContract.deploy(endpointAddr);

    await deployedOmniCounterContract.deployed();
    console.log(
        `✅ LZ CrossChainCounter deployed to origin chain [${endpointNetworkName}] Contract Address: ${deployedOmniCounterContract.address} \n`,
        `View deployed contract on Etherscan: https://goerli.etherscan.io/address/${deployedOmniCounterContract.address} \n`
    );
}

// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });