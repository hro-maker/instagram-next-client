import { AxiosInstance } from "axios";

export function chatapi(instance: AxiosInstance) {
    return {
        async getmyrooms(){
            try {
                const {data}= await instance.get(`/message/getrooms`)
            return data
            } catch (error) {
                console.log(error.message)
            }
        },
    }
   
}