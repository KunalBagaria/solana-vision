import mintNFT from '@/images/apps/mint-nft.png';
import uploadImage from '@/images/apps/upload.png';

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
  }
]

export { apps }
export type { AppInterface };