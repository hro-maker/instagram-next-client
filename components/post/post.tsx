import React from 'react';
import heart from '../header/heartt.png'
import comment from './comment.png'
import message from '../header/messages.png'
import save from './save.png'
import moment from 'moment';
import user from './user.png'
const Post = ({ post }) => {
    console.log(post)
    return (
        <div className="post_item">
            <div className="post_top">
                <img src={post.user.avatar ? post.user.avatar : user} alt="ssssssss" className="post_user_image" />
                <div className="post_username">{post.user.name}         {post.user.surename}</div>
                <div className="three_dots">...</div>
            </div>
            <img src={post.imageUrl} alt="post_foto" className="post_foto" />
            <div className="post_footer">
                <div>
                    <img src={heart} className="post_footer_item" alt="likeeee" width="30px" height="30px" />
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
            <div className="post_timestamp">
            {moment(post.createdAt).startOf(new Date(post.createdAt).getHours()).fromNow()}
            </div>
        </div>
    );
}

export default Post;
