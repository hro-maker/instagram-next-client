
import { changeuser } from '../redux/slices/userslice';
import { Api } from './api';

export const checkAuth=async (ctx:any)=>{
    try {
        const user= await Api(ctx).getMe()
        ctx.store.dispatch(changeuser(user))
        return user
    } catch (error) {
        return null
    }
}