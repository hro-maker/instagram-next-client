import {AxiosInstance} from 'axios'
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
                return data
            } catch (error) {
                
            }
        }
    }
}