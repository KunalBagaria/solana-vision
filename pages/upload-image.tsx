import styles from '@/styles/apps/Index.module.scss';

import uploadImage from '@/images/elements/upload-image.svg';

import { useRef, useState } from 'react';

import { NextPage } from 'next';
import { Navbar } from '@/layouts/Navbar';
import { DefaultHead } from '@/layouts/DefaultHead';
import { useWallet } from '@solana/wallet-adapter-react';
import { uploadBundlr } from '@/components/upload';


const MintNFT: NextPage = () => {
  const wallet = useWallet();
  const fileInputRef = useRef(null);

  const [image, setImage] = useState('');

  return (
    <div>
      <DefaultHead title="Upload Image" />
      <Navbar pageName="Upload Image" />
      <div className={styles.container}>
        <div className={styles.uploadBox}>

          <div>
            <h1 className={styles.heading}>Upload Image</h1>
            <p className={styles.description}>Share large images easily on the permaweb!</p>
            <div
              className="mt-1-5 mb-1 pointer"
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
                src={uploadImage.src}
                className={styles.inputImage}
                alt="Upload Image"
              />
            </div>
            {image && (
              <a
                className={styles.imageLink}
                target="_blank"
                rel="noopener noreferrer"
                href={image}
              >
                View Image
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default MintNFT;