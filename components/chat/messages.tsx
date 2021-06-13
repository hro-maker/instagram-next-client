import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { messagetype } from '../../interfaces/components/chat';

const Messages = ({mesages}:any) => {
    const [messages, setmessages] = useState<messagetype[]>(mesages);
    const me=useAppSelector(state=>state.user.user)
    useEffect(() => {
        setmessages(mesages)
    }, [mesages]);
    return (
        <div className="messages_container">
        {
            messages.map((el)=>{
                if(String(me._id)===String(el.senter._id)){
                    return <div key={el._id} className="messages_message messages_message_my">
                            {el.text}
                    </div>
                }else{
                    return <div key={el._id} className="messages_message messages_message_other">
                             {el.text}
                    </div>
                }
            })
          }
        </div>
    );
}

export default Messages;
