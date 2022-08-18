import toast from 'react-hot-toast';
import Bundlr from '@bundlr-network/client';
import { BUNDLR_MAINNET_ENDPOINT } from '@/components/constants';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { getBundlrBalance } from './getBundlrBalance';
import { clusterApiUrl } from '@solana/web3.js';


interface Metadata {
  name: string;
  description: string;
  image: string;
}

const getMetadata = (
  metadata: Metadata,
  wallet: WalletContextState
) => {
  return {
    name: metadata.name,
    description: metadata.description,
    image: metadata.image,
    symbol: "SVNFT",
    seller_fee_basis_points: 0,
    attributes: [],
    category: "image",
    properties: {
      files: [],
      creators: [
        {
          address: wallet.publicKey?.toBase58(),
          verified: true,
          share: 100
        }
      ]
    }
  }
}

export const uploadBundlr = async (
  wallet: WalletContextState,
  image?: File,
  metadata?: Metadata,
) => {
  if (!metadata) toast.loading('Uploading Image');
  const tags = [];
  const extension = image ? image.name.split('.').pop() : '';
  const type = extension === 'jpg' ? 'jpeg' : extension;

  if (!metadata) {
    tags.push({ name: "Content-Type", value: `image/${type}` })
  } else {
    tags.push({ name: "Content-Type", value: "application/json" })
  }

  const bundlr = new Bundlr(
    BUNDLR_MAINNET_ENDPOINT,
    'solana',
    wallet,
    {
      timeout: 60000,
      providerUrl: clusterApiUrl('mainnet-beta'),
    },
  );

  const metadataObject = metadata ? getMetadata(metadata, wallet) : null;
  const metadataString = JSON.stringify(metadataObject);

  let size = 0;

  if (image) size = image.size;
  if (metadata) new Blob([metadataString]).size;

  console.log('Byte Size', size);

  const price = await bundlr.getPrice(size);
  console.log('Price', price);

  const minimumFunds = price.multipliedBy(3);
  console.log('Minimum Funds', minimumFunds);

  let skipFund = false;

  if (wallet.publicKey) {
    const currentBalance = await getBundlrBalance(wallet.publicKey.toBase58());
    console.log('Current Balance', currentBalance);
    if (!currentBalance.lt(minimumFunds)) skipFund = true;
  }

  if (!skipFund) {
    toast.dismiss();
    toast.loading('Funding Bundlr for upload');
    const toFundAmount = price.multipliedBy(50);
    console.log(`Funding: ${toFundAmount}`);
    try {
      await bundlr.fund(toFundAmount);
    }
    catch (e) {
      console.log(e);
      toast.dismiss();
      toast.error('Sorry, we were not able to fund the upload');
      return;
    }
  }

  let transaction;
  if (image) {
    const file = new Uint8Array(await image.arrayBuffer());
    transaction = bundlr.createTransaction(file, { tags });
  } else {
    transaction = bundlr.createTransaction(metadataString, { tags });
  }

  await transaction.sign();
  await transaction.upload();
  const id = transaction.id;

  if (!id) {
    toast.dismiss();
    toast.error('Error uploading image/metadata');
    return;
  }
  const url = 'https://arweave.net/' + id;
  toast.dismiss();
  if (!metadata) toast.success('Image stored permanently');
  return url;
};


