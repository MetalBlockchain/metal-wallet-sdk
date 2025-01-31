import { calculatePlatformImportFee } from '@/helpers/tx_helper';
import { avalanche } from '@/Network';
import BN from 'bn.js';

jest.mock('@/Network/network', () => {
    return {
        pChain: {
            getAVAXAssetID: jest.fn().mockReturnValue(Buffer.from("f1839d59792aa7dffc46738332c0390003418b0a9be9fd25ac71e178da5fc301", "hex")),
            getFeeConfig: jest.fn().mockReturnValue({ weights: [ 1, 1000, 1000, 4], maxCapacity: 1000000, maxPerSecond: 100000, targetPerSecond: 500000, minPrice: 1, excessConversionConstant: 2164043 }),
            getFeeState: jest.fn().mockReturnValue({ price: 1 })
        },
        avalanche: {
            getNetworkID: jest.fn().mockReturnValue(1),
            getHRP: jest.fn().mockReturnValue("metal"),
        }
    };
});

describe('txHelper', () => {
    it('calculatePlatformImportFee', async () => {
        //@ts-ignore
        const fee = await calculatePlatformImportFee();
        expect(fee.toString(10)).toEqual("4135");
    });
});