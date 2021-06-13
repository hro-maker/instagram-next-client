import React, { useContext, useEffect, useState } from 'react';
import { Api } from './../../utiles/api';
import { parseCookies } from 'nookies';
import userImage from '../header/user.png'
import { imageUrl } from './../../helpers/urls';
import { useAppSelector } from '../../hooks/redux';
import { useRouter } from 'next/dist/client/router';
import { Profiemodalcontext } from './Profiletop';
import Loaderr from '../loader';
import { useDispatch } from 'react-redux';
import { changeuser } from '../../redux/slices/userslice';
export interface subscruser {
    name: string
    surename: string
    avatar: string
    _id: string
}
const Usersmodal = ({ userId, type = "i", close }: { userId: string, type: string, close: any }) => {
    const cookies = parseCookies()
    const [subscripers, setsubscripers] = useState<subscruser[]>([]);
    const [loading, setloading] = useState<boolean>(false);
    const router = useRouter()
    const dispatch = useDispatch()
    const changesubscripers = async () => {
        let userss = []
        console.log(type)
        if (type === "i") {
            userss = await Api({}, cookies.token).getIsubscrip(userId)
        } else {
            userss = await Api({}, cookies.token).getother(userId)
        }
        setsubscripers(userss)
        if(userss.length ===0){
            close()
        }
    }
    useEffect(() => {
        (async () => {
            setloading(true)
            await changesubscripers()
            setloading(false)
        })()
        return () => {
            setsubscripers([])
        }
    }, [])
    const user = useAppSelector(state => state.user.user)
    const subscrtoggle = useContext(Profiemodalcontext)
    const togglesubscr = async (name: string, userId: string) => {
        setloading(true)
        await subscrtoggle(name, userId)
        const user = await Api({}, cookies.token).getMe()
        dispatch(changeuser(user))
        setloading(false)
    }
    // if(subscripers.length === 0){
    //     close()
    // }
    return (
        <div className="subscripers_modal_overlay">
            {loading ? <div className="userloading">
                <Loaderr />
            </div> : <div className="subscripers_modal-body">
                <div onClick={() => close()} className="post_modal_close">&times;</div>
                {
                    subscripers.length > 0 ? subscripers.map(el =>
                        <div key={el._id} className="subscrip_post">
                            <img
                                onClick={() => {
                                    router.push(`/profile/${el._id}`)
                                    close()
                                }}
                                className="modal_othertop-avatar profile-userimage"
                                src={el.avatar ? imageUrl + el.avatar : userImage}
                                alt="sssss" />
                            <div>
                                <div
                                onClick={() => {
                                    router.push(`/profile/${el._id}`)
                                    close()
                                }}
                                className="profile_modal-username"> {el.name} {el.surename}</div>

                            </div>
                            {String(user._id) === String(el._id) ? null : <span>{user.Isub.some(elem => String(elem._id) === String(el._id))
                                ? <button
                                    onClick={() => togglesubscr("u", el._id)}
                                    className="profile_subscr">unsubscrib</button>
                                : <button
                                style={{backgroundColor:'#0e47e2'}}
                                 onClick={() => togglesubscr("s", el._id)} 
                                 className="profile_unsubscr ">subscrib</button>}</span>}
                        </div>
                    ) : <div>you dont have</div>
                }
            </div>
            }
        </div>
    );
}

export default Usersmodal;
