
import { changeuser } from '../redux/slices/userslice';
import { Api } from './api';

export const checkAuth=async (ctx:any)=>{
    try {
        const user= await Api(ctx).getMe()
        if(ctx.store){
            ctx.store.dispatch(changeuser(user))
        }
        return user
    } catch (error) {
        return null
    }
}