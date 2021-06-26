import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Event from './event'
import { useDispatch } from 'react-redux';
import { readallevents } from '../../redux/slices/chatslice';
import { Api } from '../../utiles/api';
import { parseCookies } from 'nookies';
const Eventsmodal = ({close}:any) => {
    const events=useAppSelector(state => state.chat.events)
    const closemodal=(e:any)=>{
        if(e.target.className === "events_modal_overlay"){
            close()
        }
    }
    const dispatch=useDispatch()
    const cookies=parseCookies()
    useEffect(() => {   
           (async()=>{
               await Api({},cookies.token).readevents()
               dispatch(readallevents())
           })()
    }, []);
    return (
        <div onClick={(e)=>closemodal(e)} className="events_modal_overlay">
            <div className="eventsmodal">
                {events &&  [...events].reverse().map(el=>{
                    return <Event key={el._id} event={el}/>
                })}
            </div>
        </div>
        
    );
}

export default Eventsmodal;
