import React, {useState} from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink} from "react-router-dom";
import { useForm } from 'react-hook-form';
import {TextField} from '@mui/material';
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
 const ErrMessage = styled.h5`
 color: red;
 `
 const InputContainer = styled.div`
 display: flex;
 justify-content: start;
 margin-bottom: 20px;
 `
 const Input = styled.input`
 text-align: start;
 display: none;
:checked + Label {
  background-color:#008080;
  color: #ffffff;
}
 `
 const Label = styled.label`
 text-align: center;
 color: #008080;
border: 1px solid #008080;
border-radius: 5px;
cursor: pointer;
padding: 2px 5px;
width: 60px;
margin-top: 10px;
font-size: 0.8rem;
margin-right: 10px;
 `
 const SizeInput = styled(TextField)`

 `
 const Span = styled.span`
 text-align: start;
 color: #494949;
`
 const SpanContainer = styled.div`
 border: 0.5px solid #D3D3D3;
 padding: 8.6px 10px;
 border-radius: 5px;
 `
 const Sup = styled.sup`
 font-size: 10px;
 color: #494949;
 `
 const NairaContainer = styled.div`
 border: 0.5px solid #D3D3D3;
 padding: 8.8px 10px;
 border-radius: 5px;
 `
 const Select = styled.select`
 width: 100%;
 height: 100%;
 outline: none;
 border: 0.5px solid #D3D3D3;
 border-radius: 5px;
 color: #898989;
 font-size: 1rem;
 `
 const Option = styled.option`

 `

function PropertySizeAndPrice(props: {updateProperty: any, property: any, setProperty: any}) {
  
    const [category, setCategory] = useState(false);

    const property = props.property;
    const setProperty = props.setProperty;
    const { register, formState: { errors },handleSubmit } = useForm({
      defaultValues: {
        size: property.size,
        price: property.price,
        paymentType: property.paymentType
      }
    });
   let navigate = useNavigate();
    
   const customId = "custom-id-yes";
   const notify = () => {
    toast.success('Saved..', {
      toastId: customId
     })
     }
  
   const onSubmit = (data: any) => {
   console.log(data);
   props.updateProperty(data);
    notify()
    navigate('/agentproperties/description')
  };
  
  const handleBackButton = () => {
    navigate('/agentproperties/location')
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
      <Items><PropertyTypeLink to=''><strong>Property size and Price</strong></PropertyTypeLink></Items>
      <Items><PropertyTypeLink to=''>Description</PropertyTypeLink></Items>
      <Items><PropertyTypeLink to=''>Photos </PropertyTypeLink></Items>
      <Items><PropertyTypeLink to=''>Video & 3D tours</PropertyTypeLink></Items>
      <Items><PropertyTypeLink to=''>Details</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Utilities</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Features</PropertyTypeLink></Items>
     </ItmesContainer>
    </Grid>
    <Grid item lg={9} md={9} sm={12} xs={12}>
    <FormContainer>
    <FormTitle>Property size and price</FormTitle>
    <Form  onSubmit={handleSubmit(onSubmit)}>
     <InputContainer>
     <Input type='radio' id='1' 
    //  {...register('category',{required: true})} 
     name='category'   
     value='sale'
    //  checked={category === true}
     onChange={(e: any) => setProperty({...property, category: e.target.value})}
     />
     <Label htmlFor='1' onClick={() => setCategory(true)}>For sale</Label>
     <Input type='radio' id='2' 
    //  {...register('category',{required: true})}
      name='category'
       value='rent'
      //  checked={category === false}
      onChange={(e: any) => setProperty({...property, category: e.target.value})}
        />
     <Label htmlFor='2' onClick={() => setCategory(false)}>For rent</Label>
     </InputContainer>
     <Grid container rowGap={2}>
     <Grid container>
     <Grid item lg={2} md={4} sm={10} xs={10}>
     <SizeInput type='number' fullWidth label='SIZE' {...register('size',{required: 'Property address is required....'})}   name='size' value={property.size} onChange={(e: any) => setProperty({...property, size: e.target.value})} size='small' />
     </Grid>
     <Grid item lg={1} md={1} sm={2} xs={2}>
     <SpanContainer>
     <Span>m<Sup>2</Sup></Span>
     </SpanContainer>
     </Grid>
     </Grid>
     <Grid container>
     <Grid item lg={0.5} md={0.5} sm={1} xs={1}>
     <NairaContainer>
     <Span>₦</Span>
     </NairaContainer>
     </Grid>
     <Grid item lg={3} md={3} sm={9} xs={9}>
      
      { category === true ? 
      <SizeInput type='number' fullWidth label= 'SALE PRICE' {...register('price',{required: 'Property address is required....'})}   name='price' value={property.price} onChange={(e) => setProperty({...property, price: e.target.value})} size='small' />
        :
        <SizeInput type='number' fullWidth label= 'LEASE PRICE'  {...register('price',{required: 'Property address is required....'})}   name='price' value={property.price} onChange={(e) => setProperty({...property, price: e.target.value})} size='small' />
      }
      
     </Grid> 
     <Grid item lg={1.5} md={1.5} sm={2} xs={2}>
      <>
      { category === true ?
    <>
     <Select 
     value={property.paymentType}
     {...register('paymentType',{required: 'required....'})} 
     name='paymentType'
     onChange={(e: any) => setProperty({...property, paymentType: e.target.value})}
     >
      <Option>Payment</Option>
     {/* <Option value='total price'>Total price</Option> */}
     <Option value='outright'>Outright</Option>
     <Option value='price per square meter'>Price per square meter</Option>
     </Select>
      </> :
      <>
      <Select
     {...register('paymentType',{required: 'required....'})} 
     name='paymentType'
     value={property.paymentType}
     onChange={(e: any) => {setProperty({...property, paymentType: e.target.value})}}
     >
      <Option>payment</Option>
      <Option value='yearly'>Yearly</Option>
      <Option value='monthly'>Monthly</Option>
      <Option value='weekly'>Weekly</Option>
      <Option value='daily'>Daily</Option>
     </Select>
     </>
     }
      </>
     </Grid>
     </Grid>
     </Grid>
     {errors.size || errors.price ? <ErrMessage>{'all field required'}</ErrMessage> : ''}
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

export default PropertySizeAndPrice