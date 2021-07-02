import React, { useEffect, useState } from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { imageUrl } from '../../helpers/urls';
import Link from 'next/link';
import { roomuser } from '../../interfaces/components/chat';
import { useAppSelector } from '../../hooks/redux';
import { roomtype } from './../../interfaces/components/chat';
import { useRouter } from 'next/dist/client/router';
import Lastmessage from './Lastmessage';
import { parseCookies } from 'nookies';
import useSocket from './../../hooks/useSocket';
import { Api } from '../../utiles/api';
import { useDispatch } from 'react-redux';
import { changeroomid } from '../../redux/slices/chatslice';
function parset(arr:roomtype[]){
 return  JSON.parse(JSON.stringify(arr))
}
export const sortfunction=(a:roomtype,b:roomtype)=>{
  var dateA = new Date(a.updatedAt).getTime();
  var dateB = new Date(b.updatedAt).getTime();
  return dateA > dateB ? -1 : 1;  
}

const Rooms = ({roomsi}:{roomsi:roomtype[]}) => {
  const dispatch=useDispatch()
  const router=useRouter()
  const user = useAppSelector(state => state.user.user)
  const chatslice = useAppSelector(state => state.chat)
    function filter(arr: roomuser[]) {
        return arr.filter((el) => String(el._id) != String(user._id))
      }
      const [rooms, setrooms] = useState<roomtype[]>(roomsi);
       useEffect(() => {
            setrooms(parset(roomsi))
      }, [roomsi]);
      const cookies=parseCookies()
      const socket=useSocket()
      useEffect(() => {
        socket.on('@server:new_room',async (data:any)=>{
          if(String(data.newmessage.secnt._id) === String(user._id)){
            const new_room=await Api({},cookies.token).getroombyid(data.newmessage.romId)
              const oldrooms:any=rooms.filter(el=>String(el._id) !== String(data.newmessage.romId))
              oldrooms.push(new_room)
              setrooms(oldrooms)
          }
        })
        }, [socket]);
        useEffect(() => {
          (async ()=>{
            if(chatslice.roomid.length > 0 ){
              const new_room=await Api({},cookies.token).getroombyid(chatslice.roomid)
              const oldrooms:any=rooms.filter(el=>String(el._id) !== String(chatslice.roomid))
              oldrooms.push(new_room)
              setrooms(oldrooms)
              dispatch(changeroomid(''))
            }
            
        })()
        }, [chatslice.forfollow]);
    return (
        <>
        {
            [...rooms].sort(sortfunction).map((el) => {
              console.log(el)
                return <Link key={el._id} href={`/direct/${filter(el.romusers)[0]._id}`}>
                  <a className= {String(router.query.id) === String(filter(el.romusers)[0]._id) 
                    ? 'chat-page-room-item chat-page-room-item-active'
                     :  "chat-page-room-item"}>
                  <div className="chat-page-room-avatar">
                    {filter(el.romusers)[0].avatar?.length > 2
                      ? <img width="40px" height="40px" className="rooms_item" src={imageUrl + filter(el.romusers)[0].avatar} alt="" />
                      : <div className="room__user-plceholder">
                          {filter(el.romusers)[0].name[0].toUpperCase()} {filter(el.romusers)[0].surename[0].toUpperCase()}
                      </div>
                    }
                  </div>
                  <div className="chat-page-room-other">
                      <div className="chat-page-room-name">
                      {filter(el.romusers)[0].name} {filter(el.romusers)[0].surename}
                      </div>
                      <div className="chat_page_room-message">
                      {String(el.last?.senter) === String(user._id) && <span>me: </span>}
                       {el.last ? <Lastmessage last={el.last}/> : <span > </span>} 
                       {el.count > 0 && <span className="rooms__item-counter">{el.count}</span>}
                      </div>
                  </div>
                </a>
                </Link>
              })
        }
        </>
    );
}

export default Rooms;
