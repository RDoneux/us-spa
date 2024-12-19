import { Box, Button, TextField, Modal, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import { addEvent } from '../timeline/fragments/EventSlice';
import useAxios from '../../hooks/useAxios';
import { AxiosResponse } from 'axios';

export default function AddEventButton() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [file, setFile] = useState<File | null>(null);

  const reduxDispatch = useDispatch();
  const axios = useAxios();

  function showAddEventModal(event: MouseEvent) {
    event.preventDefault();
    setShowModal(true);
  }

  async function handleEventCreation(event: MouseEvent) {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date?.toISOString() || '');
    formData.append('file', file);
    formData.append('iconUrl', 'https://via.placeholder.com/50');

    const response: AxiosResponse = await axios.post('/events', formData);

    reduxDispatch(addEvent(response.data));
    setShowModal(false);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }

  return (
    <>
      <Button
        className="col-start-3"
        variant="contained"
        onClick={showAddEventModal}
      >
        Add Event
      </Button>

      <Modal
        className="flex items-center justify-center"
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="w-1/3 h-fit p-4 bg-neutral-800 shadow-md shadow-black rounded flex flex-col gap-y-5">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            CREATE EVENT
          </Typography>
          <TextField
            className="w-full"
            variant="standard"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            className="w-full"
            variant="standard"
            label="Description"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              className="w-full"
              defaultValue={new Date()}
              value={date}
              onChange={(e) => setDate(e)}
            />
          </LocalizationProvider>

          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <Button
            className="w-full"
            variant="contained"
            onClick={handleEventCreation}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </>
  );
}
