import React, {useState, useRef, useEffect} from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledBox = styled(Box)`
`
const StyledContainer = styled(Container)`
margin-bottom: 20px;
`
const ItmesContainer= styled.div`
margin-top: 5px;
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
 const SelectPropertyTypeContainer = styled.div`
 display: flex;
 border: none;
 outline: none;
 background-color: inherit;
 `
 const SelectPropertyType = styled.input`
 display: none;
 :checked + Label {
  background-color:#008080;
  color: #ffffff;
}
 `
 const SelectLabel = styled.label`
 text-align: start;
 color: #008080;
border: 1px solid #008080;
border-radius: 5px;
cursor: pointer;
padding: 2px 10px 2px;
width: 120px;
font-weight: 700;
margin-top: 10px;
font-size: 0.8rem;
 `
 const Form = styled.form`
 width: 100%;
 `
 const InputRadeo = styled.input`
 text-align: start;
 display: none;
:checked + Label {
  background-color:#008080;
  color: #ffffff;
}
 `
 const Label = styled.label`
 text-align: start;
 color: #008080;
border: 1px solid #008080;
border-radius: 5px;
cursor: pointer;
padding: 2px 10px 2px;
width: 120px;
margin-top: 10px;
font-size: 0.8rem;
 `
 const ResidentContainer = styled.div`
 display: flex;
 justify-content: start;
 flex-direction: column;
 margin-top: 20px;
 `
 const ComLandContainer = styled.div`
 display: flex;
 justify-content: start;
 flex-direction: column;
 margin-top: 20px;
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

function PropertyType(props: { updateProperty: any, property: any, setProperty: any}) {

  const [select1, setSelect1] = useState(false);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [select4, setSelect4] = useState(false);
  const [select5, setSelect5] = useState(false);
 
 const property = props.property;
 const setProperty = props.setProperty;
  const { register, formState: { errors },handleSubmit } = useForm({
    defaultValues: {
      propertyType: property.propertyType,
      propertyGroup: property.propertyGroup
    }
  });

  let navigate = useNavigate();
                                      
  const handleSelect1 = (state: boolean) => {
    setSelect1(!state)
    setSelect2(false)
    setSelect3(false)
    setSelect4(false)
    setSelect5(false)
  };
  const handleSelect2 = (state: boolean) => {
    setSelect2(!state)
    setSelect1(false)
    setSelect3(false)
    setSelect4(false)
    setSelect5(false)
  };
  const handleSelect3 = (state: boolean) => {
    setSelect3(!state)
    setSelect2(false)
    setSelect1(false)
    setSelect4(false)
    setSelect5(false)
    
  };
  const handleSelect4 = (state: boolean) => {
    setSelect4(!state)
    setSelect2(false)
    setSelect3(false)
    setSelect1(false)
    setSelect5(false)
  };
  const handleSelect5 = (state: boolean) => {
    setSelect5(!state)
    setSelect2(false)
    setSelect3(false)
    setSelect4(false)
    setSelect1(false)
  };

  const notify = () => {
    toast.success('Saved..')
    }

  const onSubmit = (data: any) => {
   console.log(data);
   props.updateProperty(data);
    notify();
    navigate('/agentproperties/location')
  };
  
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => { 
  const closeDropDown = (e: any) => {
    if(ref.current &&  !ref.current.contains(e.target)) {
      setSelect1(false)
      setSelect2(false)
      setSelect3(false)
      setSelect4(false)
      setSelect5(false)
    }
  }
  window.addEventListener('click', closeDropDown, true)
}, []);

  return (
    <div  ref={ref}>
<StyledBox >
 <StyledContainer >
 <FormTitle>New Property</FormTitle>
  <Grid container>
  <Grid item lg={3} md={3} sm={12} xs={12}>
   <ItmesContainer>
    <Items><PropertyTypeLink to=''><strong>Property type</strong></PropertyTypeLink></Items>
    <Items><PropertyTypeLink to=''>Location</PropertyTypeLink></Items>
    <Items><PropertyTypeLink to=''>Property size and Price</PropertyTypeLink></Items>
    <Items><PropertyTypeLink to=''>Description</PropertyTypeLink></Items>
    <Items><PropertyTypeLink to=''>Photos </PropertyTypeLink></Items>
    <Items><PropertyTypeLink to=''>Video & 3D tours</PropertyTypeLink></Items>
    <Items><PropertyTypeLink to=''>Details</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Utilities</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Features</PropertyTypeLink></Items>
   </ItmesContainer>
  </Grid>
  <Grid item lg={9} md={9} sm={12} xs={12}>
  <FormContainer ref={ref}>
  <Form  onSubmit={handleSubmit(onSubmit)}>
  <Grid container spacing={2}>
 <Grid item lg={2.4} md={2.4} sm={2.4} xs={12}>
 <SelectPropertyTypeContainer>
  <SelectPropertyType type='radio' id='res' {...register('propertyGroup',{required: 'Property category is required....'})} name='propertyGroup'   value='residential'  />
  <SelectLabel htmlFor='res' onClick={(e) => handleSelect1(select1)}>Residential</SelectLabel>
 </SelectPropertyTypeContainer>
 { select1 && (
  <ResidentContainer>
  <InputRadeo type='radio' id='1' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType'  value='apartment' />
  <Label htmlFor='1'>APARTMENT</Label>
  <InputRadeo type='radio' id='2' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType'  value='flat' />
  <Label htmlFor='2'>FLAT</Label>
  <InputRadeo type='radio' id='3' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='studio' />
  <Label htmlFor='3'>STUDIO</Label>
  <InputRadeo type='radio' id='4'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='terraced' />
  <Label htmlFor='4'>TERRACED</Label>
  <InputRadeo type='radio' id='5'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='full floor' />
  <Label htmlFor='5'>FULL FLOOR</Label>
  <InputRadeo type='radio' id='6'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='whole building' />
  <Label htmlFor='6'>WHOLE BUILDING</Label>
  <InputRadeo type='radio' id='7'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='hotel appartment' />
  <Label htmlFor='7'>HOTEL APARTMENT</Label>
  <InputRadeo type='radio' id='8'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='bungalow' />
  <Label htmlFor='8'>BUNGALOW</Label>
  <InputRadeo type='radio' id='9'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='room' />
  <Label htmlFor='9'>ROOM</Label>
  <InputRadeo type='radio' id='10' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='mini flat' />
  <Label htmlFor='10'>MINI FLAT</Label>
  <InputRadeo type='radio' id='11' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='self contain' />
  <Label htmlFor='11'>SELF CONTAIN</Label>
  <InputRadeo type='radio' id='12' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='detached' />
  <Label htmlFor='12'>DETACHED</Label>
  <InputRadeo type='radio' id='13' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='semi detached' /> 
  <Label htmlFor='13'>SEMI DETACHED</Label>
  </ResidentContainer>
  )}
  </Grid>
 
  <Grid item lg={2.4} md={2.4} sm={2.4} xs={12}>
  <SelectPropertyTypeContainer>
  <SelectPropertyType type='radio' id='com' {...register('propertyGroup',{required: 'Property category is required....'})} name='propertyGroup' value= 'commercial' />
  <SelectLabel htmlFor='com' onClick={(e) => handleSelect2(select2)}>Commercial</SelectLabel>
 </SelectPropertyTypeContainer>
 {select2 && (
  <ComLandContainer>
  <InputRadeo type='radio' id='12' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType'value='office' />
  <Label htmlFor='12'>OFFICE</Label>
  <InputRadeo type='radio' id='13' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='shop' />
  <Label htmlFor='13'>SHOP</Label>
  <InputRadeo type='radio' id='14' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='warehouse' />
  <Label htmlFor='14'>WAREHOUSE</Label>
  <InputRadeo type='radio' id='15' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='industrial' />
  <Label htmlFor='15'>INDUSTRIAL</Label>
  <InputRadeo type='radio' id='16' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='retail' />
  <Label htmlFor='16'>RETAIL</Label>
  <InputRadeo type='radio' id='17' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='land' />
  <Label htmlFor='17'>LAND</Label>
  <InputRadeo type='radio' id='18' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='others' />
  <Label htmlFor='18'>OTHERS</Label>
  </ComLandContainer>
  )}
  </Grid>

  <Grid item lg={2.4} md={2.4} sm={2.4} xs={12}>
 <SelectPropertyTypeContainer>
  <SelectPropertyType type='radio' id='new' {...register('propertyGroup',{required: 'Property category is required....'})} name='propertyGroup' value='new projects'  />
  <SelectLabel htmlFor='new' onClick={(e) => handleSelect4(select4)}>New Projects</SelectLabel>
 </SelectPropertyTypeContainer>
 { select4 && (
  <ResidentContainer>
  <InputRadeo type='radio' id='22' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType'  value='apartment' />
  <Label htmlFor='22'>APARTMENT</Label>
  <InputRadeo type='radio' id='23' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType'  value='flat' />
  <Label htmlFor='23'>FLAT</Label>
  <InputRadeo type='radio' id='24' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='studio' />
  <Label htmlFor='24'>STUDIO</Label>
  <InputRadeo type='radio' id='25'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='terraced' />
  <Label htmlFor='25'>TERRACED</Label>
  <InputRadeo type='radio' id='26'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='full floor' />
  <Label htmlFor='26'>FULL FLOOR</Label>
  <InputRadeo type='radio' id='27'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='whole building' />
  <Label htmlFor='27'>WHOLE BUILDING</Label>
  <InputRadeo type='radio' id='28'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='hotel appartment' />
  <Label htmlFor='28'>HOTEL APARTMENT</Label>
  <InputRadeo type='radio' id='29'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='bungalow' />
  <Label htmlFor='29'>BUNGALOW</Label>
  <InputRadeo type='radio' id='30'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='room' />
  <Label htmlFor='30'>ROOM</Label>
  <InputRadeo type='radio' id='31' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='mini flat' />
  <Label htmlFor='31'>MINI FLAT</Label>
  <InputRadeo type='radio' id='32' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='self contain' />
  <Label htmlFor='32'>SELF CONTAIN</Label>
  <InputRadeo type='radio' id='33' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='detached' />
  <Label htmlFor='33'>DETACHED</Label>
  <InputRadeo type='radio' id='34' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='semi detached' /> 
  <Label htmlFor='34'>SEMI DETACHED</Label>
  <InputRadeo type='radio' id='35' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType'value='office' />
  <Label htmlFor='35'>OFFICE</Label>
  <InputRadeo type='radio' id='36' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='shop' />
  <Label htmlFor='36'>SHOP</Label>
  <InputRadeo type='radio' id='37' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='warehouse' />
  <Label htmlFor='37'>WAREHOUSE</Label>
  <InputRadeo type='radio' id='38' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='industrial' />
  <Label htmlFor='38'>INDUSTRIAL</Label>
  <InputRadeo type='radio' id='39' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='retail' />
  <Label htmlFor='39'>RETAIL</Label>
  <InputRadeo type='radio' id='40' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='land' />
  <Label htmlFor='40'>LAND</Label>
  <InputRadeo type='radio' id='41' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='others' />
  <Label htmlFor='41'>OTHERS</Label>
  </ResidentContainer>
  )}
  </Grid>
  <Grid item lg={2.4} md={2.4} sm={2.4} xs={12}>
 <SelectPropertyTypeContainer>
  <SelectPropertyType type='radio' id='off' {...register('propertyGroup',{required: 'Property category is required....'})} name='propertyGroup'   value='offplan'  />
  <SelectLabel htmlFor='off' onClick={(e) => handleSelect5(select5)}>Offplan</SelectLabel>
 </SelectPropertyTypeContainer>
 { select5 && (
  <ResidentContainer>
  <InputRadeo type='radio' id='42' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType'  value='apartment' />
  <Label htmlFor='42'>APARTMENT</Label>
  <InputRadeo type='radio' id='43' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType'  value='flat' />
  <Label htmlFor='43'>FLAT</Label>
  <InputRadeo type='radio' id='44' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='studio' />
  <Label htmlFor='44'>STUDIO</Label>
  <InputRadeo type='radio' id='45'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='terraced' />
  <Label htmlFor='45'>TERRACED</Label>
  <InputRadeo type='radio' id='46'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='full floor' />
  <Label htmlFor='46'>FULL FLOOR</Label>
  <InputRadeo type='radio' id='47'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='whole building' />
  <Label htmlFor='47'>WHOLE BUILDING</Label>
  <InputRadeo type='radio' id='48'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='hotel appartment' />
  <Label htmlFor='48'>HOTEL APARTMENT</Label>
  <InputRadeo type='radio' id='49'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='bungalow' />
  <Label htmlFor='49'>BUNGALOW</Label>
  <InputRadeo type='radio' id='50'  {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='room' />
  <Label htmlFor='50'>ROOM</Label>
  <InputRadeo type='radio' id='51' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='mini flat' />
  <Label htmlFor='51'>MINI FLAT</Label>
  <InputRadeo type='radio' id='52' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='self contain' />
  <Label htmlFor='52'>SELF CONTAIN</Label>
  <InputRadeo type='radio' id='53' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='detached' />
  <Label htmlFor='53'>DETACHED</Label>
  <InputRadeo type='radio' id='54' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='semi detached' /> 
  <Label htmlFor='54'>SEMI DETACHED</Label>
  <InputRadeo type='radio' id='55' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType'value='office' />
  <Label htmlFor='55'>OFFICE</Label>
  <InputRadeo type='radio' id='56' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='shop' />
  <Label htmlFor='56'>SHOP</Label>
  <InputRadeo type='radio' id='57' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='warehouse' />
  <Label htmlFor='57'>WAREHOUSE</Label>
  <InputRadeo type='radio' id='58' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='industrial' />
  <Label htmlFor='58'>INDUSTRIAL</Label>
  <InputRadeo type='radio' id='59' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='retail' />
  <Label htmlFor='59'>RETAIL</Label>
  <InputRadeo type='radio' id='60' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='land' />
  <Label htmlFor='60'>LAND</Label>
  <InputRadeo type='radio' id='61' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='others' />
  <Label htmlFor='61'>OTHERS</Label>
  </ResidentContainer>
  )}
  </Grid>

  <Grid item lg={2.4} md={2.4} sm={2.4} xs={12}>
  <SelectPropertyTypeContainer>
  <SelectPropertyType type='radio' id='lan'  {...register('propertyGroup',{required: 'Property category is required....'})} name='propertyGroup' value='land' />
  <SelectLabel htmlFor='lan' onClick={(e) => handleSelect3(select3)}>Land</SelectLabel>
 </SelectPropertyTypeContainer>
  {select3 && (
    <ComLandContainer>
  <InputRadeo type='radio' id='19' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='land' />
  <Label htmlFor='19'>LAND</Label>
  <InputRadeo type='radio' id='20' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='farm' />
  <Label htmlFor='20'>FARM</Label>
  <InputRadeo type='radio' id='21' {...register('propertyType',{required: 'Property type is required....'})} name='propertyType' value='others' />
  <Label htmlFor='21'>OTHERS</Label>
  </ComLandContainer>
  )}
  </Grid>
  {errors.propertyGroup  || errors.propertyType ? <ErrMessage>{'Please select both property category and property type'}</ErrMessage> : ''}
   <ToastContainer />
 <ButtonContainer>
 <CloseButton onClick={() => navigate('/agentproperties')} type='button'>Close</CloseButton>
 <NextButton type='submit'>Continue</NextButton>
 </ButtonContainer>
  </Grid>
  </Form> 
  </FormContainer>
  </Grid>
  </Grid>
 </StyledContainer>
</StyledBox>
</div>
  )
  }

export default PropertyType


