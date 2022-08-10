import type { NextPage } from 'next';
import { DefaultHead } from '@/layouts/DefaultHead';

// Stylesheet Imports
import styles from '@/styles/Dashboard.module.scss';

// Component Imports
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar } from '@/layouts/Navbar';

const Dashboard: NextPage = () => {
  const { push } = useRouter();
  const { publicKey } = useWallet();
  return (
    <div>
      <DefaultHead />
      <Navbar pageName="Dashboard" />
    </div>
  );
}

export default Dashboard;
