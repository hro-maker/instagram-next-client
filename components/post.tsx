import React from 'react';

const Post = ({post}) => {
    console.log(post)
    return (
        <div className="post_item">
           <div className="post_top">
               <img src={post.user.avatar} alt="ssssssss" className="post_user_image" />
               <div className="post_username">{post.user.name}         {post.user.surename}</div>
               <div className="three_dots">...</div>
           </div>
           <img src={post.imageUrl} alt="post_foto" className="post_foto" />
        </div>
    );
}

export default Post;
