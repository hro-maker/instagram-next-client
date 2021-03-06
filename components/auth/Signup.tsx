import React, { useContext, useEffect, useRef, useState } from 'react';
import SignupForm from './SignupForm';
import { registerlabels, registervalues, valuess } from '../../interfaces/components/index';
import { registervalidatee } from '../../utiles/validate';
import { Elementcontext } from '../../pages/login';
import { Api } from '../../utiles/api';
import { toast } from 'react-toastify';


const Signup = () => {
    const { setLoginelement } = useContext(Elementcontext);
    const notify = (msg:string) => toast.error(msg);
    const [avatarUrl, setavatarUrl] = useState<string>('https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png');
    const Inputfileref = useRef<HTMLInputElement>(null)

    const changehandler = (e: React.FormEvent<HTMLInputElement>) => {
        const file = e.target.files[0]
        if(file){
            const avatarurl = URL.createObjectURL(file)
        setavatarUrl(avatarurl)
        }
    }
    const types={
        password:"password"
    }
    const onSubmitt=async (values)=>{
       const forma=new FormData()
       Object.keys(values).forEach(el=>{
            forma.append(el,values[el])
       })
       if(Inputfileref?.current?.files?.[0]){
                forma.append("foto",Inputfileref.current.files[0])
       }
       const message=await  Api().register(forma)
       notify(message)
       
    }
    return (
        <>
            <div className="login_form_wraper signup_change">
                <div onClick={()=>setLoginelement(0)} className="insta_logo"></div>
                <div className="sublogo_descr">Sign up to see photos and videos from your friends.</div>
                <button style={{ marginBottom: "15px" }} onClick={() => setLoginelement(2)} className="login_input login_btn">confirm email ?</button>
                <span style={{ marginBottom: "15px" }} className="for_psev">OR</span>
                <input className="signup_file" type="file" ref={Inputfileref} onChange={(e) => changehandler(e)} />
                image upload
                <label onClick={() => Inputfileref.current?.click()} htmlFor="signup_img">
                </label>
                <img className="signup_avatar" src={avatarUrl} id="signup_img" alt="Avatar" width="100px" height="100px" />

                <SignupForm type={types} onSubmit={onSubmitt} btn="Signup" validatee={registervalidatee} values={registervalues} labels={registerlabels} />
            </div>
            <div className="signup_change">
                <div className="signup_link">
                    Have an account?<button onClick={() => setLoginelement(0)} className="sign_up">Sign in</button>
                </div>
                <div className="get_app"> Get the app.</div>

                <div className="stors_links">
                    <a href='https://apps.apple.com/app/instagram/id389801252?vt=lo' target="_blanck" className="appstore"></a>
                    <a target="_blanck" href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=52E1E56B-4880-4176-B4D6-0CD610DCFB92&utm_content=lo&utm_medium=badge' className="google_app"></a>
                </div>
            </div>

        </>
    );
}

export default Signup;
