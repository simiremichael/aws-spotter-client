import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface MorePropertyAuthState {

  moreProperty:  undefined | string | PropertyModel | null ;   
}

const initialState: MorePropertyAuthState = { 
    moreProperty: null, 
} 


export const morePropertySlice = createSlice({
  name: 'MorePropertyAuth',
  initialState,
  reducers: {
    setMoreProperty: (state, action: PayloadAction<{moreProperty:  undefined | string | PropertyModel | null }>) => {
       state.moreProperty = action.payload.moreProperty;
    },
    }
})
export const selectCurrentMoreProperty = (state: RootState) => state.morePropertyState
export const {setMoreProperty} = morePropertySlice.actions;
export default morePropertySlice.reducer;




