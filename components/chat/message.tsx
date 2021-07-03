import React, { FC, useEffect, useRef, useState } from 'react';
import { messageenum, messagetype } from './../../interfaces/components/chat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import moment from 'moment';
import { Meesageimagemodal } from './Meesageimagemodal';
type Messageprops = {
    message: messagetype,
    my?: boolean,
    num:number
}

const Message: FC<Messageprops> = ({ message, my,num }) => {
    const messagelistref = useRef<any>()
   const [imageurl, setimageurl] = useState('');
    useEffect(() => {
        if (messagelistref.current) {
            messagelistref?.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    }, [num]);
    const closemodal=()=>{
            setimageurl('')
    }
    if (message.type === messageenum.message) {
        return (
            <div key={message._id} ref={messagelistref} className={my ? "messages_message messages_message_my" : "messages_message messages_message_other"} >
                <div className="messages_userimage">
                    {message?.senter?.avatar?.length > 2
                        ? <img width="100%" height="100%" src={message.senter.avatar} alt="image" />
                        : <div className="room__user-plceholder room__user-plceholder-message">
                        {message.senter.name[0].toUpperCase()} {message.senter.surename[0].toUpperCase()}
                    </div>
                    }
                </div>
                <div className={my ? "message_text message_text_my" : "message_text message_text_other"}>
                    {message.text}
                </div>
                <span className="m_time">{moment(message.createdAt).format('LLL')}</span>
                <span className="m_heart">{message.likes.length > 0 ? <><FavoriteBorderIcon />{message.likes.length}</> : null}</span>
            </div>
            
        );
    } else if (message.type === messageenum.image) {
        return (
            <> <Meesageimagemodal close={closemodal} str={imageurl}/>
            <div key={message._id} ref={messagelistref} className={my ? "messages_message messages_message_my" : "messages_message messages_message_other"} >
                <div className="messages_userimage">
                    {message?.senter?.avatar?.length > 2
                        ? <img width="70%" height="70%" src={ message.senter.avatar} alt="image" />
                        : <div className="room__user-plceholder room__user-plceholder-message">
                        {message.senter.name[0].toUpperCase()} {message.senter.surename[0].toUpperCase()}
                    </div>
                    }
                </div>
                <div className={message.images.length === 1
                    ? "message__images message__images-one"
                    : "message__images message__images-many"
                }>
                    {
                        message.images.map(el => {
                            return <div key={el}>
                                <img
                                onClick={()=>setimageurl(el)}
                                 width={message.images.length === 1 ? "130px" :"70px"} 
                                 height={message.images.length === 1? "130px" :"70px"} 
                                 src={el}
                                 alt='image'/>
                            </div>
                        })
                    }
                </div>

                <span className="m_time">{moment(message.createdAt).format('LLL')}</span>
                <span className="m_heart">{message.likes.length > 0 ? <><FavoriteBorderIcon />{message.likes.length}</> : null}</span>
            </div>
            </>
        );
    } else if (message.type === messageenum.audio) {

        return (
            <div key={message._id} ref={messagelistref} className={my ? "messages_message messages_message_my" : "messages_message messages_message_other"} >
                <div className="messages_userimage">
                    {message?.senter?.avatar?.length > 2
                        ? <img width="100%" height="100%" src={message.senter.avatar} alt="image" />
                        : <div  className="room__user-plceholder room__user-plceholder-message">
                        {message.senter.name[0].toUpperCase()} {message.senter.surename[0].toUpperCase()}
                    </div>
                    }
                </div>
                   <audio controls src={message.text}></audio>
                <span className="m_time">{moment(message.createdAt).format('LLL')}</span>
                <span className="m_heart">{message.likes.length > 0 ? <><FavoriteBorderIcon />{message.likes.length}</> : null}</span>
            </div>
        );
    }
    else {
        return <></>
    }

}

export default Message;
