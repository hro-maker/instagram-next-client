import { io, Socket } from 'socket.io-client';
import  { useRef } from 'react';

const useSocket = () => {
  const socketref=useRef<Socket>()
  socketref.current=io('http://localhost:7001')
  return socketref.current
}

export default useSocket;
