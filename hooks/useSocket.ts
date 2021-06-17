import { io, Socket } from 'socket.io-client';
import  { useRef } from 'react';

const useSocket = () => {
  const socketref=useRef<Socket>()
    socketref.current=io('http://localhost:7000')
  return socketref.current
}
// function useSocket() {
//   const [socket, setSocket] = useState<Socket>()

//     const socketIo = io('http://localhost:7000')

//     setSocket(socketIo)
//     function cleanup() {
//       socketIo.disconnect()
//     }
//     return cleanup

//   return socket
// }

export default useSocket;
//    const setupSocket = () => {
//     const token = parseCookies().token;
//     if(typeof window === undefined){
//         if ( !socket) {
//             const newSocket = io('http://localhost:7000', {
//               query: {
//                 token
//               },
//             });
//             newSocket.on("disconnect", () => {
//               // setSocket({});
//               setTimeout(setupSocket, 3000);
//               console.log("disconect");
//             });
      
//             newSocket.on("connect", () => {
//               console.log("conected");
//             });
//             setSocket(newSocket);
//           }
//     }
//   };