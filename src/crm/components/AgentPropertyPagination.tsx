import React from 'react'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentAgentProperty} from '../../services/features/agentPropertySlice';

function AgentPropertyPaginate(props: {page: any}) {

     
     const { agentProperty} = useSelector(selectCurrentAgentProperty);
      {/* @ts-ignore:next-line */}
     const numberOfPages = agentProperty?.numberOfPages;
    const page = props.page;

    console.log(page);
   
  return (
    <Pagination 
    count={numberOfPages} 
    page={Number(page) || 1}
    variant="outlined" 
    color='primary'
    renderItem={(item: any) => (
        <PaginationItem {...item} component={Link} to={`/agentproperties?page=${item.page}`}  />
    )}  
    />       
  )
    }

export default AgentPropertyPaginate


