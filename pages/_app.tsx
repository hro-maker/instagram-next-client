
import { AppProps } from 'next/app';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import '../styles/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const MyApp: FC<AppProps> = ({Component, pageProps}) => {
    return <> 
    <ToastContainer/>
    <Component {...pageProps} /></>
  }
  export default MyApp