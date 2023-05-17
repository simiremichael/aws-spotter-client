import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface  CompanyAgentAuthState {
  companyAgent:  undefined | null | PropertyModel ; 
}

const initialState:  CompanyAgentAuthState = { 
    companyAgent: null
} 


export const companyAgentSlice = createSlice({
  name: 'CompanyAgentAuth',
  initialState,
  reducers: {
    setCompanyAgent: (state, action: PayloadAction<{ companyAgent: undefined | null | PropertyModel }>) => {
       state.companyAgent = action.payload.companyAgent;
    }
  }
})
export const selectCurrentCompanyAgen = (state: RootState) => state.companyAgentState
export const {setCompanyAgent} = companyAgentSlice.actions;
export default companyAgentSlice.reducer;
