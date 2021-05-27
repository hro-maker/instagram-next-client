import { useRouter } from 'next/dist/client/router';
import React from 'react';
import SignupForm from '../../../components/SignupForm';
import { error, valuess } from '../../../interfaces/components';
const resetvalidate=(values:valuess)=>{
    const errors: error = {} as error;
    if(!values.password || values.password.trim().length <6 ){
                errors.password="pasword min length is 6"
    }
    if(values.confirm !== values.password){
        errors.confirm="passwords must be equal"
    }
    return errors
}
const Resetpassword = () => {
    const onSubmit=(values:valuess)=>{
            console.log(values)
    }
    const resetvalues={
        password:"",
        confirm:""
    }
    const resetlabels={
        password:"new password",
        confirm:" repet new password"
    }
    const types={
        password:"password",
        confirm:"password"
    }
    const router=useRouter()
    // console.log(router.query)
    return (
        <div className="reset_form">
            reset your password
             <SignupForm type={types}  onSubmit={onSubmit} btn="reset password" validatee={resetvalidate} 
             values={resetvalues} labels={resetlabels} />
        </div>
    );
}

export default Resetpassword;
