import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { parseCookies } from 'nookies';
import { useAppSelector } from '../../hooks/redux';
import { deletepost } from '../../redux/slices/userslice';
import { useDispatch } from 'react-redux';
import { Api } from '../../utiles/api';

const Thredots = ({ updatepostt,close, postId ,savepost}) => {
    const cookies = parseCookies()
    const user = useAppSelector(state => state.user.user)
    const dispatch=useDispatch()
    const [updatemodal, setupdatemodal] = useState(false);
    const [descriptuonn, setdescriptuonn] = useState('');
   const deletepostt=async( )=>{
        const answer=await Api({},cookies.token).deletepost(postId)
        if(answer){
            dispatch(deletepost({postId}))
            close()
        }
   }

    return (
       <>
        <div className="post_modal_overlay post_modal_overlay-mini">
            
       <form onSubmit={(e)=>{
           e.preventDefault()
           updatepostt(postId,descriptuonn)
           }} className={!updatemodal ?  "updatepost_form" :  'updatepost_form updatepost_form-open'}>
       <div onClick={()=>setupdatemodal(false)} className="update_post-close">&times;</div>
           <input value={descriptuonn} onChange={(e)=>setdescriptuonn(e.target.value)} type="text" placeholder="post description" className="updatepost_input" />
           <button className="updatepost_input update_post-btn">update</button>
       </form>
            <div onClick={close} className="post_modal_close">&times;</div>
            <div className="modal_content modal_content-mini">
                <div onClick={deletepostt} className="thre_dots-item"><DeleteIcon style={{ marginRight: "10px" }} className="deleteicon" /><span>delete post</span> </div>
                <div onClick={()=>setupdatemodal(true)} className="thre_dots-item"><SettingsIcon style={{ marginRight: "10px" }} className="changeicon" /> update post</div>
                <div
                onClick={savepost}
                    className="thre_dots-item">
                    <BookmarkBorderIcon style={{ marginRight: "10px" }} />
                        {user.saved.some(el=>String(el)===String(postId)) ? 'unsave' : "save"}
                </div>
            </div>
        </div>
       </>
    );
}

export default Thredots;
