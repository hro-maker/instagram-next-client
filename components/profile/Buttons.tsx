import React,{useContext} from 'react';
import { Subscrcontext } from './Profiletop';
import { useRouter } from 'next/dist/client/router';
import  Link  from 'next/link';
import { FiSettings } from "react-icons/fi";
export const Myprofile = () => {
    const router=useRouter()
    return <>
    <div onClick={()=>router.push('/profile/edit')} className="edit_btns">
    <button className="edit_profile-btn">Edit Profile</button>
    <button className="settincs_profile-btn"><FiSettings style={{cursor:"pointer"}} className="search__user-placeholder"/></button>
</div>
</>
}

export const Dontsubscripetuser = ({ userId ,loading=false}: any) => {
    const subscrcontext=useContext(Subscrcontext)
    return <> 
    <div style={loading ? {visibility:"hidden",opacity:0} : {visibility:'visible',opacity:1}} className="edit_btns edit_btns-unsubscr">
        <button onClick={()=>subscrcontext('s',userId)}className="edit_profile-btn">Subscrip</button>
        <Link href={`/direct/${userId}`} >
            <a >Message</a> 
            </Link>
    </div>

    </>
}
export const Subscriptpost = ({ userId ,loading=false}: any) => {
    const subscrcontext=useContext(Subscrcontext)
    return <>
    <div style={loading ? {visibility:"hidden",opacity:0} : {visibility:'visible',opacity:1}}  className="edit_btns edit_btns-subscr">
        <button onClick={()=>subscrcontext('u',userId)} className="edit_profile-btn">unSubscrip</button>
        <Link href={`/direct/${userId}`} >
            <a >Message</a> 
            </Link>
    </div>
    {/* <Link href={`/direct/${userId}`} ><a >Message</a> </Link> */}
    
    </>
}