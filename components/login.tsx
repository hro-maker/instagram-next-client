import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import Slider from './slider';
import SignupForm from './SignupForm';
import { loginlabels, loginvalues } from '../interfaces/components';
import { loginvalidatee } from '../utiles/validate';
import { Elementcontext } from '../pages';
const Login = () => {
    const [slider, setSlider] = useState<number>(0)
  const {setLoginelement} = useContext(Elementcontext);

    useEffect(() => {
        const timer = setInterval(() => {
            if (slider >= 3) {
                setSlider(0)
            } else {
                setSlider(prev => prev + 1)
            }
        }, 3000)
        return () => clearInterval(timer)
    }, [slider]);
    return (
        <div>
            <Container className="container" maxWidth='md' >
                <div className="df login_wraper" >
                    <div className="login_left">
                        <Slider slider={slider} />
                    </div>
                    <div className="login_rigth">
                        <div className="login_form_wraper">
                            <div className="insta_logo"></div>
                            <SignupForm  values={loginvalues} labels={loginlabels} validatee={loginvalidatee}/>
                            <span className="for_psev">OR</span>
                            <button style={{ fontSize: "18px", color: "blue" }} className="forgot_btn">confirm email ?</button>
                            <button style={{ fontSize: "18px" }} className="forgot_btn">Forgot password?</button>
                        </div>
                        <div className="signup_link">
                            Don't have an account? <button onClick={()=>setLoginelement(1)} className="sign_up">Sign up</button>
                        </div>
                        <div className="get_app"> Get the app.</div>

                        <div className="stors_links">
                            <a href='https://apps.apple.com/app/instagram/id389801252?vt=lo' target="_blanck" className="appstore"></a>
                            <a target="_blanck"  href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=52E1E56B-4880-4176-B4D6-0CD610DCFB92&utm_content=lo&utm_medium=badge' className="google_app"></a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Login;
