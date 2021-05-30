
import { AxiosInstance } from 'axios';

export function Postapi(instance:AxiosInstance){
    return {
           async togglelike(postId:string){
               try {
                    const {data:post}=await instance.post('/post/toglelike',{postId})
                    return post
               } catch (error) {
                    console.log(error.message)
               }
            }
    }
}