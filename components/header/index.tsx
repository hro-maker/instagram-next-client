import React from 'react';
const Header = () => {
    return (
        <div className="header_big_wraper">
            <div className="header_container">
               <div className="header_small_wraper">
               <div className="header_left"><div className="header_logo"></div></div>
                <div className="header_center">
                    <input className="header_search_input" type="text" />
                </div>
                <div className="header_rigth">
                <i className="fas fa-home"></i>
                </div>
               </div>
                </div>
                
        </div>
    );
}

export default Header;
