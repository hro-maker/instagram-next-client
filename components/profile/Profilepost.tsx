import React from 'react';
import { imageUrl } from '../../helpers/urls';
interface postt{
    coments: string[],
    likes: string[],
    _id: string,
    imageUrl: string
}
const Profilepost = ({post}:{post:postt}) => {
    console.log(post)
    return (
        
       <div className="profile_post-item">
           <div className="profile_post_overlay">
               <div className="post_likes_count">{post.likes.length}</div>
           <div id='heart' className="profile_post_likes"> </div>
           <div className="profile_post_coments">{post.coments.length}</div>
           <div></div>
           {/* <img style={{background:"none"}} src={comment} alt="" /> */}
           </div>
           <img src={imageUrl+post.imageUrl} width="100%" height="100%" alt={post.imageUrl} className="profile_post-image"></img>
       </div>
       
    );
}

export default Profilepost;
