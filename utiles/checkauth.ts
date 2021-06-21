
import { changeuser } from '../redux/slices/userslice';
import { Api } from './api';
import useSocket from './../hooks/useSocket';

export const checkAuth=async (ctx:any)=>{
    try {
        const user= await Api(ctx).getMe()
        // const socket=useSocket()
        // if(user){
        //     socket.emit('@Client:user_status',{status:true,id:user._id})
        // }
        console.log("hello")
        if(ctx.store){
            ctx.store.dispatch(changeuser(user))
        }
        return user
    } catch (error) {
        console.log(error,Date.now())
        return null
    }
}