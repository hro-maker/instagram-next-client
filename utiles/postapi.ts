import { AxiosInstance } from "axios";
interface createcomentdto {
  text: string;
  postId: string;
  parentId?: string;
}
export function Postapi(instance: AxiosInstance) {
  return {
    async togglelike(postId: string) {
      try {
        const { data: post } = await instance.post("/post/toglelike", {
          postId,
        });
        return post;
      } catch (error) {
        console.log(error.message);
      }
    },
    async addcoment(coment: createcomentdto) {
      try {
        const { data } = await instance.post("/coment/create", coment);
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async getcoments(postId: any) {
      try {
        const { data } = await instance.get(`/coment/getcoments/${postId}`);
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async deletecomment(dto:{comentId:string,postId:string}){
      try {
        const { data } = await instance.post(`/coment/delete`,dto);
        return true;
      } catch (error) {
        return false;
      }
    },
    async getpostbyId(dto:{postId:string}){
      try {
        const { data } = await instance.get(`/post/getbyId/${dto.postId}`);
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async createpost(formdata:FormData){
      try {
        const { data } = await instance.post('/post/create',formdata)
     
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async deletepost(postId:string){
      try {
        const { data } = await instance.get('/post/removebyid/'+postId)
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async updatedescription({id,description}:{id:string,description:string}){
     
      try {
        const { data } = await instance.patch('/post/update',{id,description})
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async togglesavepost(postId){
      try {
        const { data } = await instance.patch('/auth/savepost',{postId})
        return data;
      } catch (error) {
        console.log(error.message);
      }
    }
    //   /getbyId/:id
  };
}
