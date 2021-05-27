import {GetServerSidePropsContext } from 'next';
import axios from 'axios'
import nookies from 'nookies'
import { Userapi } from './userapi';
export const Api=(ctx:GetServerSidePropsContext | {}={},tokenn='')=>{
    const cookies = nookies.get(ctx)
    let token=cookies?.token
    if(tokenn.length >2){
        token=tokenn
    }
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