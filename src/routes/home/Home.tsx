import styles from './Home.module.css';
import Timeline from '../../components/timeline/Timeline';
import { addMonths, endOfMonth, isBefore, startOfMonth } from 'date-fns';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import useAxios from '../../hooks/useAxios';

export default function Home() {
  const axios = useAxios();
  const [dateRange, setDateRange] = useState<string[]>([]);

  useEffect(() => {
    async function getRecordRange() {
      const result: AxiosResponse = await axios.get('/events/record-range');
      const { startDate, endDate } = result.data;

      setDateRange(generateDateRange(new Date(startDate), new Date(endDate)));
    }
    getRecordRange();
    // eslint-disable-next-line
  }, []);

  function generateDateRange(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    let currentDate = startDate;

    while (
      isBefore(currentDate, endDate) ||
      currentDate.getMonth() === endDate.getMonth()
    ) {
      dates.push(currentDate.toISOString());
      currentDate = addMonths(currentDate, 1);
    }

    return dates;
  }

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
