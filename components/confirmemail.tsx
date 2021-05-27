import React, { useContext } from 'react';
import { error } from '../interfaces/components';
import { Elementcontext } from '../pages/login';
import { Api } from '../utiles/api';
import SignupForm from './SignupForm';
const vales={
    email:"",
    code:""
}
const labels={
    email:"Email",
    code:"code from email"
}
interface valuess{
    email:string,
    code:string
}
export const validate=(values:valuess)=>{
    const errors: error = {} as error;
    if(!values.code || values.code.trim().length < 4){
        errors.code="code min length is 4"
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
}
interface contextt{
    setLoginelement:(num:number)=>void
}
const submit=async(values:valuess)=>{
    const message=await  Api().confirmemail(values)
}
const Confirmemail = () => {
    const {setLoginelement}:contextt = useContext<contextt>(Elementcontext);
    return (
        <div className='login_form_wraper signup_change'>
            <div style={{fontSize:"20px",marginBottom:"15px"}} className="sublogo_descr">Confirm your email</div>
            <SignupForm onSubmit={submit}  btn="confirm email" validatee={validate} values={vales} labels={labels} />
            <span style={{marginBottom:"15px"}} className="for_psev">OR</span>
            <div className="signup_link">
             Have an account?<button onClick={()=>setLoginelement(0)} className="sign_up">Sign in</button>
                        </div>
        </div>
    );
}

export default Confirmemail;
