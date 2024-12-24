import styles from './Home.module.css';
import Timeline from '../../components/timeline/Timeline';
import { endOfMonth, startOfMonth } from 'date-fns';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import useAxios from '../../hooks/useAxios';

export default function Home() {
  const axios = useAxios();
  const [dateRange, setDateRange] = useState<string[]>([]);

  useEffect(() => {
    async function getRecordRange() {
      const result: AxiosResponse = await axios.get('/events/record-range');
      setDateRange(result.data.reverse());
    }
    getRecordRange();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles['container']}>
      {dateRange.map((date) => (
        <Timeline
          key={date}
          dateFrom={startOfMonth(new Date(date)).toISOString()}
          dateTo={endOfMonth(new Date(date)).toISOString()}
        />
      ))}
    </div>
  );
}
