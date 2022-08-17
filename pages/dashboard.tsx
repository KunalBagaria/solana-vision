import type { NextPage } from 'next';
import { DefaultHead } from '@/layouts/DefaultHead';

// Stylesheet Imports
import styles from '@/styles/Dashboard.module.scss';

// Component Imports
import { Navbar } from '@/layouts/Navbar';
import { AddAppBox, AppBox } from '@/layouts/AppBox';
import { apps } from '@/components/apps';

const Dashboard: NextPage = () => {
  return (
    <div>
      <DefaultHead />
      <Navbar pageName="Dashboard" />
      <div className={styles.container}>
        <div className={styles.appGrid}>
          {apps.map((app, index) => (
            <AppBox key={index} {...app} />
          ))}
          <AddAppBox />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
