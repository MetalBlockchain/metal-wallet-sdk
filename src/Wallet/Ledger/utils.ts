import Eth from '@ledgerhq/hw-app-eth';
import Transport from '@ledgerhq/hw-transport';
import { LedgerProviderType, ObsidianProvider } from '@/Wallet/Ledger/provider';
import { ZONDAX_VERSION } from '@/Wallet/Ledger/provider/constants';
import { AddDelegatorTx, AddValidatorTx } from '@metalblockchain/metaljs/dist/apis/platformvm';
import { bintools } from '@/common';
import { avalanche } from '@/Network';
import { BaseTx as AVMBaseTx } from '@metalblockchain/metaljs/dist/apis/avm';
import { BaseTx as PlatformBaseTx } from '@metalblockchain/metaljs/dist/apis/platformvm';
import { EVMBaseTx } from '@metalblockchain/metaljs/dist/apis/evm';
import { UnsignedTx as AVMUnsignedTx } from '@metalblockchain/metaljs/dist/apis/avm/tx';
import { UnsignedTx as PlatformUnsignedTx } from '@metalblockchain/metaljs/dist/apis/platformvm/tx';
import { UnsignedTx as EVMUnsignedTx } from '@metalblockchain/metaljs/dist/apis/evm/tx';

import bip32 from '@/utils/bip32';
import AppObsidian from '@obsidiansystems/hw-app-avalanche';

/**
 *
 * @param xpub Extended public key for m/44'/60'/0'
 * @param index Index of the Eth address
 * @returns Extended public key for m/44'/60'/0'/0/n where `n` is the address index
 */
export function getEthAddressKeyFromAccountKey(xpub: string, index: number) {
    const node = bip32.fromBase58(xpub).derivePath(`0/${index}`);
    return node.toBase58();
}

export function getAppAvax(transport: Transport): AppObsidian {
    return ObsidianProvider.getApp(transport);
}

export function getAppEth(transport: Transport): Eth {
    //@ts-ignore
    return new Eth(transport, 'w0w');
}

export async function getLedgerProvider() {
    const isObsidian = await isObsidianApp();
    return ObsidianProvider;
}

export async function isObsidianApp(): Promise<boolean> {
    return true;
}

/**
 * Returns an array of unique addresses that are found on stake outputs of a tx.
 * @param tx
 */
export function getStakeOutAddresses(tx: AVMBaseTx | PlatformBaseTx | EVMBaseTx) {
    if (tx instanceof AddValidatorTx || tx instanceof AddDelegatorTx) {
        const allAddrs = tx
            .getStakeOuts()
            .map((out) =>
                out
                    .getOutput()
                    .getAddresses()
                    .map((addr) => {
                        return bintools.addressToString(avalanche.getHRP(), 'P', addr);
                    })
            )
            .flat();
        // Remove duplicates
        return [...new Set(allAddrs)];
    }

    return [];
}

export function getOutputAddresses(tx: AVMBaseTx | PlatformBaseTx) {
    const chainID = tx instanceof AVMBaseTx ? 'X' : 'P';
    const outAddrs = tx
        .getOuts()
        .map((out) =>
            out
                .getOutput()
                .getAddresses()
                .map((addr) => {
                    return bintools.addressToString(avalanche.getHRP(), chainID, addr);
                })
        )
        .flat();
    return [...new Set(outAddrs)];
}

/**
 * Returns every output address for the given transaction.
 * @param unsignedTx
 */
export function getTxOutputAddresses<UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx>(
    unsignedTx: UnsignedTx
) {
    if (unsignedTx instanceof EVMUnsignedTx) {
        return [];
    }

    const tx = unsignedTx.getTransaction();
    if (unsignedTx instanceof AVMUnsignedTx) {
        const outAddrs = getOutputAddresses(tx);
        return outAddrs;
    } else if (unsignedTx instanceof PlatformUnsignedTx) {
        const stakeAddrs = getStakeOutAddresses(tx);
        const outAddrs = getOutputAddresses(tx);

        return [...new Set([...stakeAddrs, ...outAddrs])];
    }

    return [];
}
