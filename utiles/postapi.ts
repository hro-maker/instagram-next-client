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
    //   /coment/getcoments/
  };
}
