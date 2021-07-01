import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { roomtype } from '../../interfaces/components/chat';
import { eventtype } from '../../interfaces/components/events';
type initialtype={
    rooms:roomtype[]
    events:eventtype[]
    forfollow:boolean
    roomid:string
}
const initialState:initialtype={
    rooms:[],
    events:[],
    forfollow:false,
    roomid:''
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
            },
            readallevents(state){
                state.events=state.events.map(elem=>{
                    elem={...elem,readed:true}
                        return elem
                })
            },
            changeforfallow(state){
                state.forfollow= !state.forfollow
            },
            changeroomid(state,action){
                    state.roomid=action.payload
            }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE as any, (state, action) => {
          state.rooms = action.payload.chat.rooms;
          state.events=action.payload.chat.events;
        });
      },
})
export const {changerooms,pushroom,changeevents,pushevent,readallevents,changeforfallow,changeroomid}=chatslice.actions
export default chatslice.reducer