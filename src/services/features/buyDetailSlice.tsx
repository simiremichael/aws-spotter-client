import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface BuyDetailAuthState {

  buyDetail:  PropertyModel | null;   
}

const initialState: BuyDetailAuthState = { 
    buyDetail:  null, 
} 


export const buyDetailSlice = createSlice({
  name: 'BuyDetailAuth',
  initialState,
  reducers: {
    setBuyDetail: (state, action: PayloadAction<{ buyDetail: PropertyModel | null  }>) => {
       state.buyDetail = action.payload.buyDetail;
    },

    }
})
export const selectCurrentBuyDetail = (state: RootState) => state.buyDetailState
export const {setBuyDetail} = buyDetailSlice.actions;
export default buyDetailSlice.reducer;



