import React, {useState} from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { TextareaAutosize, TextField} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
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
//  const SelectPropertyTypeContainer = styled.div`
//  display: flex;
//  border: none;
//  outline: none;
//  background-color: inherit;
//  `
//  const SelectPropertyType = styled.input`
//  display: none;
//  :checked + Label {
//   background-color:#008080;
//   color: #ffffff;
// }
//  `
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
 const ErrMessage = styled.h5`
 color: red;
 `
 const StyledTextField = styled(TextField)`

 `
function Description(props: { updateProperty: any, property: any, setProperty: any }) {

  const property = props.property;
  const setProperty = props.setProperty;
  const { register, formState: { errors },handleSubmit } = useForm({
    defaultValues: {
      propertyTitle: property.propertyTitle,
      description: property.description,
    }
  });

 let navigate = useNavigate();
  
 const onSubmit = (data: any) => {
  toast.success('Saved..')
 console.log(data);
 props.updateProperty(data);
 navigate('/agentproperties/photos')

};

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
       <Items><PropertyTypeLink to='/agentproperties/propertyType'>Property type</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/location'>Location</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/propertySizeAndPrice'>Property size and Price</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/description'><strong>Description</strong></PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/photos'>Photos </PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/videoAnd3Dtours'>Video & 3D tours</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/details'>Details</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/utilities'>Utilities</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/features'>Features</PropertyTypeLink></Items>
       </ItmesContainer>
     </Grid>
     <Grid item lg={9} md={9} sm={12} xs={12}>
     <FormContainer>
     <FormTitle>Description</FormTitle>
     <FormInfo>Full description of the property. Describe the property in detail.</FormInfo>
     <Form  onSubmit={handleSubmit(onSubmit)}>
     <StyledTextField variant='outlined' fullWidth label='PROPERTY TITLE' type='text' {...register('propertyTitle',{required: 'Property address is required....'})} name='propertyTitle' value={property.propertyTitle} onChange={(e: any) => setProperty({...property, propertyTitle: e.target.value})} size='small' />
     <TextareaAutosizes style={{ width: '99%', marginTop: 10}} minRows='10' placeholder='Description....' {...register('description',{required: 'Property address is required....'})} name='description' value={property.description} onChange={(e: any) => setProperty({...property, description: e.target.value})} />
     
      {errors.propertyTitle || errors.description ? <ErrMessage>{'all field required'}</ErrMessage> : ''}
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

export default Description

