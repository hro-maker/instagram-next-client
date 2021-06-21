import { GetServerSideProps } from 'next';
import React, { FC, useEffect, useState } from 'react';
import Header from '../../components/header';
import { userr } from '../../interfaces/profile';
import { changerooms } from '../../redux/slices/chatslice';
import { wrapper } from '../../redux/slices/wraper';
import { checkAuth } from '../../utiles/checkauth';
import { Api } from './../../utiles/api';
import { useRouter } from 'next/dist/client/router';
import { useAppSelector } from '../../hooks/redux';
import Rooms from '../../components/chat/rooms';
import Messages from '../../components/chat/messages';
import { roomtype } from '../../interfaces/components/chat';
import useSocket from './../../hooks/useSocket';
interface directprops {
  user: userr
  newroom:roomtype
}
const Direct: FC<directprops> = ({ user}) => {
  const socket =useSocket()
  const router = useRouter()
  const roomsi = useAppSelector(state => state.chat.rooms)
  const [rooms, setrooms] = useState<roomtype[]>(roomsi);

     useEffect(() => {
         setrooms(roomsi)      
}, [roomsi]);
useEffect(() => {
  socket.emit('@Client:user_status',{status:true,id:user._id})
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
                    <Rooms roomsi={rooms} />
                  </div>
              }
            </div>
          </div>
          <div className="chat_page-rigth">
            {router.query.id.length < 8 ? <> <div className="select_user"> select user </div></> : 
            <Messages />}
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
  const roomss=data.rooms
  if(ctx?.params?.id && ctx?.params?.id?.length > 7){
    const datas=await Api(ctx).getmessagesbyroomid(ctx?.params?.id as string)
    if(data.rooms.every(el=>String(el._id) !== String(datas.room._id))){
      roomss.push(datas.room)
  }
  }
      ctx.store.dispatch(changerooms(roomss))
  return {
    props: {
      user: isauth,
    }
  }
})
export default Direct;
