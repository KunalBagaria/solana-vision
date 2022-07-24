import { DEFAULT_OG_IMAGE } from '@/lib/config/constants';
import Head from 'next/head';

interface SEO {
  title?: string;
  description?: string;
  image?: string;
  creator?: string;
  app_name?: string;
  url?: string;
}

export const DefaultHead = (config: SEO) => {
  return (
    <Head>
      <title>{config.title || 'Solana Vision'}</title>
      <meta name='description' content={config.description || 'All-in-one dApp for useful tools on Solana. Built by the community.'} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name="theme-color" content="white" />
      <link rel='icon' href='/favicon.png' />

      {config.creator && (
        <meta name='author' content={config.creator} />
      )}

      {config.app_name && (
        <meta name='og:site_name' content={config.app_name} />
      )}

      <meta property='og:type' content={'website'} />
      <meta property='og:url' content={config.url || 'https://solanavision.app'} />
      <meta property='og:title' content={config.title || 'Solana Vision'} />
      <meta property='og:description' content={config.description || 'All-in-one dApp for useful tools on Solana. Built by the community.'} />
      <meta property='og:image' content={config.image || DEFAULT_OG_IMAGE} />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={config.url || 'https://solanavision.app'} />
      <meta property='twitter:title' content={config.title || 'Solana Vision'} />
      <meta property='twitter:description' content={config.description || 'All-in-one dApp for useful tools on Solana. Built by the community.'} />
      <meta property='twitter:image' content={config.image || DEFAULT_OG_IMAGE} />
    </Head>
  );
};
