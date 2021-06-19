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
import { messagetype, roomtype } from '../../interfaces/components/chat';
import Messages from '../../components/chat/messages';
import { parseCookies } from 'nookies';
import useSocket from './../../hooks/useSocket';
interface directprops {
  user: userr
}
const Direct: FC<directprops> = ({ user }) => {

  const router = useRouter()
  const cookies=parseCookies()
  const [messages, setmessages] = useState<messagetype[]>([]);
  const rooms = useAppSelector(state => state.chat.rooms)
  const [thisroom, setthisroom] = useState<roomtype>();
    useEffect(() => {
       (async()=>{
        if(router.query.id.length > 7 ){
          const data=await Api({},cookies.token).getmessagesbyroomid(router.query.id as string)
          setthisroom(data.room) 
          setmessages(data.messages)
          socket?.emit('@Client:Join_room',{roomId:data.room?._id})
        }
       })()

    }, [router.query.id]);
const socket=useSocket()
useEffect(() => {
      socket?.on('connect',()=>{
        console.log("conected sukaaaaaaaaaaaaaaaaaaaaaaaaaa")
      })
}, []);
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
            <Messages room={thisroom && thisroom} mesages={messages}/>}
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
