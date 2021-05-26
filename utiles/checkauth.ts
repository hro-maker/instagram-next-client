
import {  GetServerSidePropsContext } from 'next';
import { Api } from './api';

export const checkAuth=async (ctx:GetServerSidePropsContext)=>{
    try {
        return await Api(ctx).getMe()
    } catch (error) {
        return null
    }
}