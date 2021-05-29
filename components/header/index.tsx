import React from 'react';
// const macbookIphone = require('./heartt.png');
import heart from './heartt.png'
import home from './homee.png'
import message from './messages.png'
import user from './user.png'
import { imageUrl } from './../../helpers/urls';
import { useRouter } from 'next/dist/client/router';

const Header = ({avatar,_id}:any) => {
    const router=useRouter()
    return (
        <div className="header_big_wraper">
            <div className="header_container">
                <div className="header_small_wraper">
                    <div className="header_left"><div onClick={()=>router.push('/')} className="header_logo"></div></div>
                    <div className="header_center">
                        <input className="header_search_input" placeholder="🔎︎Search" type="text" />
                    </div>
                    <div className="header_rigth">
                        
                       <img className="header_icons" src={home} alt='Home Page' width={25} height={25} />
                       <img className="header_icons" src={message} alt='Home Page' width={25} height={25} />
                       <img className="header_icons" src={heart} alt='Home Page' width={25} height={25} />
                       <img onClick={()=>router.push('/profile/'+_id)} className="header_icons" src={avatar ?imageUrl+avatar :user} alt='Home Page' width={25} height={25} />
                          </div>
                </div>
            </div>

        </div>
    );
}

export default Header;
