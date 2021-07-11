import React, { useEffect, useState } from 'react';
import { eventenum, eventtype } from '../../interfaces/components/events';
import Link from 'next/link'
import { useAppSelector } from '../../hooks/redux';
import moment from 'moment';
import { Api } from '../../utiles/api';
import { parseCookies } from 'nookies';
import useSocket from './../../hooks/useSocket';
import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';
import { changeuser } from '../../redux/slices/userslice';
import {  BiUserCircle } from "react-icons/bi";
type eventprops={
   event: eventtype
}
const Event:React.FC<eventprops> = ({event:eventt}) => {
    const [event, setevent] = useState(eventt);
    const me=useAppSelector(state=>state.user.user)
    const subjectavatar=event.subject.avatar
    const cookies=parseCookies()
    const socket=useSocket()
    const dispatch=useDispatch()
    const subscr = async (name,userId) => {
      
        if(name==='s'){
            await  Api({}, cookies.token).subscrip(userId)
            socket.emit('@Client:event_follow',{subject:me._id,object:userId,post:''})
        }else if(name === 'u'){
            await  Api({}, cookies.token).unsubscrip(userId)
        }
        const userr=await Api({},cookies.token).getMe()
            dispatch(changeuser(userr))
    }
    const router=useRouter()
    useEffect(() => {
        setevent(eventt)
        return ()=>{
            // setevent({})
        }
    }, [eventt]);
    if(event.type === eventenum.like && String(event.subject._id) !== String(me._id)){
        return (
            <Link href={`/post/[id]`}  as={`/post/${event.post?._id}`}>
            <a className="event_item">
                   <div className="event_item_1">
                      {subjectavatar 
                      ? <img className="border_rad" src={subjectavatar } width="40px" height="40px" alt="subjectavatar" />
                       : <BiUserCircle className="comment_user_placeholder" /> }
                   </div>
                   <div className="event_item_2">
                     {event.subject.name}  liked your post
                     <br />
                     <span className="event_time">
                         {moment(event.createdAt).startOf(new Date(event.createdAt).getHours()).fromNow()}
                     </span>
                   </div>
                   <div className="event_item_3">
                       <img  width="40px" height="40px" src={event.post.imageUrl} alt="image" />
                       </div>    
            </a>
            </Link>
        );
    }else if(event.type === eventenum.follow){
        return   <a onClick={()=>router.push(`/profile/${event.subject._id}`)} className="event_item">
               <div className="event_item_1">
                  {subjectavatar 
                  ? <img className="border_rad" src={ subjectavatar } width="40px" height="40px" alt="subjectavatar" />
                   : <BiUserCircle className="comment_user_placeholder" /> }
               </div>
               <div className="event_item_2">
                 {event.subject.name}  followed you
                 <br />
                 <span className="event_time">
                 {moment(event.createdAt).startOf(new Date(event.createdAt).getHours()).fromNow()}
                 </span>
               </div>
               <div className="event_item_3">
                   {me.Isub.some(el=>String(el._id)=== String(event.subject._id))
                    ? <button onClick={(e)=>{
                        e.stopPropagation()
                        subscr('u',event.subject._id)
                    }}>unsubscrip</button> 
                    : <button onClick={(e)=>{
                        e.stopPropagation()
                        subscr('s',event.subject._id)
                        }}>subscrip</button>}
                   </div>    
        </a>
      
    }else if(event.type === eventenum.comment && String(event.subject._id) !== String(me._id)){
        return <Link href={`/post/[id]`} as={`/post/${event.post?._id}`}>
        <a className="event_item">
               <div className="event_item_1">
                  {subjectavatar 
                  ? <img className="border_rad" src={subjectavatar } width="40px" height="40px" alt="subjectavatar" />
                   : <BiUserCircle className="comment_user_placeholder" />}
               </div>
               <div className="event_item_2">
                 {event.subject.name}  comented your post
                 <br />
                 <span className="event_time event_time_comment">
                    {event.comment}
                 </span>
                 <br />
                 <span className="event_time">
                 {moment(event.createdAt).startOf(new Date(event.createdAt).getHours()).fromNow()}
                 </span>
               </div>
               <div className="event_item_3">
                   <img  width="40px" height="40px" src={event.post.imageUrl} alt="image" />
                   </div>    
        </a>
        </Link>
    }
    else{
        return <></>
    }
    
}

export default Event;
