import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { messagetype, roomtype, roomuser } from '../../interfaces/components/chat';
import { imageUrl } from './../../helpers/urls';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import moment from 'moment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Link from 'next/link';
import { Picker } from 'emoji-mart';
import smile from '../post/poststutic/smile.png'
import useSocket from '../../hooks/useSocket';
import { useRouter } from 'next/dist/client/router';
import { parseCookies } from 'nookies';
import { Api } from '../../utiles/api';
const Messages = () => {
    const messagelistref=useRef<any>()
    const router=useRouter()
    const socket = useSocket()
    const [messages, setmessages] = useState<messagetype[]>([]);
    const [secntuser, setsecntuser] = useState<roomuser>();
    const [messagetext, setmessagetext] = useState<string>('');
    const [emojibicker, setemojibicker] = useState<boolean>(false);
    const [roomtt, setroomtt] = useState<roomtype>();
    const me = useAppSelector(state => state.user.user)
    const onselect = (emoji: any, e) => {
        e.stopPropagation()
        setmessagetext(prev => prev + emoji.native)
    }
    const cookies=parseCookies()
    useEffect(() => {
        (async()=>{
         if(router.query.id.length > 7 ){
           const data=await Api({},cookies.token).getmessagesbyroomid(router.query.id as string)
           setroomtt(data.room) 
       
           setmessages(data.messages)
           socket?.emit('@Client:Join_room',{roomId:data.room?._id})
         }
        })()
     }, [router.query.id]);
   
    const togglewmoji = (e: MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setemojibicker(!emojibicker)
    }
    const sentmessage = (e: React.FormEvent) => {
        e.preventDefault()
        socket?.emit('@Client:Sent_message', {
            text: messagetext,
            romId: roomtt?._id,
            senter: me._id,
            secnt: roomtt?.users?.replace(me._id, '')
        })
        setmessagetext('')
    }
        useEffect(() => {
            if(roomtt){
                socket?.emit('@Client:Join_room',roomtt._id)
            }
            socket?.on('@server:Sent_message',(data)=>{
                if(String(data.romId) === String(roomtt?._id)){
                        setmessages(prev=>[...prev,data])
                }
            })
        }, [roomtt]);
    useEffect(() => {
        setsecntuser(roomtt?.romusers.filter(el => String(el._id) !== String(me._id))[0])
    }, [roomtt]);
    useEffect(() => {
        if (messagelistref.current) {
          messagelistref?.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
      }, [messages.length]);
    return (
        <div className="message_big_wraper">
            <div className="messages_userinformation">
                <div>
                    {secntuser && secntuser?.avatar?.length > 2
                        ? <img className="messages_userinformation-foto" width="55px" height="55px" src={imageUrl + secntuser.avatar} alt="ss" />
                        : <PermIdentityIcon style={{ width: "55px", height: "55px" }} />}
                </div>
                <div className=" messages_userinformation-desc">

                    <Link href={`/profile/${secntuser?._id}`}>
                        <a className="messages_userinformation-name"> {secntuser?.name}  {secntuser?.surename}  </a>
                    </Link>
                    {secntuser?.isActive ? <div className="user_online">online</div> : <div className="user_offline">offline</div>}
                </div>
            </div>
            <div className="messages_container">
                {
                    messages.map((el) => {

                        return <div  ref={messagelistref} key={el._id} className={String(me._id) === String(el.senter._id) ? "messages_message messages_message_my" : "messages_message messages_message_other"} >
                            <div className="messages_userimage">
                                {el?.senter?.avatar?.length > 2
                                    ? <img width="100%" height="100%" src={imageUrl + el.senter.avatar} alt="image" />
                                    : <PermIdentityIcon style={{ width: "100%", height: "100%" }} />
                                }
                            </div>
                            <div className="message_text">
                                {el.text}
                            </div>
                            <span className="m_time">{moment(el.createdAt).format('LLL')}</span>
                            <span className="m_heart">{el.likes.length > 0 ? <><FavoriteBorderIcon />{el.likes.length}</> : null}</span>
                        </div>

                    })
                }
            </div>
            <form onSubmit={(e) => sentmessage(e)} style={{ position: 'relative' }} className="post_form" >
                <div style={{ display: "inline-block" }} className="postemoji_btn" onClick={(e) => {
                    e.stopPropagation()
                    togglewmoji(e)
                }}><img className="postemoji" src={smile} alt="sssssssssss" /></div>
                <input
                    value={messagetext}
                    onChange={(e) => setmessagetext(e.target.value)}
                    className="post_coment_input"
                    placeholder="Add a comment…"
                    type="text" />
                <button type="submit" >sent message</button>
                {emojibicker ? <Picker
                    style={{ position: 'absolute', width: "290px", bottom: '45px', left: '2px' }}
                    onClick={onselect}
                /> : null}
            </form>
        </div>
    );
}

export default Messages;
