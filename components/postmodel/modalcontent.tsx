import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { imageUrl } from '../../helpers/urls';
import { Modlacontext } from '../post/post';
import { useRouter } from 'next/dist/client/router';
import { comenttype, posttype } from './../../interfaces/components/index';
import Coment from './coment';
import smile from '../post/smile.png'
import { Picker } from 'emoji-mart';
import { parseCookies } from 'nookies';
import { Api } from '../../utiles/api';

const Modalcontent = ({ post, coments: comentsi }: { post: posttype, coments: comenttype[] }) => {
    const cookies = parseCookies()
    const [commenttext, setcommenttext] = useState<string>('');
    const [emojibicker, setemojibicker] = useState<boolean>(false);
    const [coments, setcoments] = useState<comenttype[]>([]);
    const router = useRouter()
    const closemodal = useContext(Modlacontext)
    const [postt, setpostt] = useState(post);
    const onselect = (emoji: any, e) => {
        e.stopPropagation()
        setcommenttext(prev => prev + emoji.native)
    }
    const togglewmoji = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        setemojibicker(!emojibicker)
    }
    useEffect(() => {
        setcoments(comentsi)
    }, [comentsi])
    const addcoment = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const coment = {
            text: commenttext,
            postId: post._id
        }
        if (coment.text.trim().length === 0) {
            return
        }
        await Api({}, cookies.token).addcoment(coment).then(async()=>{
                 const data=await   Api({},cookies.token).getcoments(post._id)
                 console.log(data)
                 setcoments(data)
        })
        setcommenttext("")
        
    }
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
                    {coments.map(el => {
                        return <Coment
                            key={el._id}
                            coment={el}
                        />
                    })}
                </div>
                <form onSubmit={(e) => addcoment(e)} style={{ position: 'relative' }} className="modal_post_form" >
                    <button
                        className="postemoji_btn"
                        style={{marginBottom:"-20px"}}
                        onClick={togglewmoji}>
                        <img className="postemoji"
                            src={smile}
                            alt="sssssssssss" />
                    </button>
                    <input
                        value={commenttext}
                        onChange={(e) => setcommenttext(e.target.value)}
                        className="modal_coment_input"
                        placeholder="Add a comment…"
                        type="text" />
                    <button type="submit">Comment</button>
                    {emojibicker ? <Picker
                        style={{ position: 'absolute', width: "290px", bottom: '45px', left: '2px' }}
                        onClick={onselect}
                    /> : null}
                </form>
            </div>
        </div>
    );
}

export default Modalcontent;
