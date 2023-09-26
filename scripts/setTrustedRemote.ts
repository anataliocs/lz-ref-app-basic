const {ethers} = require("hardhat");
const CHAIN_ID = require("../constants/chainIds.json")
const { getDeploymentAddresses } = require("../utils/readStatic")
const CONSTANTS = require("../constants/index.ts")

async function main() {
    const localContractAddress = CONSTANTS.ENDPOINT_NETWORK_NAME_ORIGIN;
    const remoteContractAddress = CONSTANTS.ENDPOINT_NETWORK_NAME_DESTINATION;
    const localEndpointNetworkName = CONSTANTS.ENDPOINT_NETWORK_NAME_ORIGIN;
    const remoteEndpointNetworkName = CONSTANTS.ENDPOINT_NETWORK_NAME_DESTINATION;

    const remoteChainId = "TODO";

    // get local contract
    const localContractInstance = await ethers.getContract(localContractAddress);

    // concat remote and local address
    let remoteAndLocal = ethers.utils.solidityPack(
        ['address','address'],
        [remoteContractAddress, localContractAddress]
    );

    // check if pathway is already set
    const isTrustedRemoteSet = await localContractInstance.isTrustedRemote(remoteChainId, remoteAndLocal);

    if(!isTrustedRemoteSet) {
        try {
            let tx = await (await localContractInstance.setTrustedRemote(remoteChainId, remoteAndLocal)).wait()
            console.log(`✅ [${localEndpointNetworkName}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
            console.log(` tx: ${tx.transactionHash}`)
        } catch (e) {
            if (e.error.message.includes("The chainId + address is already trusted")) {
                console.log("*source already set*")
            } else {
                console.log(`❌ [${localEndpointNetworkName}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
            }
        }
    } else {
        console.log("*source already set*")
    }
}

// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });