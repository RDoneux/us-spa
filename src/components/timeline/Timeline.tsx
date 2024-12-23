import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents, TimelineEvent } from './fragments/EventSlice';
import Event from './fragments/Event';
import { RootState } from '../../store';
import { format } from 'date-fns';
import { convertSpecificDateToDateWindow } from '../../services/Utils';

interface TimelineProps {
  dateFrom: string;
  dateTo: string;
}

export default function Timeline({ dateFrom, dateTo }: TimelineProps) {
  const axios = useAxios();

  const reduxDispatch = useDispatch();
  const eventsState = useSelector((state: RootState) => state.events);

  const dateWindow = convertSpecificDateToDateWindow(dateFrom);

  useEffect(() => {
    console.log(dateFrom, dateTo);

    const fetchTimeline = async () => {
      const response: AxiosResponse = await axios.get(
        `/events/range?dateFrom=${dateFrom}&dateTo=${dateTo}`
      );
      reduxDispatch(
        setEvents({
          [dateWindow]: response.data
        })
      );
    };
    fetchTimeline();
    // eslint-disable-next-line
  }, []);

  return (
    <section
      className={`relative grid grid-cols-[0.4fr_0.1fr_50px_0.1fr_0.4fr] grid-auto-rows-auto gap-y-8 w-full p-5`}
    >
      <h1 className="row-start-1 col-start-1 col-span-5 text-2xl font-bold">
        {format(new Date(dateFrom), 'PPP')} - {format(new Date(dateTo), 'PPP')}
      </h1>
      <div
        style={{ gridRow: `2 / ${eventsState.events[dateWindow]?.length + 2}` }}
        className="h-full justify-self-center w-[1px] col-start-3 bg-gray-300 row-span-full"
      ></div>
      {eventsState.events[dateWindow]?.map(
        (event: TimelineEvent, index: number) => (
          <>
            <div
              key={event.id + '_dot'}
              style={{ gridRowStart: index + 2 }}
              className={`col-start-3 col-span-1 h-[50px] w-[50px] self-center rounded-full bg-[#242424] border-neutral-400 border`}
            ></div>
            <Event {...event} row={index + 1} />
            <div
              key={event.id + '_line'}
              style={{ gridRowStart: index + 2 }}
              className={`w-full h-[1px] bg-gray-300 self-center ${index % 2 === 0 ? 'col-start-4' : 'col-start-2'}`}
            ></div>
          </>
        )
      )}
    </section>
  );
}
