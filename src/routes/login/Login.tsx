import { Button, FormControl, TextField } from '@mui/material';
import { AxiosResponse, isAxiosError } from 'axios';
import { useState } from 'react';
import axiosInstance from '../../../axios';
import { save } from '../../services/LocalStorageService';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();

    const credentials = btoa(`${username}:${password}`);

    try {
      const response: AxiosResponse = await axiosInstance.post(
        '/login',
        {},
        {
          headers: { Authorization: `Basic ${credentials}` }
        }
      );
      save('access_token', response.data.accessToken);
      save('refresh_token', response.data.refreshToken);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        noValidate
        onSubmit={submit}
        className="w-[450px] flex flex-col gap-4 p-5"
      >
        <FormControl variant="standard" className="gap-2">
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormControl>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
}
