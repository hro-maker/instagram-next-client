import { createSlice} from "@reduxjs/toolkit";
import { userr } from "../../interfaces/profile";
import { fetchcoments } from "./../thunkactions";
type initialType = {
  user: userr | any;
};
const initialState: initialType = {
  user: {},
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
    builder.addCase(fetchcoments.fulfilled, (state) => {
      console.log("fulfield");
    });
    builder.addCase(fetchcoments.pending, (state) => {
      console.log("pending");
    });
    builder.addCase(fetchcoments.rejected, (state) => {
      console.log("rejectet");
    });
  },
});
export const { changeuser } = userslice.actions;
export default userslice.reducer;
