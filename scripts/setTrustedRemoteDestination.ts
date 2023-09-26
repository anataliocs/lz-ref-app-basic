const {ethers} = require("hardhat");
const CHAIN_ID = require("../constants/chainIds.json")
const CONSTANTS = require("../constants/index.ts")

async function main() {
    const localContractAddressString = '0x07426f3F1524cE7569f3856C703621A54c5e5eFc';
    const remoteContractAddressString = '0x78Ac0e9ABCC9296bB7c8FAa53336243157961C59';

    const localContractAddress = ethers.utils.getAddress(localContractAddressString);

    const remoteContractAddress = ethers.utils.getAddress(remoteContractAddressString);

    const remoteChainId = "10121";

    // concat remote and local address
    let remoteAndLocal = ethers.utils.solidityPack(
        ['address', 'address'],
        [localContractAddress, remoteContractAddress]
    );

    const localContractInstance = await ethers
        .getContractAt("CrossChainCounter", localContractAddress);


    try {
        let tx = await (await localContractInstance.functions.setTrustedRemote(remoteChainId, remoteAndLocal)).wait()
        console.log(`✅ [Mumbai] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
        console.log(` tx: ${tx.transactionHash}`)
    } catch (e) {
        if (e.error.message.includes("The chainId + address is already trusted")) {
            console.log("*source already set*")
        } else {
            console.log(`❌ [Mumbai] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
        }
    }
}

// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });