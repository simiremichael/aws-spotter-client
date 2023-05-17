import React from 'react'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentPropertySearch } from '../services/features/propertySearchSlice';

function Paginate(props: {page: any}) {

     
     const { propertySearch} = useSelector(selectCurrentPropertySearch);
      {/* @ts-ignore:next-line */}
     const numberOfPages = propertySearch?.numberOfPages;
    const page = props.page;
    
  return (
    <Pagination 
    count={numberOfPages} 
    page={Number(page) || 1}
    variant="outlined" 
    color='primary'
    renderItem={(item: any) => (
        <PaginationItem {...item} component={Link} to={`/properties?page=${item.page}`}  />
    )}
    />                   
  )
    }

export default Paginate


