import React from 'react';
import { comenttype } from '../../interfaces/components';
import { useRouter } from 'next/dist/client/router';
import { imageUrl } from '../../helpers/urls';
import Link from 'next/link';
import moment from 'moment';

const Coment = ({coment}:{coment: comenttype}) => {
    console.log(coment)
    const router = useRouter()
    return (
        <div className="modal_coment_wraper">
            <img
                onClick={() => router.push('/profile/' + coment.userId?._id)}
                className="modal_othertop-avatar"
                src={imageUrl + coment.userId?.avatar}
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
                        {moment(coment.createdAt).startOf(new Date(coment.createdAt).getHours()).fromNow()}
                   </span>
               </div>
            </div>
        </div>
    );
}

export default Coment;

