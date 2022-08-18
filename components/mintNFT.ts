import {
  clusterApiUrl,
  Connection
} from '@solana/web3.js';
import { actions } from '@metaplex/js';
import { WalletContextState } from '@solana/wallet-adapter-react';

export const mintNFT = async (
  wallet: WalletContextState,
  uri: string
) => {
  if (wallet.publicKey === null) return;
  const connection = new Connection(clusterApiUrl('mainnet-beta'));
  return actions.mintNFT({
    connection,
    // @ts-expect-error
    wallet,
    uri,
    maxSupply: 1
  });
}