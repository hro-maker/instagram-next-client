
import { combineReducers } from "redux";
import user from './slices/userslice'
export const Rootreducer = combineReducers({
  user
})


export type RootState = ReturnType<typeof Rootreducer.getState>
export type AppDispatch = typeof Rootreducer.dispatch