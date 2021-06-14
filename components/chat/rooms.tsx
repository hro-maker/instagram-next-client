import React from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { imageUrl } from '../../helpers/urls';
import Link from 'next/link';
import { roomuser } from '../../interfaces/components/chat';
import { useAppSelector } from '../../hooks/redux';

const Rooms = () => {
    function filter(arr: roomuser[]) {
      const user = useAppSelector(state => state.user.user)
        return arr.filter((el) => String(el._id) != String(user._id))
      }
      const rooms = useAppSelector(state => state.chat.rooms)
      console.log(rooms)
    return (
        <>
        {
            rooms.map((el) => {
                return <Link key={el._id} href={`/direct/${filter(el.romusers)[0]._id}`}>
                  <a className="chat-page-room-item">
                  <div className="chat-page-room-avatar">
                    {filter(el.romusers)[0].avatar.length > 2
                      ? <img src={imageUrl + filter(el.romusers)[0].avatar} alt="" />
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
