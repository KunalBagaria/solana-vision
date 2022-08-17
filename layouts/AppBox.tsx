import Link from 'next/link';
import styles from '@/styles/Dashboard.module.scss';
import addAppImage from '@/images/add-app.png';

import { AppInterface } from '@/components/apps';

function ParentBox({
  children,
  color
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div className={styles.appBox} style={{
      backgroundColor: color
    }}>
      {children}
    </div>
  )
}

function AppBox(data: AppInterface) {
  return (
    <ParentBox color="white">
      <div className={styles.appBoxContent}>
        <div
          style={{ background: data.gradient }}
          className={styles.appBoxHeader}
        >
          <img src={data.image} alt={data.name} />
        </div>
        <div className={styles.appBoxBody}>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <Link href={data.link}>
            <a>
              <button>{data.button}</button>
            </a>
          </Link>
        </div>
      </div>
    </ParentBox>
  )
}

function AddAppBox() {
  return (
    <ParentBox color="black">
      <div className={styles.addApp}>
        <div>
          <div className={styles.addAppImage}>
            <img src={addAppImage.src} alt="Add App" />
          </div>
          <p className={styles.addHeading}>Wanna add a product here?</p>
          <p className={styles.addDescription}>This is a community based project and you can earn a side revenue by adding a product</p>
        </div>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/KunalBagaria/solana-vision"
        >
          <button>Learn More</button>
        </a>
      </div>
    </ParentBox>
  )
}

export { ParentBox, AppBox, AddAppBox };