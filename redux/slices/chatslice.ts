
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { roomtype } from '../../interfaces/components/chat';
type initialtype={
    rooms:roomtype[]
}
const initialState:initialtype={
    rooms:[]
}
export const chatslice=createSlice({
    name:"chat",
    initialState,
    reducers:{
            changerooms(state,action){
                state.rooms=action.payload
            },
            pushroom(state,action){
                console.log(action.payload,state.rooms)
                if(state.rooms.every(el=>String(el._id) !== String(action.payload._id))){
                        state.rooms.push(action.payload)
                }
            }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE as any, (state, action) => {
          state.rooms = action.payload.chat.rooms;
        });
      },
})
export const {changerooms,pushroom}=chatslice.actions
export default chatslice.reducer