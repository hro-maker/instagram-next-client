import React from 'react';
import { imageUrl } from '../../helpers/urls';
import settings from '../settinks.png'
import { userr } from '../../interfaces/profile/index';
const Myprofile=()=>{
    return <div className="edit_btns">
        <button className="edit_profile-btn">Edit Profile</button>
        <button className="settincs_profile-btn"><img  src={settings}height="40px" width="40px" alt="" /></button>
    </div>
}
const Profiletop = ({other}:{other:userr}) => {
    return (
        <div className="profile_information">
        <div className="image_wraper">
            <div className="image_item">
                <img className="profile_image" width="180px" height="180px" src={imageUrl+other.avatar} alt="avatar" />
            </div>
        </div>
        <div>
        <div className="username_btns">
            <div className="profile_username">{other.name} {other.surename}</div>
            <Myprofile/>
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
