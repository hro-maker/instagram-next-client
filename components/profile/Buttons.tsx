import { parseCookies } from 'nookies';
import React,{useContext} from 'react';
import { Api } from '../../utiles/api';
import settings from '../settinks.png'
import { Subscrcontext } from './Profiletop';
import { useRouter } from 'next/dist/client/router';
import Loaderr from '../loader';
const cookies = parseCookies()
export const Myprofile = () => {
    const subscrcontext=useContext(Subscrcontext)
    const router=useRouter()
    return <div onClick={()=>router.push('/profile/edit')} className="edit_btns">
        <button className="edit_profile-btn">Edit Profile</button>
        <button className="settincs_profile-btn"><img src={settings} height="40px" width="40px" alt="" /></button>
    </div>
}

export const Dontsubscripetuser = ({ userId ,loading=false}: any) => {
    const subscrcontext=useContext(Subscrcontext)
    return <div style={loading ? {visibility:"hidden",opacity:0} : {visibility:'visible',opacity:1}} className="edit_btns edit_btns-unsubscr">
        <button onClick={()=>subscrcontext('s',userId)}className="edit_profile-btn">Subscrip</button>
    </div>
}
export const Subscriptpost = ({ userId ,loading=false}: any) => {
    const subscrcontext=useContext(Subscrcontext)
    return <div style={loading ? {visibility:"hidden",opacity:0} : {visibility:'visible',opacity:1}}  className="edit_btns edit_btns-subscr">
        <button onClick={()=>subscrcontext('u',userId)} className="edit_profile-btn">unSubscrip</button>
    </div>
}