import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { imageUrl } from '../../helpers/urls';
import { Modlacontext } from '../post/post';
import { useRouter } from 'next/dist/client/router';
import { comenttype, posttype } from './../../interfaces/components/index';

const Modalcontent = ({ post, coments }: { post: posttype, coments: comenttype }) => {
    const router = useRouter()
    const closemodal = useContext(Modlacontext)
    const [postt, setpostt] = useState(post);
    return (
        <div className="modal_content">
            <div onClick={closemodal} className="post_modal_close">&times;</div>
            <div className="modal_image">
                <img width="100%" height="100%" src={imageUrl + postt.imageUrl} alt="sssss" />
            </div>
            <div className="other_content">
                <div className="modal_othertop">
                    <img
                        onClick={() => router.push('/profile/' + post.user._id)}
                        className="modal_othertop-avatar"
                        src={imageUrl + postt.user.avatar}
                        width="40px"
                        height="40px"
                        alt="modal_othertop-avatar" />
                    <Link href={'/profile/' + post.user._id}>
                        <a className="modal_othertop_username">{postt.user.name} {postt.user.surename}</a>
                    </Link>
                </div>
                <div className="modal_otherbody">
                        {
                            post.description.length > 0  ?  <div className="modal_coment_wraper">
                            <img
                            onClick={() => router.push('/profile/' + post.user._id)}
                            className="modal_othertop-avatar"
                            src={imageUrl + postt.user.avatar}
                            width="40px"
                            height="40px"
                            alt="modal_othertop-avatar" />
                            <div>{post.description}</div>
                            </div>

                            : null

                        }
                </div>
            </div>
        </div>
    );
}

export default Modalcontent;
