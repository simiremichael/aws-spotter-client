import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import  {AgentModel} from '../models/index'


interface AgentAuthState {

  agent:  undefined | string | AgentModel | null| [] | {} ;   
  // name: string | null;
  
  agentToken : string | null | undefined | {};
}

const initialState: AgentAuthState = { 
  agent: null, 
  agentToken : null 
} 


export const agentSlice = createSlice({
  name: 'AgentAuth',
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<{agent:  undefined | string | AgentModel | null | [] | {}, agentToken: string | undefined | null | {} }>) => {
      localStorage.setItem('residence-spotter-agent', JSON.stringify({
        agent: action.payload.agent,
        agentToken: action.payload.agentToken,
       })
       );
       state.agent = action.payload.agent;
       state.agentToken = action.payload.agentToken;
    },
    logout: (state) => {
      localStorage.removeItem('residence-spotter-agent');
      state.agent = null;
      state.agentToken = null;
    }
    }
})
export const selectCurrentAgent = (state: RootState) => state.agentState
export const {setAgents, logout} = agentSlice.actions;
export default agentSlice.reducer;


//  interface Response {
//     agent: AgentModel | null;
//     token: {} | null;
//  } 

// const initialState: Response = { agent:  null, token: null 
// } as 
// { agent: null | any;
// token: null | string;
// };

// export const agentSlice = createSlice({
//   name: 'agentState',
//   initialState: { agent:  null, token: null 
//   } as 
//   { agent: null | any;
//   token: null | string;
//   },
//   reducers: {
//     agentState: (state, {payload: {agent, token}}: PayloadAction<{agent: any; token: string}>) => {
//       state.agent = agent;
//       state.token = token;
//     }
//   },
//   extraReducers: (builder) => {}
// });

// export const { agentState } = agentSlice .actions;

// export default agentSlice.reducer;

// export const selectCurrentAgent = (state: RootState) => state.agentState.agent;

// // export default agentSlice.reducer;
// // export const { agentState } = agentSlice.actions;
