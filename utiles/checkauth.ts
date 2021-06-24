
import { changeuser } from '../redux/slices/userslice';
import { Api } from './api';
import { changeevents } from '../redux/slices/chatslice';

export const checkAuth=async (ctx:any)=>{
    try {
        const user= await Api(ctx).getMe()

        if(user && ctx.store){
            const events=await Api(ctx).getevents()
            console.log(events)
            ctx.store.dispatch(changeevents(events))
        }
        if(ctx.store){
            ctx.store.dispatch(changeuser(user))
        }
        return user
    } catch (error) {
        console.log(error,Date.now())
        return null
    }
}