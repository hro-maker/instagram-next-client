import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { roomtype } from '../../interfaces/components/chat';
import { eventtype } from '../../interfaces/components/events';
type initialtype={
    rooms:roomtype[]
    events:eventtype[]
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
            },
            pushevent(state,action){
                state.events.push(action.payload)
                console.log("newevent3333333333333333333333")
                    // if(state.events.every(el=>String(el._id) !== String(action.payload._id))){
                        
                    //     console.log("newevent44444444444444444444")
                    // }else{
                    //     state.events.map(el=>String(el._id) === String(action.payload._id) ? action.payload : el)
                    //     console.log("newevent555555555555555555555555")
                    // }
            },
            readallevents(state){
                state.events=state.events.map(elem=>{
                    elem={...elem,readed:true}
                        return elem
                })
            }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE as any, (state, action) => {
          state.rooms = action.payload.chat.rooms;
          state.events=action.payload.chat.events;
        });
      },
})
export const {changerooms,pushroom,changeevents,pushevent,readallevents}=chatslice.actions
export default chatslice.reducer