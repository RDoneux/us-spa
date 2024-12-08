import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import axios, { AxiosResponse } from 'axios';

const US_IMAGE_SERVICE_URL = import.meta.env.VITE_US_IMAGE_SERVICE_URL;

export default function Home() {

  const [image, setImage] = useState();

  useEffect(() => {
    axios.get(US_IMAGE_SERVICE_URL + '/get?filename=33f27c10-be7c-433f-a13e-1131c2e65c27').then((response: AxiosResponse) => {
      console.log(response.data);
      setImage(response.data);
      console.log(image)
    })
  }, [])

  return (
    <div className={styles['container']}>
      <h1>TPLT | WEB SPA</h1>
      {/* <img src={US_IMAGE_SERVICE_URL + '/get?filename=33f27c10-be7c-433f-a13e-1131c2e65c27'} /> */}
      
    </div>
  );
}
