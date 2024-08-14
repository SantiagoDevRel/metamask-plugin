import { type Address, Web3PluginBase } from "web3";
/**
 * Class representing a Metamask plugin that extends Web3PluginBase.
 * Manages wallet connection, disconnection, chain switching, permission requests, asset tracking, and address retrieval.
 */
export class MetamaskPlugin extends Web3PluginBase {
  pluginNamespace = "metamask";
  accounts = [];

  truncateAddress = (address: Address): string => {
    const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
    const match = address?.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  /**
   * Connects the wallet by sending a request to the Ethereum provider to connect the user's wallet.
   * Updates the 'accounts' property with the connected wallet addresses.
   * @returns A promise that resolves with the connected wallet addresses.
   */
  async connectWallet(): Promise<Address> {
    const connectedwallets = await this.requestManager.send({
      method: "eth_requestAccounts",
      params: [],
    });

    this.accounts = connectedwallets;
    return connectedwallets;
  }

  /**
   * Revokes permissions for the connected wallet by sending a request to the Ethereum provider.
   *
   * @returns A promise that resolves with the result of revoking permissions.
   */
  async disconnectWallet() {
    try {
      return await this.requestManager.send({
        method: "wallet_revokePermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  /**
   * Switches the wallet to the Gnosis chain by sending a request to add the Gnosis chain to the wallet.
   * The Gnosis chain details include block explorer URLs, icon URLs, native currency information, RPC URLs, chain ID, and chain name.
   */
  async switchToGnosis() {
    await this.requestManager.send({
      method: "wallet_addEthereumChain",
      params: [
        {
          blockExplorerUrls: ["https://blockscout.com/poa/xdai/"],
          iconUrls: [
            "https://xdaichain.com/fake/example/url/xdai.svg",
            "https://xdaichain.com/fake/example/url/xdai.png",
          ],
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

  /**
   * Switches the wallet to the Ethereum Mainnet chain by sending a request to add the Ethereum Mainnet chain to the wallet.
   * The Ethereum Mainnet chain details include block explorer URLs, icon URLs, native currency information, RPC URLs, chain ID, and chain name.
   */
  async switchToEthereum() {
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
          rpcUrls: [
            "https://mainnet.infura.io/v3/",
            "https://eth.llamarpc.com",
          ],
          chainId: "0x1",
          chainName: "Ethereum Mainnet",
        },
      ],
    });
  }

  /**
   * Switches the wallet to the Sepolia Testnet chain by sending a request to add the Sepolia Testnet chain to the wallet.
   * The Sepolia Testnet chain details include block explorer URLs, icon URLs, native currency information, RPC URLs, chain ID, and chain name.
   */
  async switchToSepolia() {
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
          rpcUrls: [
            "https://ethereum-sepolia-rpc.publicnode.com",
            "https://endpoints.omniatech.io/v1/eth/sepolia/public",
            "https://endpoints.omniatech.io/v1/eth/sepolia/public",
          ],
          chainId: "0xAA36A7",
          chainName: "Sepolia Testnet",
        },
      ],
    });
  }

  /**
   * Retrieves the permissions for the connected wallet by sending a request to the Ethereum provider.
   *
   * @returns A promise that resolves with the permissions of the connected wallet.
   */
  async getPermissions() {
    try {
      return await this.requestManager.send({
        method: "wallet_getPermissions",
        params: [],
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Requests permissions for the connected wallet by sending a request to the Ethereum provider.
   * The request includes the method "wallet_requestPermissions" and parameters specifying the permissions needed.
   *
   * @returns A promise that resolves with the result of the permission request.
   */
  async requestPermissions() {
    try {
      return await this.requestManager.send({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Watches an asset by sending a request to the wallet to add the asset for tracking.
   * The asset details include the token address, symbol, decimals, and image URL.
   *
   * @param {Address} tokenAddress The address of the token to be watched.
   * @param {string} symbol The symbol of the token to be watched.
   * @returns A promise that resolves with the result of adding the asset for tracking.
   */
  async watchAsset(tokenAddress: Address, symbol: string) {
    return await this.requestManager.send({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: symbol,
          decimals: 18,
          image: "https://foo.io/token-image.svg",
        },
      },
    });
  }

  /**
   * Retrieves the Ethereum account addresses associated with the connected wallet.
   * Sends a request to the Ethereum provider with the method "eth_accounts" and empty parameters.
   * @returns A promise that resolves with an array of Ethereum account addresses.
   */
  async getAddresses(): Promise<Address> {
    return await this.requestManager.send({
      method: "eth_accounts",
      params: [],
    });
  }
}
