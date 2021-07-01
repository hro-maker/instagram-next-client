import React, { createContext, useEffect, useState } from 'react';
import { imageUrl } from '../../helpers/urls';
import { userr } from '../../interfaces/profile/index';
import { useAppSelector } from '../../hooks/redux';
import userimage from '../header/user.png'
import { Api } from '../../utiles/api';
import { parseCookies } from 'nookies';
import { Dontsubscripetuser, Myprofile, Subscriptpost } from './Buttons';
import Loaderr from '../loader';
import Usersmodal from './profilemodal';
import useSocket from './../../hooks/useSocket';
const cookies = parseCookies()
import {  BiUserCircle } from "react-icons/bi";
export const Profiemodalcontext=createContext(async(name:any,userId:any):Promise<void>=>{})
export const Subscrcontext=React.createContext((name:any,userId:any)=>{})
const Profiletop = ({ oter }: { oter: userr }) => {
    const [other, setother] = useState(oter);
    const user = useAppSelector(state => state.user.user)
    const [loading, setloading] = useState(false);
    const [subscripertype, setsubscripertype] = useState<string>('u');
    const [subscripersmodall, setsubscripersmodall] = useState<boolean>(false);
    const socket=useSocket()
    const subscr = async (name,userId) => {
        setloading(true)
        if(name==='s'){
            const answer =await  Api({}, cookies.token).subscrip(userId)
            socket.emit('@Client:event_follow',{subject:user._id,object:userId,post:''})
            console.log(answer)
        }else if(name === 'u'){
            const answer =await  Api({}, cookies.token).unsubscrip(userId)
            console.log(answer)
        }
        const userr=await Api({},cookies.token).userbyId(other._id)
        setother(userr)
        setloading(false)
    }
    const closemodall=()=>{
           setsubscripersmodall(false)
    }
    useEffect(() => {
        setother(oter)
        return ()=>{
                setother({})
        }
    }, [oter]);
    // if(loading){
    //     return   <div className="profile_information"><div className="userloading">
    //         <Loaderr/>
    //         </div>
    //     </div>
    // }
    return (
        <div className="profile_information">
            <Profiemodalcontext.Provider value={subscr}>
           {subscripersmodall ?  <Usersmodal close={closemodall} userId={other._id} type={subscripertype}/> : null}
            </Profiemodalcontext.Provider>
            <div className="image_wraper">
                <div className="image_item">
                   {other.avatar.length > 1 ?  <img className="profile_image" 
                    width="180px" 
                    height="180px" 
                    src={imageUrl + other.avatar } alt="avatar" />
                    : <BiUserCircle className="profile__user-placeholder"/> }
                </div>
            </div>
            <div>
                <div className="username_btns">
                    <Subscrcontext.Provider value={subscr}>
                    <div className="profile_username">{other.name} {other.surename}</div>
                    {
                        user._id == other._id ? <Myprofile /> : <>
                            {other.otherSub.some(el => String(el) === String(user._id))
                                ? <Subscriptpost loading={loading} userId={oter._id} />
                                : <Dontsubscripetuser loading={loading} userId={oter._id} />
                            }
                        </>
                    }
                    </Subscrcontext.Provider>
                </div >
                <div className="profile_counters">
                    <div className="profile_counter">{other.posts.length} posts</div>
                    <div style={{cursor:"pointer"}} onClick={()=>{
                        setsubscripertype("u")
                        setsubscripersmodall(true)
                    }} className="profile_counter">{other.otherSub.length} followers</div>
                    <div style={{cursor:"pointer"}}
                    onClick={()=>{
                        setsubscripertype("i")
                        setsubscripersmodall(true)
                    }}
                    className="profile_counter">{other.Isub.length} following</div>
                </div>
                <div className="profile_user_information">
                    {other.information}
                </div>

            </div>
        </div>
    );
}

export default Profiletop;
