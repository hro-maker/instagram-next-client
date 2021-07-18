import io from 'socket.io-client';
import  { useRef } from 'react';

const useSocket = () => {
  const socketref=useRef<any>()
  if(!socketref.current){
    socketref.current=typeof window !== 'undefined' && io('https://instagram-serv.herokuapp.com')
  }else{
      socketref.current.connect()
  }

  return socketref.current
}

export default useSocket;
