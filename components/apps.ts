import mintNFT from '@/images/apps/mint-nft.png';

interface AppInterface {
  name: string;
  description: string;
  image: string;
  link: string;
  button: string;
  gradient: string;
}

const apps = [
  {
    name: "Mint NFT",
    description: "A simple 2-click Image to NFT generator",
    button: "Mint your NFT",
    link: "/mint-nft",
    gradient: "linear-gradient(109.2deg, #62F7EE -3.96%, #6271F7 100.3%)",
    image: mintNFT.src
  },
]

export { apps }
export type { AppInterface };