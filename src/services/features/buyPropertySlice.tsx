import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface BuyPropertyAuthState {

  buyProperty:  null | undefined | PropertyModel ;   
}

const initialState: BuyPropertyAuthState = { 
    buyProperty:  null, 
} 


export const buyPropertySlice = createSlice({
  name: 'BuyPropertyAuth',
  initialState,
  reducers: {
    setBuyProperty: (state, action: PayloadAction<{buyProperty:  null | undefined | PropertyModel }>) => {
       state.buyProperty = action.payload.buyProperty;
    },

    }
})
export const selectCurrentBuyProperty = (state: RootState) => state.buyPropertyState
export const {setBuyProperty} = buyPropertySlice.actions;
export default buyPropertySlice.reducer;



