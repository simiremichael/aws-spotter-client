import React from 'react'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from "react-router-dom";
import { useAppSelector } from '../app/hooks';
import { selectCurrentOffplan } from '../services/features/offplanSlice';

function OffplanPaginate(props: {page: any}) {

     
     const { offplan} = useAppSelector(selectCurrentOffplan);
      {/* @ts-ignore:next-line */}
     const numberOfPages = offplan?.numberOfPages;
    const page = props.page;
    
  return (
    <Pagination 
    count={numberOfPages} 
    page={Number(page) || 1}
    variant="outlined" 
    color='primary'
    renderItem={(item: any) => (
        <PaginationItem {...item} component={Link} to={`/offplan?page=${item.page}`}  />
    )}
    />                  
  )
    }

export default OffplanPaginate


