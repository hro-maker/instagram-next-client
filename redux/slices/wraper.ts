
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import { Rootreducer, RootState } from '../index';
import { configureStore,Store,Action ,ThunkAction} from '@reduxjs/toolkit';
const reducer = (state:any, action: any) => {
    switch (action.type) {
        // case HYDRATE:
        //     console.log(action.payload)
        //     return {...state, ...action.payload};
        default:
            return Rootreducer(state,action) ;
    }
};
export const makeStore = (context: Context):Store => configureStore({
    reducer            
})
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});
export type Appthunk = ThunkAction<any,RootState, void, Action<string>>