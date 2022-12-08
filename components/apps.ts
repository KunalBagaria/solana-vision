import mintNFT from '@/images/apps/mint-nft.png';
import uploadImage from '@/images/apps/upload.png';
import solanaImage from '@/images/apps/solana.png';

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
    gradient: "linear-gradient(109.2deg, #C762F7 -3.96%, #F76262 100.3%)",
    image: mintNFT.src
  },
  {
    name: "Upload Image",
    description: "Easily upload and share large images",
    button: "Upload your Image",
    link: "/upload-image",
    gradient: "linear-gradient(109.2deg, #62F7EE -3.96%, #6271F7 100.3%)",
    image: uploadImage.src
  },
  {
    name: "Resolve SOL Domain",
    description: "Find out the owner of a .SOL Domain",
    button: "Resolve a domain",
    link: "/sol-domain-owner",
    gradient: "linear-gradient(109.2deg, #F762F1 -3.96%, #7762F7 100.3%)",
    image: solanaImage.src
  }
]

export { apps }
export type { AppInterface };