import React from 'react';
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
                        <div className="logo_home"></div>
                        <div className="logo_message"></div>
                        <div className="logo_like"></div>
                        <img className="log_user"src='https://www.pngjoy.com/pngm/810/9598635_person-icon-png-male-placeholder-png-download.png' alt="kjasdhk" />
                </div>
               </div>
                </div>
                
        </div>
    );
}

export default Header;
