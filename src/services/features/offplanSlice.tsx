import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface OffplanAuthState {

  offplan:  null | undefined | PropertyModel ;   
}

const initialState: OffplanAuthState = { 
    offplan:  null, 
} 


export const  offplanSlice = createSlice({
  name: 'OffplanAuth',
  initialState,
  reducers: {
    setOffplan: (state, action: PayloadAction<{ offplan:  null | undefined | PropertyModel }>) => {
       state.offplan = action.payload.offplan;
    },

    }
})
export const selectCurrentOffplan = (state: RootState) => state.offplanState
export const {setOffplan} = offplanSlice.actions;
export default offplanSlice.reducer;



