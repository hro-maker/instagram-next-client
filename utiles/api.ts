import {GetServerSidePropsContext } from 'next';
import axios from 'axios'
import nookies from 'nookies'
import { Userapi } from './userapi';
export const Api=(ctx:GetServerSidePropsContext | {}={})=>{
    const cookies = nookies.get(ctx)
    const token=cookies?.token
    const instance=axios.create({
        baseURL:'http://localhost:7000',
        headers:{
            Authorization:'Bearer '+token
        }
    })
    return {
        ...Userapi(instance)
    }
}