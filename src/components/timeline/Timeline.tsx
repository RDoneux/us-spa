import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents, TimelineEvent } from './fragments/EventSlice';
import Event from './fragments/Event';
import { RootState } from '../../store';
import { format } from 'date-fns';
import { convertSpecificDateToDateWindow } from '../../services/Utils';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { PuffLoader } from 'react-spinners';

interface TimelineProps {
  dateFrom: string;
  dateTo: string;
}

export default function Timeline({ dateFrom, dateTo }: TimelineProps) {
  const axios = useAxios();

  const reduxDispatch = useDispatch();
  const eventsState = useSelector((state: RootState) => state.events);

  const dateWindow = convertSpecificDateToDateWindow(dateFrom);
  const { ref, isIntersecting } = useIntersectionObserver();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
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
    if (isIntersecting) {
      fetchTimeline();
    }
    // eslint-disable-next-line
  }, [isIntersecting]);

  useEffect(() => {
    if (eventsState.events[dateWindow]?.length) {
      setHasFetched(true);
    }
  }, [eventsState.events, dateWindow]);

  return (
    <section
      ref={ref}
      className={`relative grid grid-cols-[0.4fr_0.1fr_50px_0.1fr_0.4fr] grid-auto-rows-auto gap-y-8 w-full p-5 min-h-[400px]`}
    >
      {hasFetched ? (
        <>
          <h1 className="row-start-1 col-start-1 col-span-5 text-2xl font-bold text-center my-5">
            {format(new Date(dateFrom), 'PPP')} -{' '}
            {format(new Date(dateTo), 'PPP')}
          </h1>
          <div
            style={{
              gridRow: `2 / ${eventsState.events[dateWindow]?.length + 2}`
            }}
            className="h-full justify-self-center w-[1px] col-start-3 bg-gray-300 row-span-full"
          ></div>

          {(isIntersecting || hasFetched) &&
            eventsState.events[dateWindow]?.map(
              (event: TimelineEvent, index: number) => (
                <>
                  <div
                    key={event.id + '_dot'}
                    style={{ gridRowStart: index + 2 }}
                    className={`col-start-3 col-span-1 h-[50px] w-[50px] self-center rounded-full bg-[#242424] border-neutral-400 border flex justify-center items-center`}
                  >
                    {format(new Date(event.date), 'd')}
                  </div>
                  <Event {...event} row={index + 1} />
                  <div
                    key={event.id + '_line'}
                    style={{ gridRowStart: index + 2 }}
                    className={`w-full h-[1px] bg-gray-300 self-center ${index % 2 === 0 ? 'col-start-4' : 'col-start-2'}`}
                  ></div>
                </>
              )
            )}
        </>
      ) : (
        <div className="w-full flex justify-center items-center col-span-5 self-start">
          <PuffLoader color="orange" />
        </div>
      )}
    </section>
  );
}
