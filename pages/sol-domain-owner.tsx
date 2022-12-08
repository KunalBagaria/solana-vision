import toast from 'react-hot-toast';
import styles from '@/styles/apps/Index.module.scss';
import { useState } from 'react';
import { NextPage } from 'next';
import { Navbar } from '@/layouts/Navbar';
import { DefaultHead } from '@/layouts/DefaultHead';
import { getDomainOwner } from '@/components/domain';


const ResolveDomain: NextPage = () => {
  const [domain, setDomain] = useState('');
  const [owner, setOwner] = useState('');

  async function handleClick() {
    if (!domain.includes('.sol')) {
      toast.error('Please enter a valid .sol domain');
      return;
    }
    const owner_request = getDomainOwner(domain);
    toast.promise(owner_request, {
      loading: 'Resolving domain...',
      success: 'Domain resolved successfully',
      error: 'Domain is not registered',
    });
    const _owner = await owner_request;
    console.log(_owner);
    setOwner(_owner);
  }

  return (
    <div>
      <DefaultHead title="Resolve SOL Domain" />
      <Navbar pageName="Resolve SOL Domain" />
      <div className={styles.container}>
        <div className={styles.uploadBox}>
          <div>
            <h1 className={styles.heading}>Resolve SOL Domain</h1>
            <p className={styles.description}>Find out the owner of a .SOL Domain</p>
            <div className="mt-1">
              <p className={styles.inputLabel}>Enter the domain to resolve</p>
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className={styles.input}
                placeholder="Eg. shaq.sol"
              />
            </div>
            {owner && (
              <div className="mt-1">
                <p className={styles.description}>Domain Owner:
                  <a
                    href={`https://explorer.solana.com/address/${owner}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className='ml-0-5'
                  >
                    {owner}
                  </a>
                </p>
              </div>
            )}
            <div className={owner ? "mt-1" : "mt-2"}>
              <button
                onClick={handleClick}
                className="default-btn"
              >
                Resolve Domain
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResolveDomain;