import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface CommercialAuthState {

  commercial:  null | undefined | PropertyModel ;   
}

const initialState: CommercialAuthState = { 
    commercial:  null, 
} 


export const  commercialSlice = createSlice({
  name: 'CommercialAuth',
  initialState,
  reducers: {
    setCommercial: (state, action: PayloadAction<{ commercial:  null | undefined | PropertyModel }>) => {
       state.commercial = action.payload.commercial;
    },

    }
})
export const selectCurrentCommercial = (state: RootState) => state.commercialState
export const {setCommercial} =  commercialSlice.actions;
export default commercialSlice.reducer;



