import React, { FC, useEffect, useState } from 'react';
import { Api } from './../../utiles/api';
import userImage from '../header/user.png'
import Loaderr from '../loader';
import { subscruser } from './../profile/profilemodal';
import { useRouter } from 'next/dist/client/router';
import { useAppSelector } from '../../hooks/redux';
import { parseCookies } from 'nookies';
import { useDispatch } from 'react-redux';
import { changeuser } from '../../redux/slices/userslice';
import {BiUserCircle } from "react-icons/bi";
interface props{
    type:string,
    id:string,
    close:any
}
const Likesmodal:FC<props> = ({type,id,close}) => {
    const [subscripers, setusers] = useState<subscruser[]>([]);
    const [loading, setloading] = useState(false);
    const router=useRouter()
    useEffect(() => {
        (async()=>{
            setloading(true)
            let userss=[]
            if(id){
                if(type==="c"){
                    userss=await Api().getlikesbycomentid(id)
                }else{
                    userss=await Api().getlikesbypostid(id)
                }
            }
            setusers(userss)
            setloading(false)
        })()
        return ()=>{
            setusers([])
        }
    }, []);
    const user=useAppSelector(state=>state.user.user)
    const cookies=parseCookies()
    const subscr = async (name,userId) => {
        console.log("ssssssssss",name,userId)
        setloading(true)
        if(name==='s'){
            const answer =await  Api({}, cookies.token).subscrip(userId)
            console.log(answer)
        }else if(name === 'u'){
            const answer =await  Api({}, cookies.token).unsubscrip(userId)
            console.log(answer)
        }
        setloading(false)
    }
    const dispatch=useDispatch()
    const togglesubscr=async(name,userId)=>{
        setloading(true)
        await subscr(name,userId)
        const user = await Api({}, cookies.token).getMe()
        dispatch(changeuser(user))
        setloading(false)
    }
   
    return (
        <div className="subscripers_modal_overlay better_overlay">
            {loading ? <div className="userloading">
                <Loaderr />
            </div> : <div className="subscripers_modal-body">
                <div onClick={() => close()} className="post_modal_close">&times;</div>
                {
                    subscripers.length > 0 ? subscripers.map(el =>
                        <div key={el._id} className="subscrip_post">
                         {el.avatar 
                                ? <img
                                onClick={() => {
                                    router.push(`/profile/${el._id}`)
                                    close()
                                }}
                                className="modal_othertop-avatar profile-userimage likes__modal-placeholder"
                                src={el.avatar}
                                width="35px"
                                height="35px"
                                alt="sssss" /> 
                                : <BiUserCircle
                                className="likes__modal-placeholder"
                                onClick={() => {
                                    router.push(`/profile/${el._id}`)
                                    close()
                                }}
                                width="70px"
                                height="70px"/>}   
                                
                        
                                <div
                                onClick={() => {
                                    router.push(`/profile/${el._id}`)
                                    close()
                                }}
                                style={{cursor:"pointer"}}
                                className="profile_modal-username  profile_modal-username-flex"> {el.name} {el.surename}</div>

                          
                            {String(user._id) === String(el._id) ? null : <span>{user.Isub?.some(elem => String(elem._id) === String(el._id))
                                ? <button
                                    onClick={() => togglesubscr("u", el._id)}
                                    className="profile_subscr">unsubscr</button>
                                : <button
                                 onClick={() => togglesubscr("s", el._id)} 
                                 className="profile_unsubscr">subscr</button>}</span>}
                        </div>
                    ) : <div>you dont have</div>
                }
            </div>
            }
        </div>
    );
}

export default Likesmodal;
