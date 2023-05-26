import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface  AgentPropertyAuthState {
  // agentProperty:  undefined | string | PropertyModel | null ;  
  agentProperty:  undefined | null | PropertyModel | string ; 
}

const initialState:  AgentPropertyAuthState = { 
    // agentProperty: null, 
    agentProperty: null
} 


export const agentPropertySlice = createSlice({
  name: 'AgentPropertyAuth',
  initialState,
  reducers: {
    setAgentProperties: (state, action: PayloadAction<{ agentProperty: string| undefined | null | PropertyModel }>) => {
       state.agentProperty = action.payload.agentProperty;
    }
  }
})
export const selectCurrentAgentProperty = (state: RootState) => state.agentPropertyState
export const {setAgentProperties} = agentPropertySlice.actions;
export default agentPropertySlice.reducer;
