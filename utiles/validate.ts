import { valuess, error } from "../interfaces/components";

export const validatee=(values:valuess)=>{
    const errors: error = {} as error;
    if(!values.password || values.password.trim().length < 6){
        errors.password="password min length is 6"
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
}