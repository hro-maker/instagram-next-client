
export interface sliderinterface{
    slider:number
}
export interface error {
    email?: string
    password?:string
    name?:string
    surename?:string
}
export interface valuess{
    email?:string
    password?:string
    name?:string
    surename?:string
}
export const loginvalues={
    email:"",
    password:""
}

export const registervalues={
    email:"",
    password:"",
    name:"",
    surename:""
}
export const loginlabels={
    email:"Email form",
    password:"Password"
}
export const registerlabels={
    email:"Email form",
    password:"Password",
    name:"firstname",
    surename:"lastname"
}