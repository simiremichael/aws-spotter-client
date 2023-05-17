import React from 'react'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from "react-router-dom";
import { useAppSelector } from '../app/hooks';
import { selectCurrentRentProperty } from '../services/features/rentPropertySlice';

function RentPaginate(props: {page: any}) {

     const { rentProperty} = useAppSelector(selectCurrentRentProperty);
      {/* @ts-ignore:next-line */}
     const numberOfPages = rentProperty?.numberOfPages;
    const page = props.page;
    //console.log(numberOfPages);
    
  return (
    <Pagination 
    count={numberOfPages} 
    page={Number(page) || 1}
    variant="outlined" 
    color='primary'
    renderItem={(item: any) => (
        <PaginationItem {...item} component={Link} to={`/rent?page=${item.page}`}  />
    )}
    />                  
  )
    }

export default RentPaginate


