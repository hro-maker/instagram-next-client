
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { roomtype } from '../../interfaces/components/chat';
type initialtype={
    rooms:roomtype[]
    events:any[]
}
const initialState:initialtype={
    rooms:[],
    events:[]
}
export const chatslice=createSlice({
    name:"chat",
    initialState,
    reducers:{
            changerooms(state,action){
                state.rooms=action.payload
            },
            pushroom(state,action){
                if(state.rooms.every(el=>String(el._id) !== String(action.payload._id))){
                        state.rooms.push(action.payload)
                }
            },
            changeevents(state,action){
                state.events=action.payload
            }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE as any, (state, action) => {
          state.rooms = action.payload.chat.rooms;
          state.events=action.payload.chat.events;
        });
      },
})
export const {changerooms,pushroom,changeevents}=chatslice.actions
export default chatslice.reducer