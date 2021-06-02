import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";
import { comenttype } from "../interfaces/components";
import { Api } from './../utiles/api';
const cookies = parseCookies()
type fetchcomentserror = {
    message: string;
  };
export const fetchcoments = createAsyncThunk<
    comenttype[],
    string,
    { rejectValue: fetchcomentserror }
>(
  "todos/fetch", 
  async (postId: string, thunkApi) => {
    try {
       const coments =await Api({},cookies.token).getcoments(postId)
       return coments;
    } catch (error) {
        return thunkApi.rejectWithValue({ 
            message: error.message
          });
    }
  })