
import { AppProps } from 'next/app';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import '../styles/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'emoji-mart/css/emoji-mart.css'
import { wrapper } from '../redux/slices/wraper';
import useSocket from './../hooks/useSocket';
const MyApp: FC<AppProps> = ({Component, pageProps}) => {
  const socket = useSocket()
  socket?.on('msgToClient',(...args)=>{
          console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",args)
  })
    return <> 
    <ToastContainer
    position="bottom-left"
    autoClose={5000}
    />
    <Component {...pageProps} /></>
  }


export default wrapper.withRedux(MyApp);