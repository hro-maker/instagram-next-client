import { createSlice} from "@reduxjs/toolkit";
import { comenttype, posttype } from "../../interfaces/components";
import { userr } from "../../interfaces/profile";
import { fetchcoments } from "./../thunkactions";
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchcoments.fulfilled, (state,{payload}) => {
        if(Array.isArray(payload)){
            state.coments=payload
        }
    });
  },
});
export const { changeuser,changeposts ,pushpost} = userslice.actions;
export default userslice.reducer;
