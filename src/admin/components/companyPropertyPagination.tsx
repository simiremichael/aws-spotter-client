import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentCompanyProperty } from '../../services/features/companyPropertySlice';

function CompanyPropertyPaginate(props: {page: unknown, search: unknown}) {
     
     const { companyProperty} = useSelector(selectCurrentCompanyProperty);
      {/* @ts-ignore:next-line */}
     const numberOfPages = companyProperty?.numberOfPages;
    const page = props.page;
    const search = props.search

  return (
    <Pagination 
    count={numberOfPages} 
    page={Number(page) || 1}
    variant="outlined" 
    color='primary'
    renderItem={(item: any) => (
        <PaginationItem {...item} component={Link} to={`/adminHomepage/propertyList?page=${item.page}&search=${search}`}  />
    )}  
    />       
  )
    }
export default CompanyPropertyPaginate


