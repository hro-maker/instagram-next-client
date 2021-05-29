import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { toast } from 'react-toastify';
import SignupForm from '../../../components/auth/SignupForm';
import { error, valuess } from '../../../interfaces/components';
import { Api } from './../../../utiles/api';
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
    const notify = (msg:string) => toast.error(msg);
    const router=useRouter()
    const onSubmit=async (values:valuess)=>{
        let forreset="",userId=""
        if(process.browser){
            forreset=router.query.code as string
            userId=router.query.id as string
        }
      
          const answer=await Api().resetpasword({forreset,userId,password:values.password as string})
          notify(answer)
          router.push('/login')
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
