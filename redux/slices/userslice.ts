import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userr } from '../../interfaces/profile'
type initialType={
    user:userr | {}
}
const initialState:initialType={
    user:{}
}

export const userslice=createSlice({
    name:"user",
    initialState,
    reducers:{
        changeuser:(state,action)=>{
               state.user=action.payload
        }
    }
})
export const {changeuser} =userslice.actions
export default userslice.reducer