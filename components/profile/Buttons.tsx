import { parseCookies } from 'nookies';
import React,{useContext} from 'react';
import { Api } from '../../utiles/api';
import settings from '../settinks.png'
import { Subscrcontext } from './Profiletop';
const cookies = parseCookies()
export const Myprofile = () => {
    const subscrcontext=useContext(Subscrcontext)
    return <div className="edit_btns">
        <button className="edit_profile-btn">Edit Profile</button>
        <button className="settincs_profile-btn"><img src={settings} height="40px" width="40px" alt="" /></button>
    </div>
}

export const Dontsubscripetuser = ({ userId }: any) => {
    const subscrcontext=useContext(Subscrcontext)
    return <div className="edit_btns">
        <button onClick={()=>subscrcontext('s',userId)}className="edit_profile-btn">Subscrip</button>
    </div>
}
export const Subscriptpost = ({ userId }: any) => {
    const subscrcontext=useContext(Subscrcontext)
    return <div className="edit_btns">
        <button onClick={()=>subscrcontext('u',userId)} className="edit_profile-btn">unSubscrip</button>
    </div>
}