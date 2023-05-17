import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {CompanyModel} from '../models/index'


interface CompanyAuthState {

  company:  undefined | string | CompanyModel | null | [] | {} ;   
  companyToken : string | null | undefined;
}

const initialState: CompanyAuthState = { 
  company: null, 
  companyToken : null 
} 


export const companySlice = createSlice({
  name: 'CompanyAuth',
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<{company:  undefined | string | CompanyModel | null | [] | {}, companyToken : string | undefined | null,}>) => {
      localStorage.setItem('my-property-finder-company', JSON.stringify({
        company: action.payload.company,
        companyToken : action.payload.companyToken ,
       })
       );
       state.company = action.payload.company;
       state.companyToken  = action.payload.companyToken ;
    },
    companyLogout: (state) => {
      localStorage.removeItem('my-property-finder-company');
      state.company = null;
      state.companyToken  = null;
    }
    }
})
export const selectCurrentCompany = (state: RootState) => state.companyState
export const {setCompanies, companyLogout} = companySlice.actions;
export default companySlice.reducer;