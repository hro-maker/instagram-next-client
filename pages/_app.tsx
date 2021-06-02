
import { AppProps } from 'next/app';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import '../styles/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'emoji-mart/css/emoji-mart.css'
import { wrapper } from '../redux/slices/wraper';
const MyApp: FC<AppProps> = ({Component, pageProps}) => {
    return <> 
    <ToastContainer/>
    <Component {...pageProps} /></>
  }


export default wrapper.withRedux(MyApp);