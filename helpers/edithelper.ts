export const editvalidate=(values:values)=>{
    let errors:updateerror | any={}
    if(values.name.trim().length <= 4 ){
        errors.name="name must be longer then 4"
    }
    if(values.surename.trim().length <= 4 ){
        errors.surename="surename must be longer then 4"
    }
    return errors
}
export const formsubmit=(values:values) => {
    const newuser=new FormData()
    newuser.append('name',values.name)
    newuser.append('surename',values.surename)
    newuser.append('information',values.information)
    return newuser
}
interface updateerror{
    name:string
    surename:string
}
interface values{
    name: any;
    surename: any;
    information: any;
}
interface values2{
    oldpassword: any;
    newpassword: any;
    repet: any;
}
export const changevalidate=(values:values2)=>{
    const errors:values2 | any={}
    if(values.oldpassword.trim().length < 5 ){
        errors['oldpassword']="pasword length must be longer then 4"
    }
    if(values.newpassword.trim().length < 5 ){
        errors.newpassword="pasword length must be longer then 4"
    }
    if(values.repet != values.newpassword){
            errors.repet="passwords must be equal"
    }
    return errors
}