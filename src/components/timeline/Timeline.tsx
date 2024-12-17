import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

export default function Timeline() {
  const [events, setEvents] = useState();
  const axios = useAxios();

  useEffect(() => {
    const fetchTimeline = async () => {
      const response: AxiosResponse = await axios.get(
        '/events?dateFrom=2025-02-04T07:18:48&itemNumber=10'
      );
      setEvents(response.data);
    };
    fetchTimeline();
  }, []);

  return <p>{JSON.stringify(events)}</p>;
}
