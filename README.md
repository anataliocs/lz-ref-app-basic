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

The contracts in this repo are not currently audited and are intended for learning purposes.

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
npx hardhat run --network localgoerli scripts/deploy-to-origin.ts
```

Deploy to local Mumbai:
```shell
npx hardhat run --network localmumbai scripts/deploy-to-destination.ts
```

### Deploy to Testnet

You will need testnet ETH to deploy.

Deploy to Goerli:
```shell
npx hardhat run --network goerli scripts/deploy-to-origin.ts
```

Deploy to Mumbai:
```shell
npx hardhat run --network mumbai scripts/deploy-to-destination.ts 
```

### Example Deployed Contract

Mumbai:  0x07426f3F1524cE7569f3856C703621A54c5e5eFc
https://mumbai.polygonscan.com/address/0x07426f3F1524cE7569f3856C703621A54c5e5eFc

Goerli: 0x78Ac0e9ABCC9296bB7c8FAa53336243157961C59
https://goerli.etherscan.io/address/0x78Ac0e9ABCC9296bB7c8FAa53336243157961C59

### Set Trusted Remote

Example [script from solidity examples Github Repo](https://github.com/LayerZero-Labs/solidity-examples/blob/main/tasks/setTrustedRemote.js)

Review the docs on [setting a trusted remote](https://layerzero.gitbook.io/docs/evm-guides/master/set-trusted-remotes) for more context.


Setting a trusted remote:
```typescript
let trustedRemote = hre.ethers.utils.solidityPack(
    ['address','address'],
    [remoteContract.address, localContract.address]
)
```

Set trusted remotes to destination contract on Mumbai:
```shell
npx hardhat run --network mumbai scripts/setTrustedRemotes.ts 
```

