import React, {useState} from 'react'
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

const StyledBox = styled(Box)`
padding: 15px 0;
border-top: 1px solid #494949;
border-bottom: 1px solid #494949;
width: 100%;
`
const StyledContainer = styled(Container)`
display: flex;
align-items: center;
justify-content: start;
flex-wrap: wrap;
`
const StyledButton = styled(Button)`
height: 38px;
background-color: #008080;
:hover{
  background-color: #008080;
}
`


function Search() {

  const [buyrent, setBuyrent] = useState('');
  const [property, setProperty] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setBuyrent(event.target.value as string);
  };
  const handleProperty = (event: SelectChangeEvent) => {
    setProperty(event.target.value as string);
  };
  const handleBeds = (event: SelectChangeEvent) => {
    setBeds(event.target.value as string);
  };
  const handleBaths = (event: SelectChangeEvent) => {
    setBaths(event.target.value as string);
  };
  const handleMinPrice = (event: SelectChangeEvent) => {
    setMinPrice(event.target.value as string);
  };
  const handleMaxPrice = (event: SelectChangeEvent) => {
    setMaxPrice(event.target.value as string);
  };

  return (
    <StyledBox component="form">
    <StyledContainer>
    <FormControl sx={{ m: 1, width: 300 }} >
    <TextField  id="City" size="small" label="City, community or building" variant="outlined"  />
    </FormControl>
    <FormControl sx={{m: 1,  width: 105, }} size="small">
    <InputLabel id="demo-simple-select-label">Buy/Rent</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={buyrent}
          label='Buy/Rent'
          onChange={handleChange}
        >
          <MenuItem value='buy'>Buy</MenuItem>
          <MenuItem value='rent'>Rent</MenuItem>
          <MenuItem value='commercial-buy'>Commercial buy</MenuItem>
          <MenuItem value='commercial-rent'>Commercial rent</MenuItem>
        </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 135 }} size="small">
    <InputLabel id="demo-simple-select-autowidth-label">Property type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={property}
          label='Property type'
          // autoWidth
          onChange={handleProperty}
        >
          <MenuItem value='Appartment'>Apartmet</MenuItem>
          <MenuItem value='office'>office</MenuItem>
          <MenuItem value='flat'>Flat</MenuItem>
          <MenuItem value='terraced'>Terraced</MenuItem>
          <MenuItem value='duplex'>Duplex</MenuItem>
          <MenuItem value='full-floor'>Full Floor</MenuItem>
          <MenuItem value='whole-building'>Whole Building</MenuItem>
          <MenuItem value='land'>Land</MenuItem>
          <MenuItem value='Bungalow'>Bungolow</MenuItem>
          <MenuItem value='hotel-apartment'>Hotel Apartment</MenuItem>
          <MenuItem value='room'>Room</MenuItem>
          <MenuItem value='shop'>Shop</MenuItem>
          <MenuItem value='werehouse'>WareHouse</MenuItem>
          <MenuItem value='mini-flat'>Mini Flat</MenuItem>
          <MenuItem value='self-contain'>Self Contain</MenuItem>
        </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 80 }} size="small">
    <InputLabel id="demo-simple-select-autowidth-label">Beds</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={beds}
          label='Beds'
          // autoWidth
          onChange={handleBeds}
        >
          <MenuItem value='1'>1</MenuItem>
          <MenuItem value='2'>2</MenuItem>
          <MenuItem value='3'>3</MenuItem>
          <MenuItem value='4'>4</MenuItem>
          <MenuItem value='5'>5</MenuItem>
          <MenuItem value='6'>6</MenuItem>
          <MenuItem value='7+'>7+</MenuItem>
        </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 80 }} size="small">
    <InputLabel id="demo-simple-select-autowidth-label">Baths</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={baths}
          label='Baths'
          // autoWidth
          onChange={handleBaths}
        >
          <MenuItem value='1'>1</MenuItem>
          <MenuItem value='2'>2</MenuItem>
          <MenuItem value='3'>3</MenuItem>
          <MenuItem value='4'>4</MenuItem>
          <MenuItem value='5'>5</MenuItem>
          <MenuItem value='6'>6</MenuItem>
          <MenuItem value='7+'>7+</MenuItem>
        </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 120 }} size="small">
    <InputLabel id="demo-simple-select-autowidth-label">Min-price</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={minPrice}
          label='min-price'
          // autoWidth
          onChange={handleMinPrice}
        >
          <MenuItem value='5,000'>₦5,000</MenuItem>
          <MenuItem value='10,000'>₦10,000</MenuItem>
          <MenuItem value='15,000'>₦15,000</MenuItem>
          <MenuItem value='20,000'>₦20,000</MenuItem>
          <MenuItem value='50,000'>₦50,000</MenuItem>
          <MenuItem value='100,000'>₦100,000</MenuItem>
          <MenuItem value='200,000'>₦200,000</MenuItem>
          <MenuItem value='300,000'>₦300,000</MenuItem>
          <MenuItem value='500,000'>₦500,000</MenuItem>
          <MenuItem value='700,000'>₦700,000</MenuItem>
          <MenuItem value='850,000'>₦850,000</MenuItem>
          <MenuItem value='1,000,000'>₦1,000,000</MenuItem>
          <MenuItem value='1,500,000'>₦1,500,000</MenuItem>
          <MenuItem value='2,000,00'>₦2,000,00</MenuItem>
          <MenuItem value='5,000,000'>₦5,000,000</MenuItem>
          <MenuItem value='10,000,000'>₦10,000,000</MenuItem>
          <MenuItem value='15,000,000'>₦15,000,000</MenuItem>
          <MenuItem value='25,000,000'>₦25,000,000</MenuItem>
          <MenuItem value='50,000,000'>₦50,000,000</MenuItem>
          <MenuItem value='100,000,000'>₦100,000,000</MenuItem>
          <MenuItem value='300,000,000'>₦300,000,000</MenuItem>
          <MenuItem value='500,000,000'>₦500,000,000</MenuItem>
          <MenuItem value='1,000,000,000'>₦1,000,000,000</MenuItem>
          <MenuItem value='1,500,000,000'>₦1,500,000,000</MenuItem>
          <MenuItem value='2,500,000,000'>₦2,500,000,000</MenuItem>
          <MenuItem value='3,000,000,000'>₦3,000,000,000</MenuItem>
          <MenuItem value='5,000,000,000'>₦5,000,000,000</MenuItem>
        </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 120 }} size="small">
    <InputLabel id="demo-simple-select-autowidth-label">Max-price</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={maxPrice}
          label='max-price'
          // autoWidth
          onChange={handleMaxPrice}
        >
          <MenuItem value='5,000'>₦5,000</MenuItem>
          <MenuItem value='10,000'>₦10,000</MenuItem>
          <MenuItem value='15,000'>₦15,000</MenuItem>
          <MenuItem value='20,000'>₦20,000</MenuItem>
          <MenuItem value='50,000'>₦50,000</MenuItem>
          <MenuItem value='100,000'>₦100,000</MenuItem>
          <MenuItem value='200,000'>₦200,000</MenuItem>
          <MenuItem value='300,000'>₦300,000</MenuItem>
          <MenuItem value='500,000'>₦500,000</MenuItem>
          <MenuItem value='700,000'>₦700,000</MenuItem>
          <MenuItem value='850,000'>₦850,000</MenuItem>
          <MenuItem value='1,000,000'>₦1,000,000</MenuItem>
          <MenuItem value='1,500,000'>₦1,500,000</MenuItem>
          <MenuItem value='2,000,00'>₦2,000,00</MenuItem>
          <MenuItem value='5,000,000'>₦5,000,000</MenuItem>
          <MenuItem value='10,000,000'>₦10,000,000</MenuItem>
          <MenuItem value='15,000,000'>₦15,000,000</MenuItem>
          <MenuItem value='25,000,000'>₦25,000,000</MenuItem>
          <MenuItem value='50,000,000'>₦50,000,000</MenuItem>
          <MenuItem value='100,000,000'>₦100,000,000</MenuItem>
          <MenuItem value='300,000,000'>₦300,000,000</MenuItem>
          <MenuItem value='500,000,000'>₦500,000,000</MenuItem>
          <MenuItem value='1,000,000,000'>₦1,000,000,000</MenuItem>
          <MenuItem value='1,500,000,000'>₦1,500,000,000</MenuItem>
          <MenuItem value='2,500,000,000'>₦2,500,000,000</MenuItem>
          <MenuItem value='3,000,000,000'>₦3,000,000,000</MenuItem>
          <MenuItem value='5,000,000,000'>₦5,000,000,000</MenuItem>
        </Select>
        </FormControl>

        <StyledButton type='submit' variant="contained"><strong>Find</strong></StyledButton>
    </StyledContainer>
    </StyledBox>
  )
}

export default Search