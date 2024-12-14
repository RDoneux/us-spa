import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import axiosInstance from '../../../axios';
import { AxiosResponse } from 'axios';

export default function Home() {
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      const response: AxiosResponse = await axiosInstance.get(
        '/get?filename=879b17d0-e738-43cc-87bf-3d8b4c32264c',
        { responseType: 'blob' }
      );
      const blob = await response.data;
      setImage(URL.createObjectURL(blob));
    };

    fetchImage();
  }, []);

  return (
    <div className={styles['container']}>
      <h1>TPLT | WEB SPA</h1>

      <img style={{ width: '250px' }} src={image} />
    </div>
  );
}
