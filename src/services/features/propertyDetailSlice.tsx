import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface PropertyDetailAuthState {

  propertyDetail:  null | undefined | PropertyModel ;   
}

const initialState: PropertyDetailAuthState = { 
    propertyDetail:  null, 
} 


export const  propertyDetailSlice = createSlice({
  name: 'PropertyDetailAuth',
  initialState,
  reducers: {
    setPropertyDetail: (state, action: PayloadAction<{ propertyDetail:  null | undefined | PropertyModel }>) => {
       state.propertyDetail = action.payload.propertyDetail;
    },

    }
})
export const selectCurrentPropertyDetail = (state: RootState) => state.propertyDetailState
export const {setPropertyDetail} = propertyDetailSlice.actions;
export default propertyDetailSlice.reducer;



