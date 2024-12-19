import styles from './Home.module.css';
import Timeline from '../../components/timeline/Timeline';

export default function Home() {
  return (
    <div className={styles['container']}>
      <Timeline />
    </div>
  );
}
