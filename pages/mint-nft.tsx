import styles from '@/styles/apps/MintNFT.module.scss';

import { NextPage } from 'next';
import { Navbar } from '@/layouts/Navbar';
import { DefaultHead } from '@/layouts/DefaultHead';

const MintNFT: NextPage = () => {
  return (
    <div>
      <DefaultHead title="Mint NFT" />
      <Navbar pageName="Mint NFT" />
      <div className={styles.container}>

        <div className={styles.box}>
          <h1 className={styles.heading}>Mint NFT</h1>
          <p className={styles.description}>A simple 2-click Image to NFT generator</p>

          <div className="mt-1-5">
            <p className={styles.inputLabel}>Enter Name of the NFT</p>
            <input className={styles.input} placeholder="Eg. My first NFT" />
            <p className={styles.inputLabel}>Enter Description about NFT</p>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Eg. This image is of the first computer that I got from my father at age of 10"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default MintNFT;