import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import axiosInstance from '../../../axios';
import { AxiosResponse } from 'axios';

export default function Home() {
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      const response: AxiosResponse = await axiosInstance.get(
        '/get?filename=33f27c10-be7c-433f-a13e-1131c2e65c27'
      );
      const blob = await response.data;
      setImage(URL.createObjectURL(blob));
    };

    fetchImage();
  }, []);

  return (
    <div className={styles['container']}>
      <h1>TPLT | WEB SPA</h1>
      {/* <img
        style={{ width: '250px' }}
        src={
          GATEWAY_SERVICE + '/get?filename=33f27c10-be7c-433f-a13e-1131c2e65c27'
        }
      /> */}

      <img style={{ width: '250px' }} src={image} />
    </div>
  );
}
