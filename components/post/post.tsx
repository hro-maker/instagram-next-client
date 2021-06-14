import React, { useEffect, useState } from 'react';
import comment from './poststutic/comment.png'
import message from '../header/messages.png'
import moment from 'moment';
import user from './poststutic/user.png'
import smile from './poststutic/smile.png'
import { Picker } from 'emoji-mart'
import { imageUrl } from './../../helpers/urls';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link'
import { parseCookies } from 'nookies';
import { Api } from './../../utiles/api';
import Postmodal from '../postmodel';
import Likesmodal from '../likesmodal';
import Thredots from './Thredots';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { useDispatch } from 'react-redux';
import { changeposts, changeuser } from '../../redux/slices/userslice';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { useAppSelector } from '../../hooks/redux';
export const Modlacontext=React.createContext(()=>{})
const Post = ({ post: postt, user: userr }:any) => {
    const router = useRouter()
    const [emojibicker, setemojibicker] = useState<boolean>(false);
    const [postmodal, setpostmodal] = useState<boolean>(false);
    const [commenttext, setcommenttext] = useState<string>('');
    const [post, setpost] = useState(postt);
    const [liked, setliked] = useState<boolean>(false);
    const [likemodal, setlikemodal] = useState(false);
    const [dotsmodal, setdotsmodal] = useState(false);
    const [loadingg, setloadingg] = useState(false);
    const onselect = (emoji: any, e) => {
        e.stopPropagation()
        setcommenttext(prev => prev + emoji.native)
    }
    const userrr=useAppSelector(state=>state.user.user)
    const modalclose=()=>{
        setpostmodal(false)
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
    if(postmodal){
    if(process.browser){
        document.body.style.overflow = 'hidden'
    }
    }else{
        if(process.browser){
            document.body.style.overflow = 'unset' 
        }
       
    }
    const togglelike = async () => {
        const likedpost = await Api({}, cookies.token).togglelike(post._id)
        setpost(likedpost)
    }
    const addcoment=async(e: React.SyntheticEvent)=>{
        console.log("onsubmit")
        e.stopPropagation()
        e.preventDefault()
        const coment={
                text:commenttext,
                postId:post._id
        }
        if(coment.text.trim().length === 0){
                return 
        }
        const data=await Api({}, cookies.token).addcoment(coment)
        setcommenttext("")
        setpost(data.post)
    }
    useEffect(() => {
        if (post.likes?.some(el => String(el) === String(userr?._id))) {
            setliked(true)
        } else {
            setliked(false)
        }
    }, [post]);
   const close=()=>{
       setlikemodal(false)
   }
 const dotsmodalclose=()=>{
    setdotsmodal(false)
  }
  const dispatch=useDispatch()
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
            setpost(newpost)
        }
            dotsmodalclose()
  }
//   if(loadingg){
//     return <div className="loader_wraper-mini"><Loaderr/></div>
//   }
    return (
        <>
       {dotsmodal ?  <Thredots savepost={savepost} updatepostt={updatepostt} postId={post._id} close={dotsmodalclose}/> :null}
        {likemodal ?  <Likesmodal type="p" close={close} id={post._id}/>:null}
        <div onClick={closes} className="post_item">
           {postmodal ? <Modlacontext.Provider value={modalclose}> <Postmodal _id={post._id}/></Modlacontext.Provider> : null}
            <div className="post_top">
                <img onClick={() => router.push('/profile/' + post.user._id)} src={post.user.avatar ? imageUrl + post.user.avatar : user} alt="ssssssss" className="post_user_image" />
                <Link href={'/profile/' + post.user._id}><a className="post_username">{post.user.name}         {post.user.surename}</a></Link>

                <div onClick={()=>setdotsmodal(true)}  className="three_dots"></div>
            </div>
            <img src={imageUrl + post.imageUrl} alt="post_foto" onDoubleClick={togglelike} className="post_foto" />
            <div className="post_footer">
                <div>
                    {liked
                         ? <FavoriteIcon onClick={togglelike} style={{fontSize:"35px",color:"red",cursor:"pointer"}}/>
                         : <FavoriteBorderIcon onClick={togglelike} style={{fontSize:"35px",cursor:"pointer"}}/>}
                    <img src={comment} onClick={()=>router.push(`/post/${post._id}`)} className="post_footer_item" alt="comment" width="30px" height="30px" />
                    <img src={message} className="post_footer_item" alt="comment" width="30px" height="30px" />
                </div>
                <div>
                 { userrr.saved?.some(el=>String(el)===String(post._id))
                  ? <BookmarkIcon onClick={savepost}  style={{fontSize:"30px",cursor:"pointer"}}/> 
                  : <BookmarkBorderIcon onClick={savepost} style={{fontSize:"30px",cursor:"pointer"}}/>}
                </div>
            </div>
            <div className="post_description">
                {post.description}
            </div>
            <div onClick={(e)=>{
                e.stopPropagation()
                setlikemodal(true)
            }} className="like_counter">
                {post.likes?.length}  likes
           </div>
            <div onClick={()=>setpostmodal(true)} className="post_comments">
                View all  {post.coments.length} comments
           </div>
            <div className="post_timestamp">
                {moment(post.createdAt).startOf(new Date(post.createdAt).getHours()).fromNow()}
            </div>
            <div className="post_form">
                <div style={{ margin: "0 auto" }}>
                    <form onSubmit={(e)=>addcoment(e)} style={{ position: 'relative' }} className="post_form" >
                        <div style={{display:"inline-block"}} className="postemoji_btn" onClick={(e)=>{
                            e.stopPropagation()
                            togglewmoji(e)
                        }}><img className="postemoji" src={smile} alt="sssssssssss" /></div>
                        <input
                            value={commenttext}
                            onChange={(e) => setcommenttext(e.target.value)}
                            className="post_coment_input"
                            placeholder="Add a comment…"
                            type="text" />
                        <button type="submit" >Comment</button>
                        {emojibicker ? <Picker
                            style={{ position: 'absolute', width: "290px", bottom: '45px', left: '2px' }}
                            onClick={onselect}
                        /> : null}
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Post;
