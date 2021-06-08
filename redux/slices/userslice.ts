import { createSlice} from "@reduxjs/toolkit";
import { comenttype, posttype } from "../../interfaces/components";
import { userr } from "../../interfaces/profile";
import { fetchcoments } from "./../thunkactions";
import { HYDRATE } from 'next-redux-wrapper';
type initialType = {
  user: userr | any;
  coments:comenttype[] | any[];
  posts:any[]
};
const initialState: initialType = {
  user: {},
  coments:[],
  posts:[]
};
export const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeuser: (state, action) => {
      state.user = action.payload;
    },
    changeposts:(state,action)=>{
      state.posts=action.payload
    },
    pushpost:(state,action)=>{
      state.posts.push(action.payload)
    },
    deletepost:(state,action)=>{
      const postss=state.posts.filter(el=>String(el._id)!==String(action.payload.postId))
      console.log(Date.now(),postss)
      state.posts=postss
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchcoments.fulfilled, (state,{payload}) => {
        if(Array.isArray(payload)){
            state.coments=payload
        }
    });
    builder.addCase(HYDRATE as any ,(state,action)=>{
      state.user=action.payload.user.user
    })
  },
});
export const { changeuser,changeposts ,pushpost,deletepost} = userslice.actions;
export default userslice.reducer;
