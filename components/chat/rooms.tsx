import React, { useEffect, useState } from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { imageUrl } from '../../helpers/urls';
import Link from 'next/link';
import { roomuser } from '../../interfaces/components/chat';
import { useAppSelector } from '../../hooks/redux';
import { roomtype } from './../../interfaces/components/chat';
import { useRouter } from 'next/dist/client/router';
import useSocket from './../../hooks/useSocket';
function parset(arr:roomtype[]){
 return  JSON.parse(JSON.stringify(arr))
}
export const sortfunction=(a:roomtype,b:roomtype)=>{
  var dateA = new Date(a.updatedAt).getTime();
  var dateB = new Date(b.updatedAt).getTime();
  return dateA > dateB ? -1 : 1;  

}

const Rooms = ({roomsi}:{roomsi:roomtype[]}) => {
  const router=useRouter()
  const user = useAppSelector(state => state.user.user)
    function filter(arr: roomuser[]) {
        return arr.filter((el) => String(el._id) != String(user._id))
      }
      const [rooms, setrooms] = useState<roomtype[]>(roomsi);
       useEffect(() => {
            setrooms(parset(roomsi))
      }, [roomsi]);
      const socket=useSocket()
      useEffect(() => {
      socket.on('@server:new_room',(data)=>{
           console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
            if(String(data.userid ) === String(user._id)){
                if(rooms.every(el=>String(el._id) !== String(data.room._id))){
                     setrooms(prev=>[...prev,data.room]) 
                }
            }
      })
      return ()=>{
        setrooms([])
      }
      }, [socket]);
    return (
        <>
        {
            [...rooms].sort(sortfunction).map((el) => {
                return <Link key={el._id} href={`/direct/${filter(el.romusers)[0]._id}`}>
                  <a className= {String(router.query.id) === String(filter(el.romusers)[0]._id) 
                    ? 'chat-page-room-item chat-page-room-item-active'
                     :  "chat-page-room-item"}>
                  <div className="chat-page-room-avatar">
                    {filter(el.romusers)[0].avatar?.length > 2
                      ? <img width="40px" height="40px" className="rooms_item" src={imageUrl + filter(el.romusers)[0].avatar} alt="" />
                      : <PermIdentityIcon />
                    }
                  </div>
                  <div className="chat-page-room-other">
                      {filter(el.romusers)[0].name} {filter(el.romusers)[0].surename}
                  </div>
                </a>
                </Link>
              })
        }
        </>
    );
}

export default Rooms;
