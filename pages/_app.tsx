
import { AppProps } from 'next/app';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import '../styles/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'emoji-mart/css/emoji-mart.css'
import { wrapper } from '../redux/slices/wraper';
import { useAppSelector } from '../hooks/redux';
import useSocket from './../hooks/useSocket';
const MyApp: FC<AppProps> = ({Component, pageProps}) => {
  // const socket = useSocket()
  // socket?.on('msgToClient',(...args)=>{
  //         console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",args)
  // })

//  if(typeof window !== 'undefined'){
//   window.addEventListener("beforeunload", function (e) {
//     var confirmationMessage = "\o/";
  
//     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//     return confirmationMessage;                            //Webkit, Safari, Chrome
//   });
//  }
const user=useAppSelector(state=>state.user.user)
const socket=useSocket()
if(typeof window !== 'undefined'){
  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    if(user?._id){
      socket.emit('@Client:user_status',{status:false,id:user._id})
    }
    console.log("hello")
});
}
    return <> 
    <ToastContainer
    position="bottom-left"
    autoClose={5000}
    />
    <Component {...pageProps} /></>
  }


export default wrapper.withRedux(MyApp);