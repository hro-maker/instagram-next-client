import { GetServerSideProps } from 'next';
import React, { FC, useState } from 'react';
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
interface directprops {
  user: userr
}

const Direct: FC<directprops> = ({ user }) => {

  const router = useRouter()
  const [messages, setmessages] = useState<messagetype[]>([
    {
      text: "kjsadhkajsdh", romId: "",
      senter: {
        _id: "60c0499d1455641da82ce15c",
        name: "hrant",
        surename: "muradyan",
        avatar: ''
      },
      secnt: user,
      _id:"sdjkhadkjh",
      createdAt: new Date(Date.now()),
      likes:[]
    },
  
    {
      text: "hello beybi", romId: "",
      senter: user,
      secnt: {
        _id: "60c0499d1455641da82ce15c",
        name: "hrant",
        surename: "muradyan",
        avatar: ''
      },
      _id:"sdjkhadkjhs",
      createdAt: new Date(Date.now()),
      likes:[]
    }
  ]);
  const rooms = useAppSelector(state => state.chat.rooms)
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
            <Messages mesages={messages}/>
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
