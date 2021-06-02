import React, { useEffect, useState } from 'react';
import { imageUrl } from '../../helpers/urls';
import { userr } from '../../interfaces/profile/index';
import { useAppSelector } from '../../hooks/redux';
import userimage from '../header/user.png'
import { Api } from '../../utiles/api';
import { parseCookies } from 'nookies';
import { Dontsubscripetuser, Myprofile, Subscriptpost } from './Buttons';
import Loaderr from '../loader';
const cookies = parseCookies()
export const Subscrcontext=React.createContext((name:any,userId:any)=>{})
const Profiletop = ({ other: userrr }: { other: userr }) => {
    const [other, setother] = useState(userrr);
    const user = useAppSelector(state => state.user.user)
    const [loading, setloading] = useState(false);
    const subscr = async (name,userId) => {
        setloading(true)
        if(name==='s'){
            const answer =await  Api({}, cookies.token).subscrip(userId)
            console.log(answer)
        }else if(name === 'u'){
            const answer =await  Api({}, cookies.token).unsubscrip(userId)
            console.log(answer)
        }
        const userr=await Api({},cookies.token).userbyId(other._id)
        setother(userr)
        setloading(false)
    }
        if(loading){
            return <div className="userloading">
                <Loaderr/>
            </div>
        }
    // useEffect(() => {
    //     setother(userrr)
    // }, [])
    return (
        <div className="profile_information">
            <div className="image_wraper">
                <div className="image_item">
                    <img className="profile_image" width="180px" height="180px" src={other.avatar.length > 1 ? imageUrl + other.avatar : userimage} alt="avatar" />
                </div>
            </div>
            <div>
                <div className="username_btns">
                    <Subscrcontext.Provider value={subscr}>
                    <div className="profile_username">{other.name} {other.surename}</div>
                    {
                        user._id == other._id ? <Myprofile /> : <>
                            {other.otherSub.some(el => String(el) === String(user._id))
                                ? <Subscriptpost userId={other._id} />
                                : <Dontsubscripetuser userId={other._id} />
                            }
                        </>
                    }
                    </Subscrcontext.Provider>
                </div >
                <div className="profile_counters">
                    <div className="profile_counter">{other.posts.length} posts</div>
                    <div className="profile_counter">{other.otherSub.length} followers</div>
                    <div className="profile_counter">{other.Isub.length} following</div>
                </div>
                <div className="profile_user_information">
                    information
                    {other.information}
                </div>

            </div>
        </div>
    );
}

export default Profiletop;
