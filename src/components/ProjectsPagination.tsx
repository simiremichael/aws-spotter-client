import React from 'react'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from "react-router-dom";
import { useAppSelector } from '../app/hooks';
import { selectCurrentNewProjects } from '../services/features/projectSlice';

function ProjectPaginate(props: {page: any}) {

    const {newProjects} = useAppSelector(selectCurrentNewProjects);
      {/* @ts-ignore:next-line */}
     const numberOfPages = newProjects?.numberOfPages;
    const page = props.page;
    
  return (
    <Pagination 
    count={numberOfPages} 
    page={Number(page) || 1}
    variant="outlined" 
    color='primary'
    renderItem={(item: any) => (
        <PaginationItem {...item} component={Link} to={`/newProject?page=${item.page}`}  />
    )}
    />                  
  )
    }

export default ProjectPaginate


