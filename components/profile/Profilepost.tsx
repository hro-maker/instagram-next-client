import React, { useState } from 'react';
import { imageUrl } from '../../helpers/urls';
import { Modlacontext } from '../post/post';
import Postmodal from '../postmodel';
interface postt{
    coments: string[],
    likes: string[],
    _id: string,
    imageUrl: string
}
const Profilepost = ({post}:{post:postt}) => {
  
    const [postmodal, setpostmodal] = useState<boolean>(false);
    const modalclose=()=>{
        setpostmodal(false)
    }
    return (
        
       <div className="profile_post-item">
            {postmodal ? <Modlacontext.Provider value={modalclose}> <Postmodal _id={post._id}/></Modlacontext.Provider> : null}
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
