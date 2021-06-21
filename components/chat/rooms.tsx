import React, { useEffect, useState } from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { imageUrl } from '../../helpers/urls';
import Link from 'next/link';
import { roomuser } from '../../interfaces/components/chat';
import { useAppSelector } from '../../hooks/redux';
import { useRouter } from 'next/dist/client/router';
import { parseCookies } from 'nookies';
import { roomtype } from './../../interfaces/components/chat';
function parset(arr){
 return  JSON.parse(JSON.stringify(arr))
}
const Rooms = () => {
    function filter(arr: roomuser[]) {
      const user = useAppSelector(state => state.user.user)
        return arr.filter((el) => String(el._id) != String(user._id))
      }
      const roomsi = useAppSelector(state => state.chat.rooms)
      const [rooms, setrooms] = useState<roomtype[]>(roomsi);
      // useEffect(() => {
      //     setTimeout(()=>{
      //       setrooms(parset(roomsi))
      //     },0)
      // }, [roomsi]);


    //   useEffect(() => {
    //     (async()=>{
    //       if(router.query.id.length > 7 ){
    //         const data=await Api({},cookies.token).getmessagesbyroomid(router.query.id as string)
    //         if(rooms.every(el=>String(el._id) !== String(data.room._id))){
    //           setrooms([...parset(roomsi),data.room])
    //         }else{
    //           console.log("hello")
    //           setrooms([...parset(roomsi)])
    //         }
    //       }
    //      })()
    //      return ()=>{
    //        setrooms([])
    //      }
    //  }, [router.query.id]);
     
    return (
        <>
        {
            rooms.map((el) => {
                return <Link key={el._id} href={`/direct/${filter(el.romusers)[0]._id}`}>
                  <a className="chat-page-room-item">
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
