import React, { FC } from 'react';
import { imageUrl } from '../../helpers/urls';
import { messageenum, messagetype } from './../../interfaces/components/chat';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AudioPlayer from 'react-h5-audio-player';

import moment from 'moment';
type Messageprops = {
    message: messagetype,
    my?: boolean
}
const Controlsection=()=>{
        return <div style={{backgroundColor:"black"}}>|| </div>
}
const Message: FC<Messageprops> = ({ message, my }) => {
    if (message.type === messageenum.message) {
        return (
            <div key={message._id} className={my ? "messages_message messages_message_my" : "messages_message messages_message_other"} >
                <div className="messages_userimage">
                    {message?.senter?.avatar?.length > 2
                        ? <img width="100%" height="100%" src={imageUrl + message.senter.avatar} alt="image" />
                        : <PermIdentityIcon style={{ width: "100%", height: "100%" }} />
                    }
                </div>
                <div className="message_text">
                    {message.text}
                </div>
                <span className="m_time">{moment(message.createdAt).format('LLL')}</span>
                <span className="m_heart">{message.likes.length > 0 ? <><FavoriteBorderIcon />{message.likes.length}</> : null}</span>
            </div>
        );
    } else if (message.type === messageenum.image) {
        return (
            <div key={message._id} className={my ? "messages_message messages_message_my" : "messages_message messages_message_other"} >
                <div className="messages_userimage">
                    {message?.senter?.avatar?.length > 2
                        ? <img width="100%" height="100%" src={imageUrl + message.senter.avatar} alt="image" />
                        : <PermIdentityIcon style={{ width: "100%", height: "100%" }} />
                    }
                </div>
                {
                    message.images.map(el => {
                        return <div key={el}>
                            <img width="50px" height="50px" src={el} alt={el} />
                        </div>
                    })
                }
                <span className="m_time">{moment(message.createdAt).format('LLL')}</span>
                <span className="m_heart">{message.likes.length > 0 ? <><FavoriteBorderIcon />{message.likes.length}</> : null}</span>
            </div>
        );
    } else if (message.type === messageenum.audio) {
        return (
            <div key={message._id} className={my ? "messages_message messages_message_my" : "messages_message messages_message_other"} >
                <div className="messages_userimage">
                    {message?.senter?.avatar?.length > 2
                        ? <img width="100%" height="100%" src={imageUrl + message.senter.avatar} alt="image" />
                        : <PermIdentityIcon style={{ width: "100%", height: "100%" }} />
                    }
                </div>
                <AudioPlayer
                style={{
                    backgroundColor:"#000",
                    borderRadius:"10px",
                    color:"#fff",
                    width:"80%"
                }}
                autoPlayAfterSrcChange={false}
                layout="horizontal"
                showJumpControls={false}
                showFilledProgress={false}
                showSkipControls={false}
                customAdditionalControls={[""]}
                    src={message.text}
                    onPlay={e => console.log("onPlay")}
                />
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
