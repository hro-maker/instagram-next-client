import React, { useContext } from 'react';
import SignupForm from './SignupForm';
import { registerlabels, registervalues } from './../interfaces/components/index';
import { registervalidatee } from '../utiles/validate';
import { Elementcontext } from '../pages';

const Signup = () => {
    const {setLoginelement} = useContext(Elementcontext);
    return (
        <>
        <div className="login_form_wraper signup_change">
            <div className="insta_logo"></div>
            <div className="sublogo_descr">Sign up to see photos and videos from your friends.</div>
            <button style={{marginBottom:"15px"}} className="login_input login_btn">confirm email ?</button>
            <span style={{marginBottom:"15px"}} className="for_psev">OR</span>

            <SignupForm btn="Signup" validatee={registervalidatee} values={registervalues} labels={registerlabels} />
        </div>
        <div className="signup_change">
        <div className="signup_link">
        Have an account?<button onClick={()=>setLoginelement(0)} className="sign_up">Sign in</button>
                        </div>
                        <div className="get_app"> Get the app.</div>

                        <div className="stors_links">
                            <a href='https://apps.apple.com/app/instagram/id389801252?vt=lo' target="_blanck" className="appstore"></a>
                            <a target="_blanck"  href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=52E1E56B-4880-4176-B4D6-0CD610DCFB92&utm_content=lo&utm_medium=badge' className="google_app"></a>
                        </div>
        </div>
       
        </>
    );
}

export default Signup;
