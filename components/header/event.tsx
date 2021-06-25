import React from 'react';
import { eventenum, eventtype } from '../../interfaces/components/events';
import PermIdentitySharpIcon from '@material-ui/icons/PermIdentitySharp';
import Link from 'next/link'
import { useAppSelector } from '../../hooks/redux';
import { imageUrl } from './../../helpers/urls';
import  userimage from './user.png'
import moment from 'moment';
type eventprops={
   event: eventtype
}
const Event:React.FC<eventprops> = ({event}) => {
    const me=useAppSelector(state=>state.user.user)
    const subjectavatar=event.subject.avatar
    if(event.type === eventenum.like && String(event.subject._id) !== String(me._id)){
        return (
            <Link href={`/post/${event.post?._id}`}>
            <a className="event_item">
                   <div className="event_item_1">
                      {subjectavatar 
                      ? <img className="border_rad" src={imageUrl + subjectavatar } width="40px" height="40px" alt="subjectavatar" />
                       : <img className="border_rad" width="40px" height="40px" src={userimage} alt="userimage"/> }
                   </div>
                   <div className="event_item_2">
                     {event.subject.name}  liked your post
                     <br />
                     <span className="event_time">
                     {moment(event.createdAt).startOf(new Date(event.createdAt).getHours()).fromNow()}
                     </span>
                   </div>
                   <div className="event_item_3">
                       <img  width="40px" height="40px" src={imageUrl + event.post.imageUrl} alt="image" />
                       </div>    
            </a>
            </Link>
        );
    }else if(event.type === eventenum.follow){
        return <div>
        hello
    </div>
    }else if(event.type === eventenum.comment && String(event.subject._id) !== String(me._id)){
        return <Link href={`/post/${event.post?._id}`}>
        <a className="event_item">
               <div className="event_item_1">
                  {subjectavatar 
                  ? <img className="border_rad" src={imageUrl + subjectavatar } width="40px" height="40px" alt="subjectavatar" />
                   : <img className="border_rad" width="40px" height="40px" src={userimage} alt="userimage"/> }
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
                   <img  width="40px" height="40px" src={imageUrl + event.post.imageUrl} alt="image" />
                   </div>    
        </a>
        </Link>
    }
    else{
        return <></>
    }
    
}

export default Event;
