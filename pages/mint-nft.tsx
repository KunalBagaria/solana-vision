import toast from 'react-hot-toast';
import styles from '@/styles/apps/MintNFT.module.scss';

import uploadImage from '@/images/elements/upload-image.svg';

import { useState, useRef } from 'react';

import { NextPage } from 'next';
import { Navbar } from '@/layouts/Navbar';
import { DefaultHead } from '@/layouts/DefaultHead';
import { useWallet } from '@solana/wallet-adapter-react';
import { uploadBundlr } from '@/components/upload';
import { mintNFT } from '@/components/mintNFT';

const MintNFT: NextPage = () => {
  const wallet = useWallet();
  const fileInputRef = useRef(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleMint = async () => {
    toast.loading('Minting NFT...');
    if (!wallet || !name || !description || !image) {
      toast.error('Please fill out all fields');
      return;
    };
    const metadataURI = await uploadBundlr(wallet, undefined, {
      name,
      description,
      image,
    });
    if (!metadataURI) {
      toast.error('Failed to upload NFT metadata');
      return;
    }
    const tx = await mintNFT(wallet, metadataURI);
    if (tx) {
      window.open(tx.txId, '_blank');
    }
  }

  return (
    <div>
      <DefaultHead title="Mint NFT" />
      <Navbar pageName="Mint NFT" />
      <div className={styles.container}>
        <div className={styles.box}>

          <div>
            <h1 className={styles.heading}>Mint NFT</h1>
            <p className={styles.description}>A simple 2-click Image to NFT generator</p>
            <div className="mt-1">
              <p className={styles.inputLabel}>Enter Name of the NFT</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Eg. My first NFT"
              />
            </div>
            <div className="mt-1-5">
              <p className={styles.inputLabel}>Enter Description about NFT</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Eg. This image is of the first computer that I got from my father at age of 10"
              />
            </div>

            <div
              className="mt-1-5 pointer"
              // @ts-expect-error
              onClick={() => fileInputRef?.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/gif"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = await uploadBundlr(wallet, file);
                  if (url) setImage(url);
                }}
              />
              <img
                src={image ? image : uploadImage.src}
                className={styles.inputImage}
                alt="Upload Image"
              />
            </div>

          </div>

          <button
            onClick={handleMint}
            className="default-btn"
          >
            Mint NFT
          </button>

        </div>
      </div>
    </div>
  );
}

export default MintNFT;