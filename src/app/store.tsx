import {configureStore} from "@reduxjs/toolkit";
import agentReducer from "../services/features/agentSlice";
import propertyReducer from "../services/features/propertySlice";
import userReducer from "../services/features/userSlice";
import companyReducer from "../services/features/companySlice";
import { propertyAPI } from "../services/api/propertyAPI";
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import agentPropertyReducer from "../services/features/agentPropertySlice";
import propertySearchReducer from '../services/features/propertySearchSlice';
import buyPropertyReducer from '../services/features/buyPropertySlice';
import rentPropertyReducer from "../services/features/rentPropertySlice";
import companyPropertyReducer from "../services/features/companyPropertySlice";
import companyAgentReducer from "../services/features/companyAgentSlice";
import propertyDetailReducer from "../services/features/propertyDetailSlice";
import morePropertyReducer from "../services/features/morePropertySlice";
import mapDataReducer from '../services/features/mapSlice'
import newProjectsReducer from '../services/features/projectSlice';
import offplanReducer from '../services/features/offplanSlice';
import commercialReducer from "../services/features/commercialSlice";
import buyDetailReducer from "../services/features/buyDetailSlice"; 
import rentDetailReducer from "../services/features/rentDetailSlice";
import scoutingReducer from "../services/features/scoutingSlice";

export const store = configureStore({
    reducer: {
        [propertyAPI.reducerPath]: propertyAPI.reducer,
        userState: userReducer,
        companyState: companyReducer,
        agentState: agentReducer,
        propertyState: propertyReducer,
        agentPropertyState: agentPropertyReducer,
        propertySearchState: propertySearchReducer,
        buyPropertyState: buyPropertyReducer,
        rentPropertyState: rentPropertyReducer,
        companyPropertyState: companyPropertyReducer,
        companyAgentState: companyAgentReducer,
        propertyDetailState: propertyDetailReducer,
        morePropertyState: morePropertyReducer,
        mapDataState: mapDataReducer,
        newProjectsState: newProjectsReducer,
        offplanState: offplanReducer,
        commercialState:commercialReducer,
        buyDetailState: buyDetailReducer,
        rentDetailState: rentDetailReducer,
        scoutingState: scoutingReducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(propertyAPI.middleware),
})   
// {immutableCheck: false, serializableCheck: false }

export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
setupListeners(store.dispatch);
