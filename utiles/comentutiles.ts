import { AxiosInstance } from "axios";

export function comentapi(instance: AxiosInstance) {
    return {
       async toglecomentlike(comentId:string){
                try {
                    const {data}=await instance.post('/coment/toglelike',{comentId})
                    return data
                } catch (error) {
                    console.log(error.message)
                }
        },
        async getlikesbycomentid(comentId:string){
            try {
                const {data}=await instance.get(`/coment/likes/${comentId}`)
                return data
            } catch (error) {
                console.log(error.message)
            }
        },
        async getlikesbypostid(comentId:string){
            try {
                const {data}=await instance.get(`/post/likes/${comentId}`)
                return data
            } catch (error) {
                console.log(error.message)
            }
        }
            
    }
   
}