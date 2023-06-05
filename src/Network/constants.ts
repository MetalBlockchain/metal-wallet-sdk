import { NetworkConfig } from './types';
import { Defaults } from '@metalblockchain/metaljs/dist/utils';
import { getRpcC, getRpcP, getRpcX } from './helpers/rpcFromConfig';

export const MainnetConfig: NetworkConfig = {
    rawUrl: 'https://api.metalblockchain.org',
    apiProtocol: 'https',
    apiIp: 'api.metalblockchain.org',
    apiPort: 443,
    explorerURL: 'https://explorerapi.metalblockchain.org',
    explorerSiteURL: 'https://explorer.metalblockchain.org',
    networkID: 1,
    // @ts-ignore
    xChainID: Defaults.network[1]['X']['blockchainID'],
    // @ts-ignore
    pChainID: Defaults.network[1]['P']['blockchainID'],
    // @ts-ignore
    cChainID: Defaults.network[1]['C']['blockchainID'],
    // @ts-ignore
    evmChainID: Defaults.network[1]['C']['chainID'],
    // @ts-ignore
    avaxID: Defaults.network[1]['X']['avaxAssetID'],
    get rpcUrl() {
        return {
            c: getRpcC(this),
            p: getRpcP(this),
            x: getRpcX(this),
        };
    },
};

export const TestnetConfig: NetworkConfig = {
    rawUrl: 'https://tahoe.metalblockchain.org',
    apiProtocol: 'https',
    apiIp: 'tahoe.metalblockchain.org',
    apiPort: 443,
    explorerURL: 'https://testnet-explorerapi.metalblockchain.org',
    explorerSiteURL: 'https://explorer.avax-test.network',
    networkID: 5,
    // @ts-ignore
    xChainID: Defaults.network[5]['X']['blockchainID'],
    // @ts-ignore
    pChainID: Defaults.network[5]['P']['blockchainID'],
    // @ts-ignore
    cChainID: Defaults.network[5]['C']['blockchainID'],
    // @ts-ignore
    evmChainID: Defaults.network[5]['C']['chainID'],
    // @ts-ignore
    avaxID: Defaults.network[5]['X']['avaxAssetID'],
    get rpcUrl() {
        return {
            c: getRpcC(this),
            p: getRpcP(this),
            x: getRpcX(this),
        };
    },
};

export const LocalnetConfig: NetworkConfig = {
    rawUrl: 'http://localhost:9650',
    apiProtocol: 'http',
    apiIp: 'localhost',
    apiPort: 9650,
    networkID: 12345,
    // @ts-ignore
    xChainID: Defaults.network[12345]['X']['blockchainID'],
    // @ts-ignore
    pChainID: Defaults.network[12345]['P']['blockchainID'],
    // @ts-ignore
    cChainID: Defaults.network[12345]['C']['blockchainID'],
    // @ts-ignore
    evmChainID: Defaults.network[12345]['C']['chainID'],
    // @ts-ignore
    avaxID: Defaults.network[12345]['X']['avaxAssetID'],
    get rpcUrl() {
        return {
            c: getRpcC(this),
            p: getRpcP(this),
            x: getRpcX(this),
        };
    },
};

// Default network connection
export const DefaultConfig = MainnetConfig;
