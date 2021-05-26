import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
const Login = () => {
    const [slider,setSlider]=useState<number>(0)
    setInterval(()=>{
            if(slider >= 3){
                setSlider(0)
            }else{
                setSlider(prev=>prev+1)
            }
    },3000)
    useEffect(() => {
        console.log(slider)
    }, [slider]);
    return (
        <Container className="container" maxWidth='md' >
            <div className="df login_wraper" >
                <div className="login_left">
                    <div className="phone_wraper">
                      <div className="phone_items">
                        <div style={slider === 0 ?{opacity:1} : {opacity:0} } className="fisrt_item"></div>
                        <div style={slider === 1 ?{opacity:1} : {opacity:0} } className="second_item"></div>
                        <div style={slider === 2 ?{opacity:1} : {opacity:0} } className="third_item"></div>
                        <div style={slider === 3 ?{opacity:1} : {opacity:0} } className="fourth_item"></div>
                        </div>
                    </div>
                </div>
                <div className="login_rigth">askjdhkajsl</div>
            </div>
        </Container>
    );
}

export default Login;
