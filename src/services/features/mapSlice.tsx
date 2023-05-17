import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {PropertyModel} from '../models/index';


interface MapAuthState {

  mapData:  null | undefined | PropertyModel ;   
}

const initialState: MapAuthState = { 
    mapData:  null, 
} 


export const mapDataSlice = createSlice({
  name: 'mapDataAuth',
  initialState,
  reducers: {
    setMapData: (state, action: PayloadAction<{mapData:  null | undefined | PropertyModel }>) => {
       state.mapData = action.payload.mapData;
    },

    }
})
export const selectCurrentMapData = (state: RootState) => state.mapDataState
export const {setMapData} = mapDataSlice.actions;
export default mapDataSlice.reducer;



