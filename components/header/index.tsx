import React from 'react';
// const macbookIphone = require('./heartt.png');
import heart from './heartt.png'
import home from './homee.png'
import message from './messages.png'
import user from './user.png'

const Header = () => {
    return (
        <div className="header_big_wraper">
            <div className="header_container">
                <div className="header_small_wraper">
                    <div className="header_left"><div className="header_logo"></div></div>
                    <div className="header_center">
                        <input className="header_search_input" placeholder="🔎︎Search" type="text" />
                    </div>
                    <div className="header_rigth">
                        
                       <img className="header_icons" src={home} alt='Home Page' width={25} height={25} />
                       <img className="header_icons" src={message} alt='Home Page' width={25} height={25} />
                       <img className="header_icons" src={heart} alt='Home Page' width={25} height={25} />
                       <img className="header_icons" src={user} alt='Home Page' width={25} height={25} />
                          </div>
                </div>
            </div>

        </div>
    );
}

export default Header;
