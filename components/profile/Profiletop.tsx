import React from 'react';
import { imageUrl } from '../../helpers/urls';
import settings from '../settinks.png'
import { userr } from '../../interfaces/profile/index';
import { useAppSelector } from '../../hooks/redux';
import userimage from '../header/user.png'
import { Api } from '../../utiles/api';
import { parseCookies } from 'nookies';
const cookies = parseCookies()
const Myprofile=()=>{
    return <div className="edit_btns">
        <button className="edit_profile-btn">Edit Profile</button>
        <button className="settincs_profile-btn"><img  src={settings}height="40px" width="40px" alt="" /></button>
    </div>
}

const Dontsubscripetuser=({userId})=>{
    const subscrip=async()=>{
            const answer=Api({},cookies.token).subscrip(userId)
            console.log(answer)
    }
    return <div className="edit_btns">
        <button  onClick={subscrip} className="edit_profile-btn">Subscrip</button>
    </div>
}
const Subscriptpost=()=>{
    return <div className="edit_btns">
        <button className="edit_profile-btn">unSubscrip</button>
    </div>
}
const Profiletop = ({other}:{other:userr}) => {
    const user=useAppSelector(state=>state.user.user)
    return (
        <div className="profile_information">
        <div className="image_wraper">
            <div className="image_item">
                <img className="profile_image" width="180px" height="180px" src={other.avatar.length >1 ? imageUrl+other.avatar : userimage} alt="avatar" />
            </div>
        </div>
        <div>
        <div className="username_btns">
            <div className="profile_username">{other.name} {other.surename}</div>
            {
                user._id == other._id ? <Myprofile/> : <>
            {other.otherSub.some(el=>String(el)===String(user._id))
                            ? <Subscriptpost/>
                            : <Dontsubscripetuser userId={other._id}/>
                            }
                </>
            }
        </div >
        <div className="profile_counters">
        <div className="profile_counter">{other.posts.length} posts</div>
        <div className="profile_counter">{other.otherSub.length} followers</div>
        <div className="profile_counter">{other.Isub.length} following</div>
        </div>
        <div className="profile_user_information">
            information
                    {other.information}
             </div>
        
        </div>
    </div>
    );
}

export default Profiletop;
