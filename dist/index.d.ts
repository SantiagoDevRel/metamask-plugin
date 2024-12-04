import { type Address, Web3PluginBase } from "web3";
/**
 * Class representing a Metamask plugin that extends Web3PluginBase.
 * Manages wallet connection, disconnection, chain switching, permission requests, asset tracking, and address retrieval.
 */
export declare class MetamaskPlugin extends Web3PluginBase {
    pluginNamespace: string;
    accounts: never[];
    truncateAddress: (address: Address) => string;
    /**
     * Connects the wallet by sending a request to the Ethereum provider to connect the user's wallet.
     * Updates the 'accounts' property with the connected wallet addresses.
     * @returns A promise that resolves with the connected wallet addresses.
     */
    connectWallet(): Promise<Address>;
    /**
     * Revokes permissions for the connected wallet by sending a request to the Ethereum provider.
     *
     * @returns A promise that resolves with the result of revoking permissions.
     */
    disconnectWallet(): Promise<any>;
    /**
     * Switches the wallet to the Gnosis chain by sending a request to add the Gnosis chain to the wallet.
     * The Gnosis chain details include block explorer URLs, icon URLs, native currency information, RPC URLs, chain ID, and chain name.
     */
    switchToGnosis(): Promise<void>;
    /**
     * Switches the wallet to the Ethereum Mainnet chain by sending a request to add the Ethereum Mainnet chain to the wallet.
     * The Ethereum Mainnet chain details include block explorer URLs, icon URLs, native currency information, RPC URLs, chain ID, and chain name.
     */
    switchToEthereum(): Promise<void>;
    /**
     * Switches the wallet to the Sepolia Testnet chain by sending a request to add the Sepolia Testnet chain to the wallet.
     * The Sepolia Testnet chain details include block explorer URLs, icon URLs, native currency information, RPC URLs, chain ID, and chain name.
     */
    switchToSepolia(): Promise<void>;
    /**
     * Retrieves the permissions for the connected wallet by sending a request to the Ethereum provider.
     *
     * @returns A promise that resolves with the permissions of the connected wallet.
     */
    getPermissions(): Promise<any>;
    /**
     * Requests permissions for the connected wallet by sending a request to the Ethereum provider.
     * The request includes the method "wallet_requestPermissions" and parameters specifying the permissions needed.
     *
     * @returns A promise that resolves with the result of the permission request.
     */
    requestPermissions(): Promise<any>;
    /**
     * Watches an asset by sending a request to the wallet to add the asset for tracking.
     * The asset details include the token address, symbol, decimals, and image URL.
     *
     * @param {Address} tokenAddress The address of the token to be watched.
     * @param {string} symbol The symbol of the token to be watched.
     * @returns A promise that resolves with the result of adding the asset for tracking.
     */
    watchAsset(tokenAddress: Address, symbol: string): Promise<any>;
    /**
     * Retrieves the Ethereum account addresses associated with the connected wallet.
     * Sends a request to the Ethereum provider with the method "eth_accounts" and empty parameters.
     * @returns A promise that resolves with an array of Ethereum account addresses.
     */
    getAddresses(): Promise<Address>;
}
