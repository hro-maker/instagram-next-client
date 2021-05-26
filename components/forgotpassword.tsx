import React, { useContext } from 'react';
import { error } from '../interfaces/components';
import { Elementcontext } from '../pages/login';
import SignupForm from './SignupForm';

const Forgotpassword = () => {
    const {setLoginelement} = useContext(Elementcontext);
    const vales = {
        email: ""
    }
    const labels = {
        email: "Email"
    }
    interface valuess {
        email: string
    }
    const validate = (values: valuess) => {
        const errors: error = {} as error;
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    }

    return (
        <>
        <div className="login_form_wraper signup_change">

            <div className="forgot_lock"></div>
            <div style={{ fontSize: "14px" }}>Trouble Logging In?</div>
            <div className="enter_email">Enter your email  and we'll send you a link to get back into your account.</div>
            <SignupForm btn="sent link to my mail" validatee={validate} values={vales} labels={labels} />

            <span style={{ marginBottom: "15px" }} className="for_psev">OR</span>

            <button onClick={()=>setLoginelement(1)} className="forgot_btn">Create New Account</button>

        </div>
        <div style={{marginTop:"20px"}} className="signup_link signup_change">
        Have an account?<button onClick={()=>setLoginelement(0)} className="sign_up">Sign in</button>
                        </div>
        </>
    );
}

export default Forgotpassword;
