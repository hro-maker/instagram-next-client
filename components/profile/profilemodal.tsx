import React, { useEffect, useState } from 'react';
import { Api } from './../../utiles/api';
import { parseCookies } from 'nookies';
import userImage from '../header/user.png'
import { imageUrl } from './../../helpers/urls';
import Link from 'next/link';
import { useAppSelector } from '../../hooks/redux';
interface subscruser {
    name: string
    surename: string
    avtar: string
    _id: string
}
const Usersmodal = ({ userId, type = "i" }: { userId: string, type: string }) => {
    const cookies = parseCookies()
    const [subscripers, setsubscripers] = useState<subscruser[]>([]);
    useEffect(() => {
        (async () => {
            let userss = []
            if (type === "i") {
                userss = await Api({}, cookies.token).getIsubscrip(userId)
            } else {
                userss = await Api({}, cookies.token).getother(userId)
            }
            console.log(userss)
            setsubscripers(userss)
        })()
    }, [])
    const user=useAppSelector(state=>state.user.user)
    
    return (
        <div className="subscripers_modal_overlay">
            <div className="subscripers_modal-body">
                {
                    subscripers.map(el =>
                        <div className="subscrip_post">
                            <img className="modal_othertop-avatar profile-userimage" src={el.avtar ? imageUrl + el.avtar : userImage} alt="sssss" />
                            <div>
                               <Link href={`/profile/${el._id}`}>
                                   <a  className="profile_modal-username"> {el.name} {el.surename}</a>
                                </Link>
                            </div>
                            <button>subscr</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Usersmodal;
