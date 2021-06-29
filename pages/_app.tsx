
import { AppProps } from 'next/app';
import { FC, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import '../styles/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-h5-audio-player/lib/styles.css';
import 'emoji-mart/css/emoji-mart.css'
import { wrapper } from '../redux/slices/wraper';
import { useAppSelector } from '../hooks/redux';
import useSocket from './../hooks/useSocket';
const MyApp: FC<AppProps> = ({Component, pageProps}) => {
const user=useAppSelector(state=>state.user.user)
const socket=useSocket()
if(typeof window !== 'undefined'){
  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    if(user?._id){
      socket.emit('@Client:user_status',{status:false,id:user._id})
    }
});
}
useEffect(() => {

  if(user?._id){
    socket.emit('@Client:Join_room',String(user._id))
  }
}, []);
    return <> 
    <ToastContainer
    position="bottom-left"
    autoClose={5000}
    />
    <Component {...pageProps} /></>
  }


export default wrapper.withRedux(MyApp);