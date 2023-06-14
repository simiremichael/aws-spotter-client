import React, {useState} from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledBox = styled(Box)`
`
const StyledContainer = styled(Container)`
margin-bottom: 20px;
`
const ItmesContainer= styled.div`
margin-top: 20px;
@media screen and (max-width: 900px) {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  margin-top: 0;
}
`
const Items = styled.p`
text-align: start;
color: #494949;
@media screen and (max-width: 900px) {
  margin: 10px;
}
`
const FormContainer = styled.div`
width: 100%;
border: 0.5px solid #D3D3D3;
padding: 20px 10px;
`
const FormTitle = styled.h5`
font-size: 1.5rem;
text-align: start;
font-weight: 400;
color: #383838;
margin-bottom: 0;
`
const FormInfo = styled.p`
color: #494949;
font-size: 0.7rem;
text-align: start;
margin-bottom: 30px;
`
const PropertyTypeLink = styled(NavLink)`
 text-decoration: none;
 color: #494949;
 :active{
  front-weight: bold;
 }
 `
 const Form = styled.form`
`
 const ButtonContainer = styled.div`
 display: flex;
 width: 100%;
 justify-content: start;
 margin-top: 20px;
 `
 const NextButton = styled.button`
 border: none;
 background-color:#008080;
 color: #ffffff;
 outline: none;
 font-size: 1rem;
 padding: 6px 15px;
 font-size: 1rem;
 font-weight: bold;
 border-radius: 5px;
 cursor: pointer;
 `
 const CloseButton = styled.button`
 border: 0.5px solid #D3D3D3;
 background-color: inherit;
 color: #494949;
 outline: none;
 margin-right: 15px;
 padding: 6px 15px;
 font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
 `
 const StyledTextField = styled(TextField)`
 `
 const InnerContainer = styled.div`
 `
function Details(props: { updateProperty: any, property: any, setProperty: any}) {

  const [category, setCategory] = useState(false);
  const [price, setPrice] = useState('');
  
  const property = props.property;
  const setProperty = props.setProperty;
  const { handleSubmit } = useForm({
    defaultValues: {
      uniqNo: property.uniqNo,
      bedroom: property.bedroom,
      kitchen: property.kitchen,
      livingRoom: property.livingRoom,
      showerRoom: property.showerRoom,
      bathRoom: property.bathRoom,
      buildingYear: property.buildingYear,
      yearRenovated: property.yearRenovated,
      lotSize: property.lotSize 
    }
  });

 let navigate = useNavigate();
  
 const onSubmit = (data: any) => {
  toast.success('Saved..')
 console.log(data);
 props.updateProperty(data);
 navigate('/agentproperties/utilities')
};

// const handleCategory = () => {
//   setCategory(!category);
// }


// const handleChange = (e: any) => {
//   setPrice(e.target.value as string);
// };

const handleBackButton = () => {
  navigate('/agentproperties/propertySizeAndPrice')
}

  return (
    <StyledBox >
    <StyledContainer >
    <FormTitle>Price</FormTitle>
     <Grid container>
     <Grid item lg={3} md={3} sm={12} xs={12}>
      <ItmesContainer>
       <Items><PropertyTypeLink to=''>Property type</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Location</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Property size and Price</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Description</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Photos </PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Video & 3D tours</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''><strong>Details</strong></PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Utilities</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Features</PropertyTypeLink></Items>
      </ItmesContainer>
     </Grid>
     <Grid item lg={9} md={9} sm={12} xs={12}>
     <FormContainer>
     <FormTitle>Details</FormTitle>
     <FormInfo>Provide as many details as possible.</FormInfo>
     <Form  onSubmit={handleSubmit(onSubmit)}>
     <InnerContainer>
     <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={6}>
         <StyledTextField variant='outlined' label='UNIQ NO' name='uniqNo' value={property.uniqNo} onChange={(e: any) => setProperty({...property, uniqNo: e.target.value})} size='small' fullWidth />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
         <StyledTextField variant='outlined' label='DEVELOPER' name='developer' value={property.developer} onChange={(e: any) => setProperty({...property, developer: e.target.value})} size='small' fullWidth />
        </Grid>
        <Grid item lg={3} md={3} sm={4} xs={4}>
         <StyledTextField variant='outlined' label='BEDROOMS' type='NUMBER' name='bedroom' value={property.bedroom} onChange={(e: any) => setProperty({...property, bedroom: e.target.value})} size='small' fullWidth />
        </Grid>
        <Grid item lg={3} md={3} sm={4} xs={4}>
         <StyledTextField variant='outlined' label='KITCHENS' type='NUMBER' name='kitchen' value={property.kitchen} onChange={(e: any) => setProperty({...property, kitchen: e.target.value})}  size='small' fullWidth />
        </Grid>
        <Grid item lg={3} md={3} sm={4} xs={4}>
         <StyledTextField variant='outlined' label='LIVING ROOMS' type='NUMBER' name='livingRoom' value={property.livingRoom} onChange={(e: any) => setProperty({...property, livingRoom: e.target.value})} size='small' fullWidth />
        </Grid>
        <Grid item lg={3} md={3} sm={4} xs={4}>
         <StyledTextField variant='outlined' label='BATHROOMS' type='number' name='bathRoom' value={property.bathroom} onChange={(e: any) => setProperty({...property, bathroom: e.target.value})} size='small' fullWidth />
        </Grid>
        <Grid item lg={3} md={3} sm={4} xs={4}>
         <StyledTextField variant='outlined' label='BUILDING YEAR' type='number' name='buildingYear' value={property.buildingYear} onChange={(e: any) => setProperty({...property, buildingYear: e.target.value})} size='small' fullWidth />
        </Grid>
        <Grid item lg={3} md={3} sm={4} xs={4}>
         <StyledTextField variant='outlined' label='YEAR RENOVATED' type='NUMBER' name='yearRenovated' value={property.yearRenovated} onChange={(e: any) => setProperty({...property, yearRenovated: e.target.value})} size='small' fullWidth />
        </Grid>
        </Grid>
     </InnerContainer>
      <ToastContainer />
    <ButtonContainer>
    <CloseButton type='button' onClick={handleBackButton}>Back</CloseButton>
    <NextButton type='submit'>Continue</NextButton>
    </ButtonContainer>
     </Form> 
     </FormContainer>
     </Grid>
     </Grid>
    </StyledContainer>
   </StyledBox>
  )
}

export default Details
