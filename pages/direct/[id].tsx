import { GetServerSideProps } from 'next';
import React, { FC, useState,useEffect, useRef } from 'react';
import Header from '../../components/header';
import { userr } from '../../interfaces/profile';
import { changerooms } from '../../redux/slices/chatslice';
import { wrapper } from '../../redux/slices/wraper';
import { checkAuth } from '../../utiles/checkauth';
import { Api } from './../../utiles/api';
import { useRouter } from 'next/dist/client/router';
import { useAppSelector } from '../../hooks/redux';
import Rooms from '../../components/chat/rooms';
import { messagetype } from '../../interfaces/components/chat';
import Messages from '../../components/chat/messages';
import { parseCookies } from 'nookies';
import { io, Socket } from 'socket.io-client';
interface directprops {
  user: userr
}
function useSocket(url) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketIo = io(url)

    setSocket(socketIo)

    function cleanup() {
      socketIo.disconnect()
    }
    return cleanup
  }, [])

  return socket
}
const Direct: FC<directprops> = ({ user }) => {

  const router = useRouter()
  const cookies=parseCookies()
  const [messages, setmessages] = useState<messagetype[]>([]);
  const rooms = useAppSelector(state => state.chat.rooms)
  const [thisroom, setthisroom] = useState();
    useEffect(() => {
       (async()=>{
        if(router.query.id.length > 7 ){
          const data=await Api({},cookies.token).getmessagesbyroomid(router.query.id as string)
          setthisroom(data.room) 
          setmessages(data.messages)
        }
       })()
    }, [router.query.id]);
    // const socketref=useRef<Socket>()
    // useEffect(() => {
    //     if(typeof window !== 'undefined'){
    //          socketref.current=io('http://localhost:7002')
    //          socketref.current.emit('events',{sender: 'string', room: 'string', message: 'string' })
    //          socketref?.current?.on("connect", () => {
    //           console.log("conectedssssssssssssssssssssssssssssssssssssssssssssssssssssss");
    //         });
    //         socketref?.current?.on('message',()=>{
    //         })
    //         return ()=>{
    //             socketref?.current?.disconnect()
    //         }
    //     }
       
    // }, [socketref?.current]);
    const socket = useSocket('http://localhost:7000')
    useEffect(() => {
      console.log("useeefect")
      if (socket) {
         console.dir(socket)
        socket.on('connect',()=>{
          console.log("conectedddd sukaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        })
      }
    }, [socket])
  return (
    <div>
      
      <Header _id={user._id} avatar={user.avatar} />
      <div className="chat_page_wraper">
        <div className="chat_page-container">
          <div className="chat_page-left">
            <div onClick={() => router.push(`/profile/${user._id}`)} className="chat_page-left-top">
              {user.name} {user.surename}
            </div>
            <div className="chat_page-left-bottom">
              {
                rooms.length === 0
                  ? <div className="chat_donthave">chats dont found</div>
                  : <div >
                    <Rooms />
                  </div>
              }
            </div>
          </div>
          <div className="chat_page-rigth">
            {router.query.id.length < 8 ? <> <div className="select_user"> select user </div></> : 
            <Messages room={thisroom} mesages={messages}/>}
            <button onClick={()=>{
              if(socket){
                console.log("hello")
             socket.emit('message',{messagessssssssssssssssssssss:"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"})
              }
            }}>click</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const isauth = await checkAuth(ctx)
  if (!isauth) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    }
  }
  const data = await Api(ctx).getmyrooms()
  ctx.store.dispatch(changerooms(data.rooms))
  return {
    props: {
      user: isauth,
    }
  }
})
export default Direct;
