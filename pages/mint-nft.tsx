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
        </div>

      </div>
    </div>
  );
}

export default MintNFT;