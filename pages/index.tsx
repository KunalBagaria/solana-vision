import { DefaultHead } from '@/layouts/DefaultHead';
import type { NextPage } from 'next';

// Stylesheet Imports
import styles from '@/styles/Home.module.scss';

// Image Imports
import logo from '@/images/logo.svg';
import globe from '@/images/backgrounds/globe.png';

// Component Imports
import { ConnectWallet } from '@/layouts/Wallet';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const { push } = useRouter();

  useEffect(() => {
    if (publicKey) push('/tools')
  }, [])

  return (
    <div className={styles.main}>
      <DefaultHead />
      <img src={logo.src} alt="Solana Vision" />
      <h1 className={styles.headingOne}>Place for small micro tools</h1>
      <h1 className={styles.headingTwo}>By Community. On Solana.</h1>
      <ConnectWallet>
        <button className="connect-wallet">Connect Wallet</button>
      </ConnectWallet>
      <img className={styles.globe} src={globe.src} alt="" />
    </div>
  )
}

export default Home
