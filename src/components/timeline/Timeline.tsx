import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents, TimelineEvent } from './fragments/EventSlice';
import Event from './fragments/Event';
import { RootState } from '../../store';

export default function Timeline() {
  const axios = useAxios();

  const reduxDispatch = useDispatch();
  const eventsState = useSelector((state: RootState) => state.events);

  useEffect(() => {
    const fetchTimeline = async () => {
      const response: AxiosResponse = await axios.get(
        '/events?dateFrom=2025-02-04T07:18:48&itemNumber=10'
      );
      console.log(response.data);
      reduxDispatch(setEvents(response.data.events));
    };
    fetchTimeline();
    // eslint-disable-next-line
  }, []);

  return (
    <section
      className={`relative grid grid-cols-[0.4fr_0.1fr_50px_0.1fr_0.4fr] grid-auto-rows-auto gap-y-8 w-full p-5`}
    >
      <div
        style={{ gridRow: `1 / ${eventsState.events.length + 1}` }}
        className="h-full justify-self-center w-[1px] col-start-3 bg-gray-300 row-span-full"
      ></div>
      {eventsState.events.map((event: TimelineEvent, index: number) => (
        <>
          <div
            key={event.id}
            style={{ gridRowStart: index + 1 }}
            className={`col-start-3 col-span-1 h-[50px] w-[50px] self-center rounded-full bg-gray-300`}
          ></div>
          <Event key={event.id} {...event} row={index} />
          <div
            style={{ gridRowStart: index + 1 }}
            className={`w-full h-[1px] bg-gray-300 self-center ${index % 2 === 0 ? 'col-start-2' : 'col-start-4'}`}
          ></div>
        </>
      ))}
    </section>
  );
}
