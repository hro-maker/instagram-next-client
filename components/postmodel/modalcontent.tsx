import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { imageUrl } from '../../helpers/urls';
import { Modlacontext } from '../post/post';
import { useRouter } from 'next/dist/client/router';
import comment from '../post/poststutic/comment.png'
import { comenttype, posttype } from './../../interfaces/components/index';
import Coment from './coment';
import message from '../header/messages.png'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import heart from '../header/heartt.png'
import smile from '../post/poststutic/smile.png'
import { Picker } from 'emoji-mart';
import { parseCookies } from 'nookies';
import { Api } from '../../utiles/api';
import moment from 'moment';
import { useAppSelector } from '../../hooks/redux';
import { useDispatch } from 'react-redux';
import { fetchcoments } from './../../redux/thunkactions';
import Likesmodal from './../likesmodal/index';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import { changeposts, changeuser } from '../../redux/slices/userslice';
import Thredots from '../post/Thredots';
import Loaderr from '../loader';
import useSocket from './../../hooks/useSocket';
const Modalcontent = ({ post, coments: comentsi,useclose=true }: { post: posttype, coments: comenttype[],useclose:boolean }) => {
    const inputref = useRef<HTMLInputElement>()
    const [id, setid] = useState('');
    const [type, settype] = useState('');
    const [likemodal, setlikemodal] = useState(false);
    const dispatch=useDispatch()
    const [dotsmodal, setdotsmodal] = useState(false);
    const cookies = parseCookies()
    const userslice=useAppSelector(state=>state.user)
    const [emojibicker, setemojibicker] = useState<boolean>(false);
    const [coments, setcoments] = useState<comenttype[]>([]);
    const [liked, setliked] = useState<boolean>(false);
    const [loadingg, setloadingg] = useState(false);
    const router = useRouter()
    const closemodal = useContext(Modlacontext)
    const [postt, setpostt] = useState(post);
    const onselect = (emoji: any,e) => {
        e.stopPropagation()
        inputref.current.value=`${inputref?.current?.value}${emoji.native}`
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
            text: inputref?.current?.value,
            postId: post._id
        }
        if (coment.text?.trim().length === 0) {
            return
        }
        await Api({}, cookies.token).addcoment(coment).then(async(dat)=>{
            socket.emit('@Client:event_comment',{
                subject:userslice.user._id,
                object:post.user._id,
                post:post._id,
                comment:inputref?.current?.value,
                comentId:dat.coment._id
            })
                 const data=await   Api({},cookies.token).getcoments(post._id)
                 console.log(data)
                 setcoments(data)
        })
        inputref.current.value =""
    }
    const socket=useSocket()
    const togglelike = async () => {
        const likedpost = await Api({}, cookies.token).togglelike(post._id)
        if(!liked){
            socket.emit('@Client:events_like',{subject:userslice.user._id,object:post.user._id,post:post._id})
        }
        setpostt(likedpost)
    }
    useEffect(() => {
        console.log(postt)
        if (postt?.likes?.length && postt?.likes?.some(el => String(el) === String(userslice.user._id))) {
            setliked(true)
        } else {
            setliked(false)
        }
    }, [postt]);
    useEffect(()=>{
        dispatch(fetchcoments(post._id))
    },[])
    const close=()=>{
        setlikemodal(false)
    } 
    const dotsmodalclose=()=>{
        setdotsmodal(false)
      }

      const savepost=async()=>{
          setloadingg(true)
            const answer=await Api({},cookies.token).togglesavepost(post._id)
            if(answer){
                const posts=await Api({},cookies.token).subscripersposts() 
                dispatch(changeposts(posts))
                const me=await Api({},cookies.token).getMe()
                dispatch(changeuser(me))
            }
            setloadingg(false)
            dotsmodalclose()
      }
      const updatepostt=async(id,description)=>{
            const newpost=await Api({},cookies.token).updatedescription({id,description})
            if(newpost){
                setpostt(newpost)
            }
                dotsmodalclose()
      }
      if(loadingg){
        return <div className="loader_wraper-mini"><Loaderr/></div>
      }
    return (
        <>
         {dotsmodal ?  <Thredots savepost={savepost} updatepostt={updatepostt} postId={post._id} close={dotsmodalclose}/> :null}
       {likemodal ?  <Likesmodal type={type} close={close} id={id}/>:null}
        <div className="modal_content">
            {useclose ? <div onClick={closemodal} className="post_modal_close">&times;</div> : null}
            <div className="modal_image">
         {  postt.imageUrl?.length > 2  ? <img width="100%" height="100%" src={imageUrl + postt.imageUrl} alt="sssss" /> : <PersonSharpIcon/>}
            </div>
            <div className="other_content">
                <div className="modal_othertop">
                {  postt.user?.avatar?.length > 2 
                 ? <img
                        onClick={() => router.push('/profile/' + postt.user?._id)}
                        className="modal_othertop-avatar"
                        src={imageUrl + postt.user?.avatar}
                        width="40px"
                        height="40px"
                        alt="modal_othertop-avatar" /> 
                        : <PersonSharpIcon/>}
                    
                    <Link href={'/profile/' + postt.user?._id}>
                        <a className="modal_othertop_username">{postt.user?.name} {postt.user?.surename}</a>
                    </Link>
                    <div onClick={()=>setdotsmodal(true)}  className="three_dots three_dots-rigth"></div>
                </div>
                <div className="modal_otherbody">
                    {coments.map(el => {
                        return <Coment
                        onClick={(e)=>{
                            e.stopPropagation()
                            settype('c')
                            setid(el._id)
                            setlikemodal(true)
                        }} 
                            key={el._id}
                            coment={el}
                        />
                    })}
                </div>
                <div style={{marginTop:"10px"}} className="post_footer">
                <div>
                    {liked
                        ? <div onClick={togglelike} id="hearti" style={{ width: "30px" }}></div>
                        : <img onClick={togglelike} src={heart} className="post_footer_item post_footer_item-like" alt="likeeee" width="30px" height="30px" />}
                    <img src={comment} onClick={()=>inputref.current?.focus()}  className="post_footer_item" alt="comment" width="30px" height="30px" />
                    <img src={message} className="post_footer_item" alt="comment" width="30px" height="30px" />
                </div>
                <div>
                { userslice.user.saved.some(el=>String(el)===String(post._id))
                  ? <BookmarkIcon onClick={savepost}  style={{fontSize:"30px",cursor:"pointer"}}/> 
                  : <BookmarkBorderIcon onClick={savepost} style={{fontSize:"30px",cursor:"pointer"}}/>}
                </div>
            </div>
            <div onClick={(e)=>{
                e.stopPropagation()
                settype('f')
                setid(post._id)
                setlikemodal(true)
            }} className="like_counter">
                {postt.likes?.length}  likes
           </div>
            <div className="post_timestamp">
                {moment(postt.createdAt).startOf(Date.now()).fromNow()}
            </div>
                <form onSubmit={(e) => addcoment(e)} style={{ position: 'relative' }} className="modal_post_form" >
                    <div
                        className="postemoji_btn"
                        style={{marginBottom:"-20px"}}
                        onClick={togglewmoji}>
                        <img className="postemoji"
                            src={smile}
                            alt="sssssssssss" />
                    </div>
                    <input
                        ref={inputref}
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
        </>
    );
}

export default Modalcontent;
