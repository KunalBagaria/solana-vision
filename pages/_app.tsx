import Router from 'next/router';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import '@/styles/globals.scss';

import '@fontsource/outfit';
import 'typeface-libre-baskerville';

import { Wallet } from '@/layouts/Wallet';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function SolanaVision({ Component, pageProps }: any) {
  return (
    <Wallet>
      <Component {...pageProps} />
    </Wallet>
  );
}

export default SolanaVision;
