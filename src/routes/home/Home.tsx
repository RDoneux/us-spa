import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import axios, { AxiosResponse } from 'axios';

const GATEWAY_SERVICE = import.meta.env.AUTH_SERVICE;

export default function Home() {

  const [image, setImage] = useState();

  useEffect(() => {
    axios.get(GATEWAY_SERVICE + '/get?filename=33f27c10-be7c-433f-a13e-1131c2e65c27').then((response: AxiosResponse) => {
      console.log(response.data);
      setImage(response.data);
      console.log(image)
    })
  }, [])

  return (
    <div className={styles['container']}>
      <h1>TPLT | WEB SPA</h1>
      <img src={GATEWAY_SERVICE + '/get?filename=33f27c10-be7c-433f-a13e-1131c2e65c27'} />
      
    </div>
  );
}
