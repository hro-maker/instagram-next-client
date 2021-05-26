import React from 'react';
import { sliderinterface } from '../interfaces/components';

const Slider:React.FC<sliderinterface> = ({slider}) => {
    return (
        <div className="phone_wraper">
                      <div className="phone_items">
                        <div style={slider === 0 ?{opacity:1} : {opacity:0} } className="fisrt_item"></div>
                        <div style={slider === 1 ?{opacity:1} : {opacity:0} } className="second_item"></div>
                        <div style={slider === 2 ?{opacity:1} : {opacity:0} } className="third_item"></div>
                        <div style={slider === 3 ?{opacity:1} : {opacity:0} } className="fourth_item"></div>
                        </div>
                    </div>
    );
}

export default Slider;
