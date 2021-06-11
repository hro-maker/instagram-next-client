import React, { FC, useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { userr } from '../../interfaces/profile';
import { Api } from './../../utiles/api';
import userimage from './user.png'
import { imageUrl } from './../../helpers/urls';
import Link from 'next/link';
import Loaderr from '../loader';
interface serahcinterfase{
    chars:string,
    showsearchmodal:()=>void
}
const Searchuser:FC<serahcinterfase> = ({chars,showsearchmodal}) => {
    const cookies=parseCookies()
    const [users, setusers] = useState<userr[]>([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
           (async()=>{
               setloading(true)
                if(chars.trim()){
                    const allusers=await Api({},cookies.token).getusersbycharacters(chars)
                    console.log(allusers)
                    setusers(allusers)
                }else{
                    setusers([])
                }
                setloading(false)
           })() 
    }, [chars]);

    return (
        <div onClick={(e)=>{
            if(e.target.className === 'search_user_overlay'){
                showsearchmodal()
            }
        }} className="search_user_overlay">
            <div  className="serach_users_dropdoun">
                {
                  loading ? <div className="loader_center"><Loaderr/></div> :  <>
                            {
                            users.length > 0 ? users.map(el=>{
                                    return <div key={el._id} className="serach_users-item">
                        <img 
                        className="modal_othertop-avatar "
                         src={el.avatar.length >2 ? imageUrl + el.avatar : userimage} 
                         width="40px"
                         height="40px"
                         alt="userimage" />
                         <div>
                         <Link href={`/profile/${el._id}`}>
                         <a className="search_user_name">{el.name}</a>
                         </Link>
                         <Link href={`/profile/${el._id}`}>
                         <a className="search_user_name">{el.surename}</a>
                         </Link>
                         </div>
                                    </div>
                                })
                                : <div className="searchuser_dont_found">🔎︎</div>
                            }
                  </>
                }           
        </div>
   
        </div>
         );
}

export default Searchuser;
