import React, { useContext, useEffect, useState } from 'react';
import { comenttype } from '../../interfaces/components';
import { useRouter } from 'next/dist/client/router';
import { imageUrl } from '../../helpers/urls';
import Link from 'next/link';
import moment from 'moment';
import { Api } from '../../utiles/api';
import { parseCookies } from 'nookies';
import { Delecomentcontext } from './index';
import { useAppSelector } from '../../hooks/redux';
import userimage from '../header/user.png'

const Coment = ({ coment: commentt,onClick }: { coment: comenttype,onClick:any }) => {
    const cookies = parseCookies()
    const [coment, setcoment] = useState(commentt);
    const [comentdeletemodal, setcomentdeletemodal] = useState<boolean>(false);
    useEffect(() => {
        setcoment(commentt)
    }, [])
    const user=useAppSelector(state=>state.user.user)
    const deletecoment = useContext(Delecomentcontext)
    const togglelike = async () => {
        const newcoment = await Api({}, cookies.token).toglecomentlike(coment._id as string)
        setcoment(newcoment)
    }
    const tooglecomentmodal = () => {
        setcomentdeletemodal(!comentdeletemodal)
    }
    const router = useRouter()
    return (
        <div className="modal_coment_wraper">
            {
                comentdeletemodal ? <div className="deletecomentoverlay">
                    <div className="deletecoment_modal-body">
                        <div onClick={tooglecomentmodal} className="post_modal_close comment_delete-close">&times;</div>
                        <button onClick={() => {
                            deletecoment({ comentId: coment._id, postId: coment.postId })
                            tooglecomentmodal()
                        }} className="deletecoment_modal-delete">delete coment</button>
                        <button onClick={tooglecomentmodal} className="deletecoment_modal-cancell">cancell</button>
                    </div>
                </div> : null
            }
            <img
                onClick={() => router.push('/profile/' + coment.userId?._id)}
                className="modal_othertop-avatar"
                src={coment?.userId?.avatar?.length  ?  imageUrl + coment.userId?.avatar : userimage}
                width="40px"
                height="40px"
                alt="modal_othertop-avatar" />
            <div className="coment_text_wraper">
                <Link href={`/profile/${coment.userId?._id}`}>
                    <a>{coment.userId?.name} {coment.userId?.surename}</a>
                </Link>
                <span>{coment.text}</span>
                <div className="modal_coment_other">
                    <span className="modal_coment_time">
                        {moment(coment.createdAt).startOf(Date.now()).fromNow()}
                        <div onClick={(e)=>onClick(e)}>{coment.likes?.length} likes</div>
                        {Array.isArray(coment.likes) ? <div className="coment_answer">answer</div> : null}
                    </span>
                </div>
            </div>
            <div style={{ display: "inline-block" }} className="like_delet">
               {
                   String(user._id) == String(coment.userId?._id) ?  <div onClick={tooglecomentmodal} className="three_dots"></div> : null 
               }
                <div onClick={togglelike} className="coment_heart"></div>
            </div>
        </div>
    );
}

export default Coment;

