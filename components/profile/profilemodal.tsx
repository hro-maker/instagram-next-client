import React, { useContext, useEffect, useState } from 'react';
import { Api } from './../../utiles/api';
import { parseCookies } from 'nookies';
import userImage from '../header/user.png'
import { imageUrl } from './../../helpers/urls';
import Link from 'next/link';
import { useAppSelector } from '../../hooks/redux';
import { useRouter } from 'next/dist/client/router';
import { Profiemodalcontext } from './Profiletop';
import Loaderr from '../loader';
interface subscruser {
    name: string
    surename: string
    avtar: string
    _id: string
}
const Usersmodal = ({ userId, type = "i" }: { userId: string, type: string }) => {
    const cookies = parseCookies()
    const [subscripers, setsubscripers] = useState<subscruser[]>([]);
    const [loading, setloading] = useState<boolean>(false);
    const router=useRouter()
    const changesubscripers=async()=>{
        let userss = []
        console.log(type)
        if (type === "i") {
            userss = await Api({}, cookies.token).getIsubscrip(userId)
        } else {
            userss = await Api({}, cookies.token).getother(userId)
        }
        console.log(userss)
        setsubscripers(userss)
    }
    useEffect(() => {
        (async () => {
            console.log("hell")
            setloading(true)
          await changesubscripers() 
          setloading(false)
        })()
        return ()=>{
            setsubscripers([])
        }
    }, [])
    const user=useAppSelector(state=>state.user.user)
    const subscrtoggle=useContext(Profiemodalcontext)
   const togglesubscr=async(name:string,userId:string)=>{
       setloading(true)
      await  subscrtoggle(name,userId)
        setloading(false)
   }
   if(loading){
    return <div className="userloading">
        <Loaderr/>
    </div>
}
    return (
        <div className="subscripers_modal_overlay">
            <div className="subscripers_modal-body">
                {
                    subscripers.map(el =>
                        <div key={el._id} className="subscrip_post">
                            <img 
                            onClick={()=>router.push(`/profile/${el._id}`)}
                            className="modal_othertop-avatar profile-userimage" 
                            src={el.avtar ? imageUrl + el.avtar : userImage}
                             alt="sssss" />
                            <div>
                               <Link href={`/profile/${el._id}`}>
                                   <a  className="profile_modal-username"> {el.name} {el.surename}</a>
                                </Link>
                            </div>
                            {user.Isub.some(elem=>String(elem._id)===String(el._id)) 
                            ? <button onClick={()=>togglesubscr("u",el._id)} className="profile_subscr">unsubscr</button>
                            : <button onClick={()=>togglesubscr("s",el._id)} className="profile_unsubscr">subscr</button>}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Usersmodal;
