const {ethers} = require("hardhat");

async function main() {
    const dstChainId = '10109';

   /*
    let adapterParams = ethers.utils.solidityPack(
        ["uint16", "uint", "uint", "address"],
        [2, 200000, 55555555555, "0x07426f3F1524cE7569f3856C703621A54c5e5eFc"]

    )*/

    let adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 200000]);

    const localContractAddressString = '0x78Ac0e9ABCC9296bB7c8FAa53336243157961C59';

    const localContractAddress = ethers.utils.getAddress(localContractAddressString);

    const goerliContractAddress = ethers.utils.getAddress('0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23');

    const goerliEndpoint = await ethers
        .getContractAt("ILayerZeroEndpoint", goerliContractAddress);

    const localContractInstance = await ethers
        .getContractAt("CrossChainCounter", localContractAddress);

    let fees = await localContractInstance
        .estimateFee(10109, false, "0x");
    console.log(`fees[0] (wei): ${fees[0]} / (eth): ${ethers.utils.formatEther(fees[0])}`);


    let tx = await (
        await localContractInstance.incrementCounter(
            10109,
            { value: fees[0], gasLimit: 9808960  }
        )
    ).wait()



    console.log(`✅ Message Sent [Goerli] incrementCounter on destination CrossChainCounter @ [${dstChainId}]`)
    console.log(`tx: ${tx.transactionHash}`)

    console.log(``)
    console.log(`Note: to poll/wait for the message to arrive on the destination use the command:`)
    console.log(`       (it may take a minute to arrive, be patient!)`)
    console.log("")
    console.log(`    $ npx hardhat --network mumbai ocPoll`)
}


// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });