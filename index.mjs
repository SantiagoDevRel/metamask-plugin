import { Web3PluginBase, eth } from "web3";

export class MetamaskPlugin extends Web3PluginBase {
  pluginNamespace = "Metamask";

  async connectWallet() {
    const connectedwallet = await this.requestManager.send({
      method: "eth_requestAccounts",
      params: [],
    });
    return connectedwallet;
  }

  async addGnosisEnum() {
    await this.requestManager.send({
      method: "wallet_addEthereumChain",
      params: [
        {
          blockExplorerUrls: ["https://blockscout.com/poa/xdai/"],
          iconUrls: ["https://xdaichain.com/fake/example/url/xdai.svg", "https://xdaichain.com/fake/example/url/xdai.png"],
          nativeCurrency: {
            name: "XDAI",
            symbol: "XDAI",
            decimals: 18,
          },
          rpcUrls: ["https://rpc.gnosischain.com"],
          chainId: "0x64",
          chainName: "Gnosis",
        },
      ],
    });
  }

  async addEthereum() {
    await this.requestManager.send({
      method: "wallet_addEthereumChain",
      params: [
        {
          blockExplorerUrls: ["https://etherscan.io"],
          iconUrls: [],
          nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: ["https://mainnet.infura.io/v3/", "https://eth.llamarpc.com"],
          chainId: "0x1",
          chainName: "Ethereum Mainnet",
        },
      ],
    });
  }

  async addSepolia() {
    await this.requestManager.send({
      method: "wallet_addEthereumChain",
      params: [
        {
          blockExplorerUrls: ["https://sepolia.etherscan.io"],
          iconUrls: [],
          nativeCurrency: {
            name: "Sepolia Ether",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: ["https://ethereum-sepolia-rpc.publicnode.com", "https://endpoints.omniatech.io/v1/eth/sepolia/public", "https://endpoints.omniatech.io/v1/eth/sepolia/public"],
          chainId: "0xAA36A7",
          chainName: "Sepolia Testnet",
        },
      ],
    });
  }

  async disconnectWallet() {
    const response = await this.requestManager.send({
      method: "wallet_getPermissions",
      params: [],
    });
    console.log("Wallet disconnected", response);
  }
}
