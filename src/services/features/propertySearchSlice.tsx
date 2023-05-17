import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface PropertySearchAuthState {

  propertySearch:  null | undefined | PropertyModel ;   
}

const initialState: PropertySearchAuthState = { 
    propertySearch :  null, 
} 


export const propertySearchSlice = createSlice({
  name: 'PropertySearchAuth',
  initialState,
  reducers: {
    setPropertySearch: (state, action: PayloadAction<{propertySearch:  null | undefined | PropertyModel }>) => {
       state.propertySearch = action.payload.propertySearch;
    },

    }
})
export const selectCurrentPropertySearch = (state: RootState) => state.propertySearchState
export const {setPropertySearch} = propertySearchSlice.actions;
export default propertySearchSlice.reducer;



