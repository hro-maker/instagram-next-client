import { createSlice} from "@reduxjs/toolkit";
import { comenttype } from "../../interfaces/components";
import { userr } from "../../interfaces/profile";
import { fetchcoments } from "./../thunkactions";
type initialType = {
  user: userr | any;
  coments:comenttype[] | any[]
};
const initialState: initialType = {
  user: {},
  coments:[]
};
export const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeuser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchcoments.fulfilled, (state,{payload}) => {
        if(Array.isArray(payload)){
            state.coments=payload
        }
    });
    // builder.addCase(fetchcoments.pending, (_) => {
    //   console.log("pending");
    // });
    // builder.addCase(fetchcoments.rejected, (_) => {
    //   console.log("rejectet");
    // });
  },
});
export const { changeuser } = userslice.actions;
export default userslice.reducer;
