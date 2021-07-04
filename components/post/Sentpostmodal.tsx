import { useRouter } from 'next/dist/client/router';
import { parseCookies } from 'nookies';
import React, { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { useAppSelector } from '../../hooks/redux';
import { Api } from '../../utiles/api';
import Loaderr from '../loader';
import useSocket from './../../hooks/useSocket';

const Sentpostmodal = ({close,postid}:{close:()=>void,postid:string}) => {
    const user=useAppSelector(state=>state.user.user)
    const [loading, setloading] = useState(false);
    const router=useRouter()
    const cookies=parseCookies()
    const socket=useSocket()
const sentpost=async(userid:string)=>{
    setloading(true)
    const room=await Api({},cookies.token).getroombyuserid(userid)
    socket.emit('@Client:Sent_message_post',{
                text: '',
                romId: room._id,
                senter: user._id,
                secnt: userid,
                post:postid
    })    
    setloading(false)
    close()
}
 
    return (
        <div className="subscripers_modal_overlay better_overlay">
            {loading ? <div className="userloading">
                <Loaderr />
            </div> : <div className="subscripers_modal-body">
                <div onClick={() => close()} className="post_modal_close">&times;</div>
                {
                   user.Isub.length > 0 ? user.Isub.map(el =>
                        <div key={el._id} className="subscrip_post">
                         {el.avatar 
                                ? <img
                                onClick={() => {
                                    router.push(`/profile/${el._id}`)
                                    close()
                                }}
                                className="modal_othertop-avatar profile-userimage likes__modal-placeholder"
                                src={el.avatar}
                                width="35px"
                                height="35px"
                                alt="sssss" /> 
                                : <BiUserCircle
                                className="likes__modal-placeholder"
                                onClick={() => {
                                    router.push(`/profile/${el._id}`)
                                    close()
                                }}
                                width="70px"
                                height="70px"/>}   
                                
                        
                                <div
                                onClick={() => {
                                    router.push(`/profile/${el._id}`)
                                    close()
                                }}
                                style={{cursor:"pointer"}}
                                className="profile_modal-username  profile_modal-username-flex"> {el.name} {el.surename}</div>
                               <button 
                               onClick={()=>sentpost(el._id)}
                               className="profile_unsubscr">sent</button>
                        </div>
                    ) : <div>you dont have</div>
                }
            </div>
            }
        </div>
    );
}

export default Sentpostmodal;
