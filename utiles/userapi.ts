import {AxiosInstance} from 'axios'
import { setCookie } from 'nookies'
import { valuess } from '../interfaces/components'

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
        Forgotpassword:async(email)=>{
            try {
                const {data}=await instance.patch('/auth/forgot',{email})
                 return data.message
            } catch (error) {
                return error.message
            }
        },

    }
}