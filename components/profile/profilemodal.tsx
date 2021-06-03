import React, { useEffect, useState } from 'react';
import { Api } from './../../utiles/api';
import { parseCookies } from 'nookies';
interface subscruser{
    name:string
    surename:string
    avtar:string
    _id:string
}
const Usersmodal = ({userId,type="i"}:{userId:string,type:string}) => {
    const cookies=parseCookies()
    const [subscripers, setsubscripers] = useState<subscruser[]>([]);
    useEffect(()=>{
            (async()=>{
                let userss=[]
                if(type==="i"){
                    userss=await Api({},cookies.token).getIsubscrip(userId)
                }else{
                   userss=await Api({},cookies.token).getother(userId)
                }
                setsubscripers(userss)
            })()
    },[])
    return (
        <div className="subscripers_modal_overlay">
                <div className="subscripers_modal-body">hello</div>
        </div>
    );
}

export default Usersmodal;
