
import { combineReducers } from "redux";
import user from './slices/userslice'
import chat from './slices/chatslice'
export const Rootreducer = combineReducers({
  user,
  chat
})
export type RootState = ReturnType<typeof Rootreducer>
export type AppDispatch = typeof Rootreducer
