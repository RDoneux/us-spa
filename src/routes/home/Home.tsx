import styles from './Home.module.css';
import Timeline from '../../components/timeline/Timeline';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';

export default function Home() {
  return (
    <div className={styles['container']}>
      <Timeline
        dateFrom={startOfMonth(new Date()).toISOString()}
        dateTo={endOfMonth(new Date()).toISOString()}
      />

      <Timeline
        dateFrom={subMonths(startOfMonth(new Date()), 1).toISOString()}
        dateTo={subMonths(endOfMonth(new Date()), 1).toISOString()}
      />
    </div>
  );
}
