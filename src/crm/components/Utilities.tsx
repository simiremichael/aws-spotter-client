import React, {useState} from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { TextareaAutosize, TextField} from '@mui/material';
import  { SelectChangeEvent } from '@mui/material/Select';
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
const TextareaAutosizes = styled(TextareaAutosize)`
border: 1px solid #D3D3D3; 
color: #494949;
outline: none;
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

function Utilities(props: { updateProperty: any, property: any, setProperty: any}) {

  const property = props.property;
  const setProperty = props.setProperty;
  const { handleSubmit } = useForm({
    defaultValues: {
      propertyTax: property.propertyTax,
      electricity: property.electricity,
      water: property.water,
      otherUtilities: property.otherUtilities,
      utilities: property.utilities,
      taxes: property.taxes,
    }});
 
    let navigate = useNavigate();
  
 const onSubmit = (data: any) => {
  toast.success('Saved..')
 console.log(data);
 props.updateProperty(data);
 navigate('/agentproperties/features')
};

const handleBackButton = () => {
  navigate('/agentproperties/details')
}

  return (
    <StyledBox >
    <StyledContainer >
    <FormTitle>UTILITIES</FormTitle>
     <Grid container>
     <Grid item lg={3} md={3} sm={12} xs={12}>
      <ItmesContainer>
       <Items><PropertyTypeLink to=''>Property type</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Location</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Property size and Price</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Description</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Photos </PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Video & 3D tours</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Details</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''><strong>Utilities</strong></PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Features</PropertyTypeLink></Items>
      </ItmesContainer>
     </Grid>
     <Grid item lg={9} md={9} sm={12} xs={12}>
     <FormContainer>
     <FormTitle>Utilities and Taxes</FormTitle>
     <FormInfo>Monthly utilities and taxes of property</FormInfo>
     <Form  onSubmit={handleSubmit(onSubmit)}>
     <InnerContainer>
     <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={6}>
         <StyledTextField variant='outlined' label='PROPERTY TAX' type='text'  name='propertyTax' value={property.propertyTax} onChange={(e: any) => setProperty({...property, propertyTax: e.target.value})} size='small' fullWidth />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
         <StyledTextField variant='outlined' label='ELECTRICITY' type='number'  name='electricity' value={property.electricity} onChange={(e: any) => setProperty({...property, electricity: e.target.value})} size='small' fullWidth />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
         <StyledTextField variant='outlined' label='WATER' type='text'  name='water' value={property.water} onChange={(e: any) => setProperty({...property, water: e.target.value})} size='small' fullWidth />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
         <StyledTextField variant='outlined' label='SERVICE CHARGE' type='NUMBER' name='serviceCharge' value={property.serviceCharge} onChange={(e: any) => setProperty({...property, serviceCharge: e.target.value})} size='small' fullWidth />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextareaAutosizes style={{ width: '99%', marginTop: 10}} minRows='6' placeholder='UTILITIES Details....' name='utilities' value={property.utilities} onChange={(e: any) => setProperty({...property, utilities: e.target.value})}  />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextareaAutosizes style={{ width: '99%', marginTop: 10}} minRows='6' placeholder='TAXE Details....'  name='taxes' value={property.taxes} onChange={(e: any) => setProperty({...property, taxes: e.target.value})} />
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

export default Utilities