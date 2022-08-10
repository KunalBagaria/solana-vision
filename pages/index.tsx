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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const { push } = useRouter();

  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked && publicKey) push('/dashboard')
  }, [clicked, publicKey])

  return (
    <div className={styles.main}>
      <DefaultHead />
      <img className={styles.logo} src={logo.src} alt="Solana Vision" />
      <h1 className={styles.headingOne}>Place for small micro tools</h1>
      <h1 className={styles.headingTwo}>By Community. On Solana.</h1>
      <ConnectWallet>
        <button
          onClick={() => setClicked(true)}
          className="connect-wallet mt-1"
        >
          Connect Wallet
        </button>
      </ConnectWallet>
      <img className={styles.globe} src={globe.src} alt="" />
    </div>
  );
}

export default Home
