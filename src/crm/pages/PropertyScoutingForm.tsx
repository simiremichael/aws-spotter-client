import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextareaAutosize, TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useScoutingApplicationMutation } from '../../services/api/propertyAPI';

const StyledBox = styled(Box)`
margin-top: 40px;
`
const StyledContainer = styled(Container)`
`
const Title = styled.h1`
margin-bottom: 40px;
`
const SendBtn = styled.button`
margin-top: 20px;
width: 100%;
height: 40px;
font-side: 600;
background-color: #008080;
border: none;
outline: none;
border-radius: 5px;
color: #fff;
cursor: pointer;
`
const BackContainer = styled.div`
display: flex;
justify-content: start;
`
const BackSvg = styled.svg`
width: 40px;
height: 40px;
cursor: pointer;
`

const Form = styled.form`

`

function PropertyScoutingForm() {

  const initialData = {name: '', email: '', phone: '', location: '', propertyType: '', category: '', budget: '',  description: ''}

  const [formData, setFormData] = useState(initialData)

  const [scoutingApplication, {isSuccess}] = useScoutingApplicationMutation()

  const handleChange = (e: any) => {
  const name = e.target.name
  const value = e.target.value
  setFormData({...formData, [name]: value})
  }

  let navigate = useNavigate();
  const handleBack = () => {
    navigate('/propertyScouting');
   }

   const handleSubmit = async (e: any) => {
    e.preventDefault();
   await scoutingApplication(formData).unwrap().then((payload: any) => console.log('fulfilled', payload)).catch((error: any) => console.error('rejected', error));
   }

   useEffect(() => {
    if (isSuccess){
      navigate('/propertyScouting');
    }
   },[isSuccess, navigate])

  return (
    <StyledBox>
      <StyledContainer>
        <BackContainer><BackSvg onClick={handleBack} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z"/></BackSvg></BackContainer>
      <Title>Scouting form</Title>
      <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={4} xs={12}>
        <TextField  id="outlined-basic" label="Name" name='name' value={formData.name} onChange={handleChange}  variant='outlined' type='text' size='small' fullWidth />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
        <TextField id="outlined-basic" label="Email" name='email' value={formData.email} onChange={handleChange}  variant='outlined' type='test' size='small' fullWidth  />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
        <TextField id="outlined-basic" label="Phone" name='phone' value={formData.phone} onChange={handleChange} variant='outlined' type='number' size='small' fullWidth />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
        <TextField id="outlined-basic" label="Property location" name='location' value={formData.location} onChange={handleChange}  variant='outlined' type='text' size='small' fullWidth  />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
        <FormControl fullWidth size='small'>
  <InputLabel id="demo-simple-select-label">Property category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    name='category' value={formData.category} onChange={handleChange} 
  >
    <MenuItem value='rent'>Rent</MenuItem>
    <MenuItem value='sale'>Buy</MenuItem>
  </Select>
</FormControl>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
        <TextField id="outlined-basic" label="Property type" name='propertyType' value={formData.propertyType} onChange={handleChange}  variant='outlined' type='test' size='small' fullWidth  />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
        <TextField id="outlined-basic" label="Budget" name='budget' value={formData.budget} onChange={handleChange} variant='outlined' type='number' size='small' fullWidth />
        </Grid>
        <Grid item lg={8} md={8} sm={8} xs={12}>
        <TextareaAutosize
         name='description' 
         value={formData.description} 
         onChange={handleChange}
         aria-label="minimum height"
         minRows={3}
         placeholder="Property description"
         style={{ width: '98.6%' }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={2} md={2} sm={2} xs={12}>
        <SendBtn type='submit'>Send</SendBtn>
        </Grid>
      </Grid>
      </Form>
      </StyledContainer>
    </StyledBox>
  )
}

export default PropertyScoutingForm