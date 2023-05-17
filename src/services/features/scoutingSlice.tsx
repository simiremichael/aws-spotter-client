import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {ScoutingModel} from '../models/index'


interface ScoutingAuthState {
  scouting:  undefined | string | ScoutingModel | null| [] | {} ;   
}

const initialState: ScoutingAuthState = { 
  scouting: null, 
} 


export const scoutingSlice = createSlice({
  name: 'ScoutingAuth',
  initialState,
  reducers: {
    setScouting: (state, action: PayloadAction<{scouting:  undefined | string | ScoutingModel | null | [] | {} }>) => {
       state.scouting = action.payload.scouting;
    },
    }
})
export const selectCurrentScouting = (state: RootState) => state.scoutingState
export const {setScouting} = scoutingSlice.actions;
export default scoutingSlice.reducer;

