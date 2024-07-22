# Web3 Metamask Plugin

## Overview

The MetamaskPlugin class extends Web3PluginBase and provides a set of functions to interact with the MetaMask wallet/RPC methods. This plugin allows developers to connect to MetaMask, switch between different networks, manage permissions, and watch ERC-20 tokens.

## Usage

To use this plugin, import it along with Web3PluginBase and eth from the web3 package.

```bash
npm i web3-metamask-plugin
```

```js
// import modules
import { Web3 } from "web3";
import { MetamaskPlugin } from "web3-metamask-plugin";

// initialize RPC endpoint with window.ethereum and register plugin
const web3 = new Web3(window.ethereum);
web3.registerPlugin(new MetamaskPlugin());

// use plugin functions WITHIN your React app
await web3.metamask.connectWallet();

await web3.metamask.getPermissions();

await web3.metamask.requestPermissions();

await web3.metamask.watchAsset(tokenAddress, symbol);

await web3.metamask.switchToGnosis();

await web3.metamask.switchToSepolia();

await web3.metamask.switchToEthereum();
```
