import { GetServerSideProps } from 'next';
import React, { FC } from 'react';
import Header from '../../components/header';
import { userr } from '../../interfaces/profile';
import { changerooms } from '../../redux/slices/chatslice';
import { wrapper } from '../../redux/slices/wraper';
import { checkAuth } from '../../utiles/checkauth';
import { Api } from './../../utiles/api';
import { useRouter } from 'next/dist/client/router';
import { useAppSelector } from '../../hooks/redux';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { roomuser } from '../../interfaces/components/chat';
import { imageUrl } from './../../helpers/urls';
interface directprops {
  user: userr
}

const Direct: FC<directprops> = ({ user }) => {
  function filter(arr: roomuser[]) {
    return arr.filter((el) => String(el._id) != String(user._id))
  }
  const router = useRouter()
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
                    {rooms.map((el) => {
                      return <div className="chat-page-room-item">
                        <div className="chat-page-room-avatar">
                          {filter(el.romusers)[0].avatar.length > 2
                            ? <img src={imageUrl + filter(el.romusers)[0].avatar} alt="" />
                            : <PermIdentityIcon />
                          }
                        </div>
                        <div className="chat-page-room-other"></div>
                      </div>
                    })}
                  </div>
              }
            </div>
          </div>
          <div className="chat_page-rigth"></div>
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
