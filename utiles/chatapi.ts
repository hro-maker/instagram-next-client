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
        async getmessagesbyroomid(id:string){
            try {
                const {data}= await instance.get(`/message/getbyromid/${id}`)
            return data
            } catch (error) {
                console.log(error.message)
            }
        },
        async getevents(){
            try {
                const {data}= await instance.get(`/message/getevents`)
            return data
            } catch (error) {
                console.log(error.message)
            }
        },
        async readevents(){
            try {
                const {data}= await instance.get(`/message/readevents`)
            return data
            } catch (error) {
                console.log(error.message)
            }
        },
        async saveimages(formdata:FormData){
            try {
                const {data}= await instance.post(`/message/images/save`,formdata)
            return data
            } catch (error) {
                console.log(error.message)
            }
        },
        async readmessages(roomid:string){
            try {
            const {data}= await instance.get(`/message/readmessages/${roomid}`)
            return data
            } catch (error) {
                console.log(error.message)
            }
        },
        async getroombyid(roomid:string){
            try {
                const {data}= await instance.get(`/message/getroombyid/${roomid}`)
                return data
            } catch (error) {
                console.log(error.message)
            }
        },
        async getroombyuserid(userid:string){
            try {
                const {data}= await instance.get(`/message/getroombyuserid/${userid}`)
                return data
            } catch (error) {
                console.log(error.message)
            }
        },
        

        
    }
   
}