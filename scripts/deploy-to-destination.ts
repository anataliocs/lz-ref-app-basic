const {ethers} = require("hardhat");
const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
const CONSTANTS = require("../constants/index.ts")
require("dotenv").config({path: ".env"});

async function main() {
    const endpointNetworkName = CONSTANTS.ENDPOINT_NETWORK_NAME_DESTINATION;

    const crossChainCounterContract = await ethers.getContractFactory(
        "CrossChainCounter"
    );

    // get the Endpoint address
    const endpointAddr = LZ_ENDPOINTS[endpointNetworkName]
    console.log(
        `Deploying CrossChainCounter to destination chain [${endpointNetworkName}] \n`,
        `[${endpointNetworkName}] Endpoint contract address: ${endpointAddr} \n`,
            `Deploying... \n`
    );

    // Deploy the contract with endpoint set to endpointNetworkName value
    const deployedOmniCounterContract = await crossChainCounterContract.deploy(endpointAddr);

    await deployedOmniCounterContract.deployed();
    // print the address of the deployed contract
    console.log(
        `LZ CrossChainCounter deployed to destination chain [${endpointNetworkName}] Contract Address: ${deployedOmniCounterContract.address} \n`,
        `View deployed contract on Polygonscan: https://mumbai.polygonscan.com/address/[${deployedOmniCounterContract.address}] \n`
    );
}

// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });