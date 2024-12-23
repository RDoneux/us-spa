import { useEffect, useState } from 'react';
import { TimelineEvent } from './EventSlice';
import useAxios from '../../../hooks/useAxios';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';

interface EventProps extends TimelineEvent {
  row: number;
}

export default function Event(event: EventProps) {
  const axios = useAxios();
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      const response: AxiosResponse = await axios.get(
        '/get?filename=' + event.imageUrl,
        { responseType: 'blob' }
      );
      setImageUrl(URL.createObjectURL(response.data));
    };
    fetchImage();
    // eslint-disable-next-line
  }, [event.imageUrl]);

  return (
    <Card
      key={event.id + '_event'}
      style={{ gridRowStart: event.row + 1 }}
      className={`w-full min-h-full self-center ${event.row % 2 === 0 ? 'col-start-1' : 'col-start-5'}`}
    >
      <CardActionArea className="h-full">
        {imageUrl && (
          <CardMedia component="img" src={imageUrl} alt={event.title} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {event.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {event.description}
          </Typography>
          <Typography
            className="text-end"
            variant="subtitle2"
            color="text.secondary"
          >
            {format(new Date(event.date), 'PPPP')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
