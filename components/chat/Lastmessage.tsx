import React,{FC} from 'react';
import { messageenum } from '../../interfaces/components/chat';
interface lastmessageprps{
    last:{
        senter: string
        text: string
        type: string
        _id: string
    }
}
const Lastmessage:FC<lastmessageprps> = ({last}) => {
    if(last.type === messageenum.message){
        return (
            <span>
                {last.text}
            </span>
        );
    }
    if(last.type === messageenum.audio){
        return (
            <span>
                 audio
            </span>
        );
    }
    return (
        <span>
                file
        </span>
    );
}

export default Lastmessage;
