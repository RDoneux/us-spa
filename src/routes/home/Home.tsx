import styles from './Home.module.css';

const US_IMAGE_SERVICE_URL = process.env.US_IMAGE_SERVICE_URL;

export default function Home() {
  return (
    <div className={styles['container']}>
      <h1>TPLT | WEB SPA</h1>
      <img src={US_IMAGE_SERVICE_URL + '?filename=17dc60cd-bd8a-4268-85ef-4eff3ab77220'} />
      
    </div>
  );
}
