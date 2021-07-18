import {GetServerSidePropsContext } from 'next';
import axios from 'axios'
import nookies from 'nookies'
import { Userapi } from './userapi';
import { Postapi } from './postapi';
import { comentapi } from './comentutiles';
import { chatapi } from './chatapi';
export const Api=(ctx:GetServerSidePropsContext | {}={},tokenn='')=>{
    const cookies = nookies.get(ctx)
    let token=cookies?.token
    if(tokenn.length >2){
        token=tokenn
    }
    const instance=axios.create({
        baseURL:'https://instagram-serv.herokuapp.com/',
        headers:{
            Authorization:'Bearer '+token
        }
    })
    return {
        ...Userapi(instance),
        ...Postapi(instance),
        ...comentapi(instance),
        ...chatapi(instance)
    }
}