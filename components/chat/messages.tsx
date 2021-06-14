import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { messagetype } from '../../interfaces/components/chat';
import { imageUrl } from './../../helpers/urls';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import moment from 'moment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { parseCookies } from 'nookies';
import { Api } from './../../utiles/api';
const Messages = ({mesages}:any) => {
    const [messages, setmessages] = useState<messagetype[]>(mesages);
    const me=useAppSelector(state=>state.user.user)
    const [user, setuser] = useState();
    useEffect(() => {
        setmessages(mesages)
    }, [mesages]);
    const cookies=parseCookies()
    useEffect(() => {
            (async()=>{
                const newuser=await Api({},cookies.token)
                .userbyId(String(messages[0].senter._id)=== String(me._id)
                ? messages[0].secnt._id
                : messages[0].senter._id
                )
                setuser(newuser)
                console.log(newuser)
            })()
    }, [messages]);
    return (
        <div className="message_big_wraper">
            <div className="messages_userinformation">

            </div>
            <div className="messages_container">
        {
            messages.map((el)=>{
                if(String(me._id)===String(el.senter._id)){
                    return <div key={el._id} className="messages_message messages_message_my">
                             <div className="messages_userimage">
                                {el.senter.avatar.length > 2 
                                ? <img width="100%" height="100%" src={imageUrl + el.senter.avatar} alt="image" />
                                : <PermIdentityIcon style={{width:"100%",height:"100%"}}/>
                            }
                             </div>
                             <div className="message_text">
                                {el.text}
                             </div>
                             <span className="m_time">{moment(el.createdAt).format('LLL')}</span>
                    </div>
                }else{
                    return <div key={el._id} className="messages_message messages_message_other">
                             <div className="messages_userimage">
                                {el.senter.avatar.length > 2 
                                ? <img width="100%" height="100%" src={imageUrl + el.senter.avatar} alt="image" />
                                : <PermIdentityIcon style={{width:"100%",height:"100%"}}/>
                            }
                             </div>
                             <div className="message_text">
                                {el.text}
                               
                             </div>
                             <span className="m_time">{moment(el.createdAt).format('LLL')}</span>
                             <span className="m_heart">{el.likes.length > 0 ? <><FavoriteBorderIcon/>{el.likes.length}</> :null}</span>
                          
                    </div>
                }
            })
          }
        </div>
    
        </div>
    );
}

export default Messages;
