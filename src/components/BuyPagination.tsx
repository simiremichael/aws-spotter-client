import React from 'react'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from "react-router-dom";
import { useAppSelector } from '../app/hooks';
import { selectCurrentBuyProperty } from '../services/features/buyPropertySlice';

function BuyPaginate(props: {page: any}) {

     
     const { buyProperty} = useAppSelector(selectCurrentBuyProperty);
      {/* @ts-ignore:next-line */}
     const numberOfPages = buyProperty?.numberOfPages;
    const page = props.page;
    
  return (
    <Pagination 
    count={numberOfPages} 
    page={Number(page) || 1}
    variant="outlined" 
    color='primary'
    renderItem={(item: any) => (
        <PaginationItem {...item} component={Link} to={`/buy?page=${item.page}`}  />
    )}
    />                  
  )
    }

export default BuyPaginate


