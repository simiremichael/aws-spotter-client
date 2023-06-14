import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { CircularProgress, Theme, useTheme } from '@mui/material';
import { useAddPropertyMutation } from '../../services/api/propertyAPI'

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
 const InnerContainer = styled.div`
 `
 const parkings = [
  'Garage',
 'Indoor parking',
 'On-street-parking',
'Off-street-parking',
  'Parking lot',
  'Attached garage',
'Detached garage',
 'Valet parking',
  'Carport'
];
const securities = [
 'Alarm',
'Concierge',
'Video surveillance',
];
const comforts = [
  'Fitness room',
  'Furnished',
  'Unfurnished',
  'Partly furnished',
  'Home automation',
  'Home cinema',
  'Suna',
  'Walk-in-closet',
  'Waterfront',
  'Spa',
  'Gym'
];
const hvacs = [
  'Air conditioning',
  'Centra heating',
  'Floor heating',
  'Geothermal heating',
  'Aerothermal heating',
  'Gas heating',
  'Electricity heating',
]


function getStyles(name: string, parkings: readonly string[], theme: Theme) {
  return {
    fontWeight:
      parkings.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function getSecurityStyles(name: string, securities: readonly string[], theme: Theme) {
  return {
    fontWeight:
      securities.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getComfortStyles(name: string, comforts: readonly string[], theme: Theme) {
  return {
    fontWeight:
      comforts.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function getHvacStyles(name: string, hvacs: readonly string[], theme: Theme) {
  return {
    fontWeight:
      hvacs.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

 const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function Features(props: { updateProperty: any, property: any, resetProperty: any, setProperty: any}) {

  const [addProperty, {isSuccess, isLoading}] = useAddPropertyMutation();
  const theme = useTheme();
  const property = props.property;
  const setProperty = props.setProperty;
  const { register } = useForm({
    defaultValues: {
      condition: property.condition,
      pets: property.pets,
      parking: property.parking,
      hvac: property.hvac,
      comfort: property.comfort,
      security: property.security,
    }});
 let navigate = useNavigate();
const reset = props.resetProperty;
 
 const handleFormSubmit = async (e: any) => {
  e.preventDefault()
 
  try {
    await addProperty({...property}).unwrap();
    console.log('fulfilled')
    props.updateProperty({...property});
  } catch (error) {
    console.error('rejected', error);
  }
};
         
useEffect(() => {
  if(isSuccess) { 
   navigate('/agentproperties')
 reset();
 toast.success('Submited successfully....')
  }
}, [isSuccess]);
const handleBackButton = () => {
  navigate('agentproperties/utilities')
}

const [parking, setParking] = useState<string[]>([]);
//SelectChangeEvent<typeof parking>
  const handleChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setParking(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setProperty({...property, parking: e.target.value})
    
  };
  const [security, setSecurity] = useState<string[]>([]);
// SelectChangeEvent<typeof security>
  const handleSecurityChange = (e: any ) => {
    const {
      target: { value },
    } = e;
    setSecurity(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setProperty({...property, security: e.target.value})
  };

  const [comfort, setComfort] = useState<string[]>([]);

  const handleComfortChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setComfort(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setProperty({...property, comfort: e.target.value})
  };

  const [hvac, setHvac] = useState<string[]>([]);

  const handleHvacChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setHvac(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setProperty({...property, hvac: e.target.value})
  };


  return (
    <StyledBox >
   <StyledContainer >
   <FormTitle>FEATURE</FormTitle>
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
       <Items><PropertyTypeLink to=''>Utilities</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''><strong>Features</strong></PropertyTypeLink></Items>
     </ItmesContainer>
    </Grid>
    <Grid item lg={9} md={9} sm={12} xs={12}>
    <FormContainer>
    <FormTitle>Feature</FormTitle>
    <Form  onSubmit={handleFormSubmit}>
    <InnerContainer>
     <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <FormControl fullWidth sx={{ textAlign: 'start', marginTop: 5}}>
        <InputLabel id="demo-simple-select-label">Condition</InputLabel>
       <Select 
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label='condition'
     {...register('condition')} 
     name='condition'
     size='small'
     value={property.condition}
     onChange={(e: any) => {setProperty({...property, condition: e.target.value})}}
     >
      <MenuItem  value='new'>New</MenuItem>
      <MenuItem  value='mint'>Mint</MenuItem>
      <MenuItem  value='good'>Good</MenuItem>
      <MenuItem  value='fair'>Fair</MenuItem>
      <MenuItem  value='poor'>Poor</MenuItem>
     </Select>
     </FormControl>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>

      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Parking</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          size='small'
          value={property.parking}
          {...register('parking')} 
          name='parking'
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Parking" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {parkings.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, parking, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <FormControl sx={{  width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Comfort</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          size='small'
          value={property.comfort}
          {...register('comfort')} 
          name='comfort'
          onChange={handleComfortChange}
          input={<OutlinedInput id="select-multiple-chip" label="Comfort" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {comforts.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getComfortStyles(name, comfort, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}> 
        <FormControl sx={{  width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">HVAC</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          size='small'
          value={property.hvac}
          {...register('hvac')} 
          name='hvac'
          onChange={handleHvacChange}
          input={<OutlinedInput id="select-multiple-chip" label="Hvac" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {hvacs.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getHvacStyles(name, hvac, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Security</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          size='small'
          value={property.security}
          {...register('security')} 
          name='security'
          onChange={handleSecurityChange}
          input={<OutlinedInput id="select-multiple-chip" label="Security" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {securities.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getSecurityStyles(name, security, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <FormControl fullWidth sx={{ textAlign: 'start'}}>
        <InputLabel id="demo-simple-select-label">Pets</InputLabel>
        <Select 
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label='Pet'
     {...register('pets')} 
     name='pets'
     size='small'
     value={property.pets}
     onChange={(e: any) => {setProperty({...property, pets:e.target.value})}}
     >
      <MenuItem  value='pets allowed'>Pets allowed</MenuItem>
      <MenuItem  value='no pets allowed'>No pets allowed</MenuItem>
      <MenuItem  value='cats allowed'>Cats allowed</MenuItem>
      <MenuItem  value='dogs allowed'>Dogs allowed</MenuItem>
     </Select>
     </FormControl>
        </Grid>
        </Grid>
     </InnerContainer>
     {/* {error || errors || errors ? <ErrMessage>{'all field required'}</ErrMessage> : ''} */}
     <ToastContainer />
   <ButtonContainer>
   <CloseButton type='button' onClick={handleBackButton}>Back</CloseButton>
   <NextButton type='submit'>{ isLoading ? <CircularProgress  size={12} color='inherit' /> : 'Submit'}</NextButton>
   </ButtonContainer>
    </Form> 
    </FormContainer>
    </Grid>
    </Grid>
   </StyledContainer>
  </StyledBox>
  )
}

export default Features


