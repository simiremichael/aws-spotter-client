import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface  CompanyPropertyAuthState { 
  companyProperty:  undefined | null | PropertyModel ; 
}

const initialState:  CompanyPropertyAuthState = { 
    companyProperty: null
} 


export const companyPropertySlice = createSlice({
  name: 'CompanyPropertyAuth',
  initialState,
  reducers: {
    setCompanyProperties: (state, action: PayloadAction<{ companyProperty: undefined | null | PropertyModel }>) => {
       state.companyProperty = action.payload.companyProperty;
    }
  }
})
export const selectCurrentCompanyProperty = (state: RootState) => state.companyPropertyState
export const {setCompanyProperties} = companyPropertySlice.actions;
export default companyPropertySlice.reducer;
