import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface NewProjectsAuthState {

  newProjects:  null | undefined | PropertyModel ;   
}

const initialState: NewProjectsAuthState = { 
    newProjects:  null, 
} 


export const  newProjectsSlice = createSlice({
  name: 'NewProjectsAuth',
  initialState,
  reducers: {
    setNewProjects: (state, action: PayloadAction<{ newProjects:  null | undefined | PropertyModel }>) => {
       state.newProjects = action.payload.newProjects;
    },

    }
})
export const selectCurrentNewProjects = (state: RootState) => state.newProjectsState
export const {setNewProjects} = newProjectsSlice.actions;
export default newProjectsSlice.reducer;



