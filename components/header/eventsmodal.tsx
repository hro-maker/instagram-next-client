import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import Event from './event'
const Eventsmodal = ({close}:any) => {
    const events=useAppSelector(state => state.chat.events)
    const closemodal=(e:any)=>{
        if(e.target.className === "events_modal_overlay"){
            close()
        }
    }
    return (
        <div onClick={(e)=>closemodal(e)} className="events_modal_overlay">
            <div className="eventsmodal">
                {events?.map(el=>{
                    return <Event key={el._id} event={el}/>
                })}
            </div>
        </div>
        
    );
}

export default Eventsmodal;
