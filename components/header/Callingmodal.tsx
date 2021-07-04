import React from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { FaPhoneAlt, FaPhoneSlash } from 'react-icons/fa';
import { userr } from '../../interfaces/profile';

const Callingmodal = ({caller,answerfunction}:{caller:userr,answerfunction:(answer:boolean)=>void}) => {
    return (
        <div className="calling__modal-overlay">
            <div className="calling__modal-content">
                    <div className="calling__modal-userinfo">
                    {caller.avatar 
                                ? <img
                                className="modal_othertop-avatar profile-userimage likes__modal-placeholder"
                                src={caller.avatar}
                                width="70px"
                                height="50px"
                                alt="sssss" /> 
                                : <BiUserCircle
                                className="likes__modal-placeholder"
                                width="70px"
                                height="70px"/>
                                }
                          <span>{caller.name}</span>
                          {caller.surename}      
                    </div>
                    <div className="calling__modal-buttons">
                    <div onClick={()=>answerfunction(true)} className="calling__modal-buttons--accept">
                            <FaPhoneAlt/> 
                    </div>
                    <div onClick={()=>answerfunction(false)} className="calling__modal-buttons--dont__accept">
                    <FaPhoneSlash/>
                    </div>      
                    </div>
            </div>
        </div>
    );
}

export default Callingmodal;
