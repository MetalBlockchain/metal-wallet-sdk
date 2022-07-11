import { NetworkConfig } from './types';
import { Defaults } from 'avalanche/dist/utils';
import { getRpcC, getRpcP, getRpcX } from './helpers/rpcFromConfig';

export const MainnetConfig: NetworkConfig = {
    rawUrl: 'https://bd5afdaa6ab3.ngrok.io',
    apiProtocol: 'https',
    apiIp: 'bd5afdaa6ab3.ngrok.io',
    apiPort: 443,
    explorerURL: 'https://explorerapi.avax.network',
    explorerSiteURL: 'https://explorer.avax.network',
    networkID: 1191772,
    // @ts-ignore
    xChainID: Defaults.network[1191772]['X']['blockchainID'],
    // @ts-ignore
    pChainID: Defaults.network[1191772]['P']['blockchainID'],
    // @ts-ignore
    cChainID: Defaults.network[1191772]['C']['blockchainID'],
    // @ts-ignore
    evmChainID: Defaults.network[1191772]['C']['chainID'],
    // @ts-ignore
    avaxID: Defaults.network[1191772]['X']['avaxAssetID'],
    get rpcUrl() {
        return {
            c: getRpcC(this),
            p: getRpcP(this),
            x: getRpcX(this),
        };
    },
};

export const TestnetConfig: NetworkConfig = {
    rawUrl: 'https://875d697ced30.ngrok.io',
    apiProtocol: 'https',
    apiIp: '875d697ced30.ngrok.io',
    apiPort: 443,
    explorerURL: 'https://explorerapi.avax-test.network',
    explorerSiteURL: 'https://explorer.avax-test.network',
    networkID: 1191773,
    // @ts-ignore
    xChainID: Defaults.network[1191773]['X']['blockchainID'],
    // @ts-ignore
    pChainID: Defaults.network[1191773]['P']['blockchainID'],
    // @ts-ignore
    cChainID: Defaults.network[1191773]['C']['blockchainID'],
    // @ts-ignore
    evmChainID: Defaults.network[1191773]['C']['chainID'],
    // @ts-ignore
    avaxID: Defaults.network[1191773]['X']['avaxAssetID'],
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
