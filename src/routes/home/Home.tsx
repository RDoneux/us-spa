import styles from './Home.module.css';

const GATEWAY_SERVICE = import.meta.env.VITE_AUTH_SERVICE;

export default function Home() {
  return (
    <div className={styles['container']}>
      <h1>TPLT | WEB SPA</h1>
      <img
        style={{ width: '250px' }}
        src={
          GATEWAY_SERVICE + '/get?filename=33f27c10-be7c-433f-a13e-1131c2e65c27'
        }
      />
    </div>
  );
}
