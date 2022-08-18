import { BUNDLR_MAINNET_ENDPOINT } from './constants';
import BigNumber from 'bignumber.js';

export async function getBundlrBalance (
  public_key: string
) {
  try {
    const request = await fetch(BUNDLR_MAINNET_ENDPOINT + '/account/balance/solana?address=' + public_key);
    const response = await request.json();
    const balance = new BigNumber(response.balance);
    return balance;
  } catch (e) {
    console.error(e);
    return new BigNumber(0);
  }
};