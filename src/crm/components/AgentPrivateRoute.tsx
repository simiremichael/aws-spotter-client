import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentAgent } from '../../services/features/agentSlice'
import AgentRedirect from './AgentRedirect'

function AgentPrivateRoute({children}: {children: any}) {
  
    const {agentToken} = useSelector(selectCurrentAgent);
    
    return agentToken ? children : <AgentRedirect />
};

export default AgentPrivateRoute