import {AxiosInstance} from 'axios'
import { setCookie } from 'nookies'
import { resetpassword, valuess } from '../interfaces/components'

export const Userapi=(instance:AxiosInstance)=>{
    return {
        getMe:async()=>{
            const {data}=await instance.get('/auth')
                return data
        },
        login:async(user:valuess):Promise<boolean>=>{
            try {
                const {data}=await instance.post('/auth/login',user)
                setCookie(null, 'token', data.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                  })
                return true
            } catch (error) {
                return false
            }
        },
        register:async(user:FormData):Promise<string>=>{
            try {
                const {data}=await instance.post('/auth/register',user)
                    return data.message
            } catch (error) {
                return error.mesage
            }
        },
        confirmemail:async(values:valuess)=>{
            try {
                const {data}=await instance.patch('/auth/confirm',values)
                 return data.message
            } catch (error) {
                return error.message
            }
        },
        Forgotpassword:async(email:any)=>{
            try {
                const {data}=await instance.patch('/auth/forgot',{email})
                 return data.message
            } catch (error) {
                return error.message
            }
        },
        resetpasword:async(dto:resetpassword)=>{
            try {
                const {data}=await instance.patch('/auth/reset',dto)
                 return data.message
            } catch (error) {
                return error.message
            }
        },
        userbyId:async(id:string)=>{
            try {
                const {data}=await instance.get(`/auth/user/${id}`)
                 return data
            } catch (error) {
                console.log(error.message)
                return
            }
        },
        subscripersposts:async()=>{
            try {
                const {data}=await instance.get(`/auth/sub/posts`)
                 return data
            } catch (error) {
                console.log(error.message)
                return
            }
        },
        subscrip:async(userId:string)=>{
                try {
                    const answer=await instance.patch('/auth/subscr',{userId})
                    console.log(answer)
                    return true                        
                } catch (error) {
                     return false   
                }
        },
        unsubscrip:async(userId:string)=>{
            try {
                const answer=await instance.patch('/auth/unsubscr',{userId})
                console.log(answer)
                return true                        
            } catch (error) {
                 return false   
            }
   
   
   
        },
       async getIsubscrip(userId:string){
                const {data:users}= await instance.get(`/auth/isub/${userId}`)
             return users
        },
        async getother(userId:string){
            const {data:users}= await instance.get(`/auth/othersub/${userId}`)
         return users
        },
        async updateprofile(userdate:FormData){
           try {
                const {data}= await instance.post(`/auth/update`,userdate)
                return data
           } catch (error) {
               console.log(error.message)
           }
        },
        async changepassword(passwords:string){
            const {data}= await instance.patch(`/auth/password/change`,passwords)
            return data
        }, 
        async getusersbycharacters(chars:string){
            const {data}= await instance.get(`/auth/bychars/${chars}`)
            return data
        },
        async getmyunreadedmessagescount(){
            const {data}= await instance.get(`/message/unreadcount`)
            return data
        }
        
    }
}