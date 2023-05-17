import React from 'react'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from "react-router-dom";
import { useAppSelector } from '../app/hooks';
import { selectCurrentCommercial } from '../services/features/commercialSlice';

function CommercialPaginate(props: {page: any}) {

  const {commercial} = useAppSelector(selectCurrentCommercial);
      {/* @ts-ignore:next-line */}
     const numberOfPages = commercial?.numberOfPages;
    const page = props.page;
    
  return (
    <Pagination 
    count={numberOfPages} 
    page={Number(page) || 1}
    variant="outlined" 
    color='primary'
    renderItem={(item: any) => (
        <PaginationItem {...item} component={Link} to={`/commercial?page=${item.page}`}  />
    )}
    />                  
  )
    }

export default CommercialPaginate


