import React, { FC, useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { userr } from '../../interfaces/profile';
import { Api } from './../../utiles/api';
import userimage from './user.png'
import { imageUrl } from './../../helpers/urls';
interface serahcinterfase{
    chars:string
}
const Searchuser:FC<serahcinterfase> = ({chars}) => {
    const cookies=parseCookies()
    const [users, setusers] = useState<userr[]>([]);
    useEffect(() => {
           (async()=>{
                if(chars.trim()){
                    const allusers=await Api({},cookies.token).getusersbycharacters(chars)
                    console.log(allusers)
                    setusers(allusers)
                }else{
                    setusers([])
                }
           })() 
    }, [chars]);
    return (
        <div className="serach_users_dropdoun">
                {
                    users.map(el=>{
                        return <div className="serach_users-item">
            <img 
            className="modal_othertop-avatar "
             src={el.avatar.length >2 ? imageUrl + el.avatar : userimage} 
             width="40px"
             height="40px"
             alt="userimage" />
                        </div>
                    })
                }           
        </div>
    );
}

export default Searchuser;
