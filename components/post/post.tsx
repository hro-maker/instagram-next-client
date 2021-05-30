import React, { useState } from 'react';
import heart from '../header/heartt.png'
import comment from './comment.png'
import message from '../header/messages.png'
import save from './save.png'
import moment from 'moment';
import user from './user.png'
import smile from './smile.png'
import { Picker } from 'emoji-mart'
import { imageUrl } from './../../helpers/urls';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link'
import { parseCookies } from 'nookies';
import { Api } from './../../utiles/api';
const Post = ({ post:postt }) => {
    const router=useRouter()
    const [emojibicker, setemojibicker] = useState(false);
    const [commenttext, setcommenttext] = useState('');
    const [post, setpost] = useState(postt);
    
    const onselect = (emoji: any, e) => {
        e.stopPropagation()
        setcommenttext(prev => prev + emoji.native)

    }
    const closes = (e: any) => {
        setemojibicker(false)
    }
    const togglewmoji = (e: MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setemojibicker(!emojibicker)
    }
    const cookies = parseCookies()
  
    const togglelike =async()=>{

        const likedpost=await   Api({},cookies.token).togglelike(post._id)
        setpost(likedpost)
        
    }
    return (
        <div onClick={closes} className="post_item">
            <div className="post_top">
                
                <img onClick={()=>router.push('/profile/'+post.user._id)} src={post.user.avatar ? imageUrl+post.user.avatar : user} alt="ssssssss" className="post_user_image" />
                <Link  href={'/profile/'+post.user._id}><a className="post_username">{post.user.name}         {post.user.surename}</a></Link>
                
                <div className="three_dots">...</div>
            </div>
            <img src={imageUrl+post.imageUrl} alt="post_foto" className="post_foto" />
            <div className="post_footer">
                <div>
                    <img onClick={togglelike} src={heart} className="post_footer_item" alt="likeeee" width="30px" height="30px" />
                    <img src={comment} className="post_footer_item" alt="comment" width="30px" height="30px" />
                    <img src={message} className="post_footer_item" alt="comment" width="30px" height="30px" />
                </div>
                <div>
                    <img src={save} className="post_footer_item" alt="comment" width="30px" height="30px" />
                </div>
            </div>
            <div className="like_counter">
                {post.likes?.length}  likes
           </div>
            <div className="post_comments">
                View all  {post.coments.length} comments
           </div>
            <div className="post_timestamp">
                {moment(post.createdAt).startOf(new Date(post.createdAt).getHours()).fromNow()}
            </div>
            <div className="post_form">
                <div style={{ margin: "0 auto" }}>
                    <form style={{ position: 'relative' }} className="post_form" >
                        <button className="postemoji_btn" onClick={togglewmoji}><img className="postemoji" src={smile} alt="sssssssssss" /></button>
                        <input
                            value={commenttext}
                            onChange={(e) => setcommenttext(e.target.value)}
                            className="post_coment_input"
                            placeholder="Add a comment…"
                            type="text" />
                        <button >Comment</button>
                        {emojibicker ? <Picker
                            style={{ position: 'absolute', width: "290px", bottom: '45px', left: '2px' }}
                            onClick={onselect}
                        /> : null}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Post;
