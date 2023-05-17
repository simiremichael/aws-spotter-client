import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled'
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {useSearchParams} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { useCompanyPropertySearchQuery } from '../../services/api/propertyAPI';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCurrentCompany } from '../../services/features/companySlice';
import { selectCurrentCompanyProperty, setCompanyProperties } from '../../services/features/companyPropertySlice';
import CompanyPropertyPaginate from '../components/companyPropertyPagination';
import { Paper } from '@mui/material';
import useDebounce from '../../debounce/useDebounce';

const StyledBox = styled(Box)`
width: 100%;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 100%);
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
    margin: 1rem 0 0 0;
`
const SearchContainer = styled.div`
border: 2px solid #C4C4C4;
width: 90%;
height: 30px;
margin-top: 40px;
margin-left: 8%;
border-radius: 10px;
display: flex;
align-items: center;
@media screen and (max-width: 768px) {
  margin-left: 0;
  margin-left: 8%;
  width: 80%;
}
`
const Input = styled.input`
height: 96%;
width: 90%;
border: none;
outline: none;
margin-right: 3px;
margin-left: 6px;
border-radius: 10px;
background-color: inherit;
color: #494949;
Font-size: 12px;
`
const Span = styled.span`
Font-family: Montserrat;
Font-size: 2.5vmin;
width: 40%;
color: #494949;
`
const SearchSvg = styled.svg`
width: 20px;
height: 20px;
margin: 0 7px;
`
const Thead = styled.thead`
width: 100%;
background-color: #008080;
height: 40px;
`
const Tbody = styled.tbody`
height: 140px;
`
const Tables = styled.table`
border: 2px solid rgba(0, 0, 0, 0.2);
border-collapse: collapse;
width: 100%;
margin: 20px 0;
@media screen and (max-width: 900px) {
  width: 800px;
 }
`
const Tr = styled.tr`

`
const Th = styled.th`
color: #fff;
margin: 0;
font-size: 0.7rem;
`
const Td = styled.td`
margin: 0;
font-size: 0.7rem;
border-bottom: 2px solid rgba(0, 0, 0, 0.2);
text-align: center;
vertical-align: center;
`
const StyledAvatar = styled(Avatar)`
width: 30px;
height: 30px;
background-image: url('../../images/blank_avater.jpg');
background-size: 100% 100%;
`
const NavContainer = styled.div`
margin-left: 22px;
`
// const ClearSearchBtn = styled.button`
// outline: none;
// background-color: transparent;
// padding: 2px;
// border: none;
// cursor: pointer;
// `

function PropertyList() {

  const [search, setSearch] = useState('')
  let [searchParams, setSearchParams] = useSearchParams('' );
  const dispatch = useAppDispatch();
  const searchQuery = searchParams.get('search');
  const page = searchParams.get('page') || 1;
   const {company} = useAppSelector(selectCurrentCompany);
  
    {/* @ts-ignore:next-line */}
   const companyId = company?.result?._id;
   const { data} = useCompanyPropertySearchQuery({companyId, searchQuery, page, search}, {refetchOnMountOrArgChange: true });
   useEffect(() => {
    if(data) {
  dispatch(setCompanyProperties({companyProperty: data}))
    }
   }, [data, dispatch, ])
   const {companyProperty} = useAppSelector(selectCurrentCompanyProperty);
 
const debouncedSearch = useDebounce(search, 300);

   const handleChange = (e: any) => {
 e.preventDefault();
  setSearch(e.target.value);
 setSearchParams({'search': debouncedSearch})
   }

   useEffect(() => {
  if(!search) {
    setSearchParams({'search': ''})
  }
   }, [search])
 
  return (
   <StyledBox>
   <Grid container>
   <Grid item lg={2} md={2} sm={12} xs={12}>
      <Sidebar />
        </Grid>
        <Grid item  lg={10} md={10} sm={12} xs={12}>
        <NavContainer>
        <Navbar />
        </NavContainer>
      <Grid container>
      <Grid item  lg={6} md={6} sm={8} xs={12}>
      <SearchContainer>
       <SearchSvg  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"/></SearchSvg>
       <Span>Search by location</Span>
       <Input type='search' value={search} onChange={handleChange} />
       </SearchContainer>
      </Grid>
      </Grid>
       <Grid container>
       <Grid item lg={0.5} md={0.5} sm={0} xs={0}></Grid>
         <Grid item lg={11} md={11} sm={12} xs={12} style={{width: '100%', overflowX: 'scroll' }}> 
         <Tables >
         <Thead>
        <Tr>
        <Th></Th>
           <Th>Property</Th>
           <Th>Property Type</Th>
           <Th>Category</Th>
           <Th>Location</Th>
           <Th>Property Price</Th>
           <Th>Address</Th>
           <Th>Agent Name</Th>
           <Th></Th>
        </Tr>
        </Thead>
        <Tbody>
          {/* @ts-ignore:next-line */}
        {companyProperty?.companyProperties.map((result: any) => (           
        <Tr key={result._id}>
           <Td>
           <StyledAvatar src={result?.profilePicture} style={{marginLeft: '10px'}} />
           </Td>
           <Td>{result?.propertyGroup}</Td>
           <Td>{result?.propertyType}</Td>
           <Td>{result?.category}</Td>
           <Td>{result?.city}</Td>
           <Td>{result?.price}</Td>
           <Td>{result?.address1}</Td>
           <Td>{result?.name}</Td>
        </Tr>
         ))
        }
        </Tbody>
       </Tables>
       </Grid>
       <Grid item lg={0.5} md={0.5} sm={0} xs={0}></Grid>
       </Grid>
       <Paper elevation={1} sx={{ background: 'inherit', width: '100%', marginTop: 2, marginBottom: 2, display: 'flex', justifyContent: 'center'}}>
       <CompanyPropertyPaginate page={page} search={search} /> 
     </Paper>
     {/* </TableContainer> */}
      </Grid>
       </Grid>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
   </StyledBox>
  )
}

export default PropertyList


