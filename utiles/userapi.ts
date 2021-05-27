import {AxiosInstance} from 'axios'
import { setCookie } from 'nookies'
import { valuess } from '../interfaces/components'

export const Userapi=(instance:AxiosInstance)=>{
    return {
        getMe:async()=>{
            const {data}=await instance.get('/auth')
                return data
        },
        login:async(user:valuess)=>{
            try {
                const {data}=await instance.post('/auth/login',user)
                setCookie(null, 'token', data.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                  })
                return data
            } catch (error) {
                console.log(error)
            }
        }
    }
}