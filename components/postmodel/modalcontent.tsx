import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { imageUrl } from '../../helpers/urls';
import { Modlacontext } from '../post/post';
import { useRouter } from 'next/dist/client/router';
import { posttype } from './../../interfaces/components/index';

const Modalcontent = ({post,coments}:{post:posttype,coments:any}) => {
   const router=useRouter()
    const closemodal=useContext(Modlacontext)
    const [postt, setpostt] = useState(post);
    return (
        <div className="modal_content">
              <div onClick={closemodal} className="post_modal_close">&times;</div>
              <div className="modal_image">
              <img width="100%" height="100%" src={imageUrl + postt.imageUrl} alt="sssss" />
              </div>
              <div className="other_content">
                  <div className="modal_othertop">
                      <img onClick={()=>router.push('/profile/'+post.user._id)}  className="modal_othertop-avatar" src={imageUrl+postt.user.avatar} width="40px" height="40px" alt="" />
                       <Link href={'/profile/'+post.user._id}> 
                       <a className="modal_othertop_username">{postt.user._id} {postt.user.surename}</a>
                        </Link>
                  </div>
                  <div className="modal_otherbody">
                      sakjdh
                      </div>  
              </div>
          </div>
    );
}

export default Modalcontent;
