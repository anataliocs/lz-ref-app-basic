# Basic LZ Integration Blocking Reference App

This project demonstrates basic message sending using [LayerZero](https://layerzero.network/) to send a cross chain message 
from the source chain to the destination chain to increment a counter on the destination chain.

This is a default blocking implementation where failed messages will block the channel.

The contracts leverage the examples from the [Solidity Examples Github Repo](https://github.com/LayerZero-Labs/solidity-examples)
with additional documentation that may be redundant or excessive for a production mainnet app but is added to
provide a developer with additional context while learning how to integrate with [LayerZero](https://layerzero.network/).

Some of these examples are simplified for the purpose of learning the basics of LZ Integration.  Please review
the best practices section of the [docs for more context for a mainnet implementation](https://layerzero.gitbook.io/docs/evm-guides/best-practice).

Base Interfaces and Util libraries are explictly included for easy reference in `/interfaces` and `\util`.

The contracts in this repo are not currently audited and are intended for learning purposes.  Do not directly use these code samples
directly in a Mainnet application.

### Basic Blocking Implementation

Review `LzBaseApp` for more context on the implementation

The contract `LzBaseApp` is an example LzReceiver blocking implementation that provides send and 
receive functionality and an example User Application Config.

### Setup your .env file

Create your `.env` file:
```shell
touch .env
```

Update your `.env` file:
```
INFURA_GOERLI_URL=
INFURA_MUMBAI_URL=

PRIVATE_KEY=
```

### Configuring your endpoint

You can review the [interface for configuring an endpoint on Github](https://github.com/LayerZero-Labs/solidity-examples/blob/main/contracts/interfaces/ILayerZeroEndpoint.sol)
Review the docs for context on [setting the endpoint for various chains](https://layerzero.gitbook.io/docs/technical-reference/mainnet/supported-chain-ids)

Endpoints are defined locally in `/constants/layerzeroEndpoints.json`

### User Application Config

Review the docs for additional context on [customizing your User Application Config](https://layerzero.gitbook.io/docs/evm-guides/ua-custom-configuration).

### Test Deployment Dry Run Locally

Deploy to local forks as a dry run before deploying to testnet.  

Install Ganache:
```shell
npm install ganache --global
```

Ganache allows you to fork an existing chain such as Goerli or Mumbai.

Start up a local goerli node:
```shell
ganache --fork.url https://goerli.infura.io/v3/[YOUR API KEY]
```

Start up a local Polygon Mumbai node:
```shell
ganache --fork.url https://polygon-mumbai.infura.io/v3/[YOUR API KEY] --port 8446
```

Deploy to local Goerli:
```shell
npx hardhat run --network localgoerli scripts/deployToOrigin.ts
```

Deploy to local Mumbai:
```shell
npx hardhat run --network localmumbai scripts/deployToDestination.ts
```

### Deploy to Testnet

You will need testnet ETH to deploy.

Deploy to Goerli:
```shell
npx hardhat run --network goerli scripts/deployToOrigin.ts
```

Deploy to Mumbai:
```shell
npx hardhat run --network mumbai scripts/deployToDestination.ts 
```

### Example Deployed Contract

Mumbai:  0x07426f3F1524cE7569f3856C703621A54c5e5eFc
https://mumbai.polygonscan.com/address/0x07426f3F1524cE7569f3856C703621A54c5e5eFc

Goerli: 0x78Ac0e9ABCC9296bB7c8FAa53336243157961C59
https://goerli.etherscan.io/address/0x78Ac0e9ABCC9296bB7c8FAa53336243157961C59


### Publish and Verify Source Code

Register for a free [Etherscan account and create an API key](https://etherscan.io/register).

Add Etherscan API key to `.env`
```
ETHERSCAN_API_KEY=
```

Submit source code to Etherscan for origin contract on Goerli:
```
npx hardhat verify --network goerli 0x78Ac0e9ABCC9296bB7c8FAa53336243157961C59 '0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23' 
```

Register for a free [Polygonscan account and create an API key](https://polygonscan.com/register).

Add Polygonscan API key to `.env`
```
POLYGONSCAN_API_KEY=
```

Submit source code to Polygonscan for destination contract on Mumbai:
```
npx hardhat verify --network mumbai 0x07426f3F1524cE7569f3856C703621A54c5e5eFc '0xf69186dfBa60DdB133E91E9A4B5673624293d8F8' 
```

Verified Origin Contract Source Code on Goerli:  https://goerli.etherscan.io/address/0x78Ac0e9ABCC9296bB7c8FAa53336243157961C59#code

Verified Destination Contract Source Code on Mumbai:  https://mumbai.polygonscan.com/address/0x07426f3F1524cE7569f3856C703621A54c5e5eFc#code

### Set Trusted Remote

Example [script from solidity examples Github Repo](https://github.com/LayerZero-Labs/solidity-examples/blob/main/tasks/setTrustedRemote.js)

Review the docs on [setting a trusted remote](https://layerzero.gitbook.io/docs/evm-guides/master/set-trusted-remotes) for more context.


Setting a trusted remote in 40 byte format:
```typescript
let trustedRemote = hre.ethers.utils.solidityPack(
    ['address','address'],
    [remoteContract.address, localContract.address]
)
```

Set trusted remotes on origin contract on Goerli:
```shell
npx hardhat run --network goerli scripts/setTrustedRemoteOrigin.ts 
```

Set Trusted Remote Transaction on origin contract on Goerli:  https://goerli.etherscan.io/tx/0x1f73668401fb710d7fd9a061962a673e878bc0e2d95bfe4bcdab3d05992bd355

Set trusted remotes on destination contract on Mumbai:
```shell
npx hardhat run --network mumbai scripts/setTrustedRemoteDestination.ts 
```

Set Trusted Remote Transaction on destination contract on Mumbai:  https://mumbai.polygonscan.com/tx/0x67380bd4cc11b66c6375e47a6be365647a763cd68950336df307e2cce9363314


### Send Message from Origin to Destination

**Fee Estimation:**  When calling the `send()` method you must call `estimateFee()` on the endpoint deployed on your source chain
and include the `fees[0]` value in the `msg.value` field in your `send()` transaction.

NOTE:  Your `send()` and `estimateFee()` parameters such as source chain ID, payload and adapter parameters must be equivalent.

Call increment counter on origin contract:
```shell
npx hardhat run --network goerli scripts/incrementCrossChainCounter.ts
```