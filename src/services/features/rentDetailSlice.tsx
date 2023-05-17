import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';

interface RentDetailAuthState {

  rentDetail:  PropertyModel | null | undefined;   
}

const initialState: RentDetailAuthState = { 
    rentDetail:  null, 
} 

export const  rentDetailSlice = createSlice({
  name: 'RentDetailAuth',
  initialState,
  reducers: {
    setRentDetail: (state, action: PayloadAction<{ rentDetail: PropertyModel | null | undefined }>) => {
       state.rentDetail = action.payload.rentDetail;
    },

    }
})
export const selectCurrentRentDetail = (state: RootState) => state.rentDetailState
export const {setRentDetail} = rentDetailSlice.actions;
export default rentDetailSlice.reducer;



