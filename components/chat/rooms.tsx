import React, { useEffect, useState } from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { imageUrl } from '../../helpers/urls';
import Link from 'next/link';
import { roomuser } from '../../interfaces/components/chat';
import { useAppSelector } from '../../hooks/redux';
import { roomtype } from './../../interfaces/components/chat';
import { useRouter } from 'next/dist/client/router';
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
    function filter(arr: roomuser[]) {
      const user = useAppSelector(state => state.user.user)
        return arr.filter((el) => String(el._id) != String(user._id))
      }
      const [rooms, setrooms] = useState<roomtype[]>(roomsi);
       useEffect(() => {
            setrooms(parset(roomsi))
      }, [roomsi]);
        console.log(router.query.id)
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
