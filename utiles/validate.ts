import { valuess, error } from "../interfaces/components";

export const loginvalidatee=(values:valuess)=>{
    const errors: error = {} as error;
    if(!values.password || values.password.trim().length < 5){
        errors.password="password min length is 6"
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
}
export const registervalidatee=(values:valuess)=>{
    const errors: error = {} as error;
    if(!values.password || values.password.trim().length < 6){
        errors.password="password min length is 6"
    }
    if(!values.name || values.name.trim().length < 3){
        errors.name="firstname min length is 3"
    }
    if(!values.surename || values.surename.trim().length < 3){
        errors.surename="lastname min length is 3"
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
}