import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {UserModel} from '../models/index'


interface UserAuthState {

  user:  undefined | string | UserModel | null ;   
  token: string | null | undefined | {};
}

const initialState: UserAuthState = { 
  user: null, 
  token: null 
} 


export const userSlice = createSlice({
  name: 'UserAuth',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<{user:  undefined | string | UserModel | null, token: string | undefined | null | {} }>) => {
      localStorage.setItem('residence-spotter-user', JSON.stringify({
        user: action.payload.user,
        token: action.payload.token,
       })
       );
       state.user = action.payload.user;
       state.token = action.payload.token;
    },
    logoutUsers: (state) => {
      localStorage.removeItem('residence-spotter-user');
      state.user = null;
      state.token = null;
    }
    }
})
export const selectCurrentUser = (state: RootState) => state.userState
export const {setUsers, logoutUsers} = userSlice.actions;
export default userSlice.reducer;