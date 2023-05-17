import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface RentPropertyAuthState {

  rentProperty:  null | undefined | PropertyModel ;   
}

const initialState: RentPropertyAuthState = { 
    rentProperty:  null, 
} 


export const  rentPropertySlice = createSlice({
  name: 'RentPropertyAuth',
  initialState,
  reducers: {
    setRentProperty: (state, action: PayloadAction<{ rentProperty:  null | undefined | PropertyModel }>) => {
       state.rentProperty = action.payload.rentProperty;
    },

    }
})
export const selectCurrentRentProperty = (state: RootState) => state.rentPropertyState
export const {setRentProperty} = rentPropertySlice.actions;
export default rentPropertySlice.reducer;



