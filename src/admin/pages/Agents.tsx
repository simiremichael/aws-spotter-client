import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled'
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Link, useNavigate} from "react-router-dom";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Avatar from '@mui/material/Avatar';
import { useDeleteAgentMutation, useGetAgentCompanyQuery, useGetPropertiesByAgentQuery, useGetPropertiesQuery, useUpdateAgentMutation } from '../../services/api/propertyAPI';
import { selectCurrentCompany } from '../../services/features/companySlice';
import { useAppSelector } from '../../app/hooks';

const StyledBox = styled(Box)`
width: 100%;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
  margin: 1rem 0 10px 0;
`
const TopContainer = styled.div`
height: 44px;
margin-top: 20px;
border-bottom: 3px solid rgba(0, 0, 0, 0.1);
margin-left: 4%;
`
const StyledLi =styled.li`
list-style-type: none;
Font-family:Montserrat;
weight: 600;
font-size: 18px;
Line-heigh: 21.94px;
Letter: -0.5%;
display: flex;
align-items: center;
justify-content: start;
cursor: pointer;
color: #494949;
`
const CallIconContainer = styled.div`
margin-right: 10px;
background-color: rgba(25, 130, 175, 0.28);
padding: 8px;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: enter;
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
@media screen and (max-width: 900px) {
  margin-left: 0;
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
height: 60px;
`
const Tables = styled.table`
border: 2px solid rgba(0, 0, 0, 0.2);
margin-top: 0;
margin-bottom: 10px;
width: 100%;
margin-top: 20px;
border-collapse: collapse;
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
const ActionContaner = styled.div`
display: flex;
justify-content: center;
`
const EditContainer = styled.div`
background-color: #4169E1;
padding: 5px;
border-radius: 5px;
margin-right: 5px;
cursor: pointer;
color: #fff;
`
const DeleteContainer = styled.div`
background-color: #FF6347;
padding: 5px;
border-radius: 5px;
margin-left: 5px;
cursor: pointer;
color: #fff;
`
const IconSpan = styled.span`
margin-left: 2px;
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
const StyledLink = styled(Link)`
text-decoration: none;
 color: #494949;
`

function Agents() {

  const {company} = useAppSelector(selectCurrentCompany);
   let navigate = useNavigate();
 {/* @ts-ignore:next-line */}
    const compId = company?.result?._id;
    const { data,  isLoading } = useGetAgentCompanyQuery(compId, {refetchOnMountOrArgChange: true });
    {/* @ts-ignore:next-line */}
     const agentId = data?.filter((item: any) => item._id);
    const { data: agentData, error} = useGetPropertiesByAgentQuery(agentId, {refetchOnMountOrArgChange: true });
    const [deleteAgent] = useDeleteAgentMutation();      
    const {data: agentProp} = useGetPropertiesQuery();
{/* @ts-ignore:next-line */}
    const agentProperties = agentProp?.data?.filter((dat: any) => dat.creator).map((i:any) => i === agentId).length

     console.log(agentProperties, agentData, data, agentId);
  
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
         <TopContainer>
       <Grid container>
       <Grid item lg={2.5} md={2.5} sm={3} xs={6}>
       <StyledLi onClick={() => navigate('/adminHomepage/registerAgent')}><CallIconContainer><PersonAddIcon style={{color: '#008080'}} /></CallIconContainer>Add agent</StyledLi>
       </Grid>
       </Grid>
       </TopContainer>
       <Grid container>
      <Grid item  lg={6} md={6} sm={8} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
        <SearchContainer>
        <SearchSvg  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"/></SearchSvg>
        <Span>Search here</Span>
        <Input />
        </SearchContainer>
        </Grid>
       </Grid>
        <Grid container>
        <Grid item lg={0.5} md={0.5} sm={0} xs={0}></Grid>
          <Grid item lg={11} md={11} sm={12} xs={12} style={{width: '100%', overflowX: 'scroll' }}> 
          <Tables>
          <Thead>
         <Tr>
            <Th></Th>
            <Th>Name</Th>
            <Th>Designation</Th>
            <Th>Gender</Th>
            <Th>Mobile</Th>
            <Th>Email</Th>
            <Th>properties</Th>
            <Th>Action</Th>
         </Tr>
         </Thead>
         <Tbody>
           {/* @ts-ignore:next-line */}
          {data?.map((result: any) =>  ( 
         <Tr key={result._id}>
            <Td>
            <StyledAvatar src={result.profilePicture} style={{marginLeft: '10px'}} />
            </Td>
            <Td>{result?.name}</Td>
            <Td>{result.role}</Td>
            <Td>Male</Td>
            <Td>{result.phone}</Td>
            <Td>{result.email}</Td>
               {/* @ts-ignore:next-line */}
            <Td>{agentProp?.data?.filter((dat: any) => dat.creator === result._id).length}</Td>
            <Td><ActionContaner>
            <StyledLink to={`/adminHomepage/registerAgent/${result._id}`}>
                <EditContainer>
                <EditOutlinedIcon sx={{ fontSize: 15, marginBottom: -0.3 }} />
                  <IconSpan>Edit</IconSpan>
                </EditContainer>
                </StyledLink>
                <DeleteContainer onClick={() => deleteAgent(result?._id)}>
                <DeleteForeverOutlinedIcon sx={{ fontSize: 15, marginBottom: -0.3  }} />
                  <IconSpan>Delete</IconSpan>
                </DeleteContainer>
               </ActionContaner></Td>
         </Tr>
         ))}
           
         </Tbody>
        </Tables>
        </Grid>
        <Grid item lg={0.5} md={0.5} sm={0} xs={0}></Grid>
        </Grid>
       </Grid>
        </Grid>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    </StyledBox>
  )
}

export default Agents