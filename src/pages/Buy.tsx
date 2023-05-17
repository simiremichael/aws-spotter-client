import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Link, Paper, Skeleton } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDeletePropertyMutation, useGetSavedPropertiesQuery, useSavePropertyMutation, useSearchPropertiesByBuyQuery } from '../services/api/propertyAPI';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Grid, Tooltip } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useAppDispatch, useAppSelector  } from '../app/hooks';
import { selectCurrentBuyProperty, setBuyProperty } from '../services/features/buyPropertySlice';
import BuyPaginate from '../components/BuyPagination';
import useDebounce from '../debounce/useDebounce';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { selectCurrentUser } from '../services/features/userSlice';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';


const StyledBox = styled(Box)`

`
const StyledContainer = styled(Container)`
margin-top: 15px;
margin-bottom: 15px;
`
const TopContainer = styled.div`

`

const SearchStyledBox = styled(Box)`
padding: 15px 0;
border-top: 1px solid #494949;
border-bottom: 1px solid #494949;
width: 100%;
`
const SearchStyledContainer = styled(Container)`
display: flex;
align-items: center;
justify-content: start;
flex-wrap: wrap;
`
const Title = styled.h3`
text-align: start;
color: #383838;
`

const SalesContainer = styled.div`
display: flex;
`
const  SalesResult = styled.p`
text-align: start;
margin-right: 20px;
font-size: 13px;
`
const NewSales = styled.p`
text-align: start;
padding:1px 10px 2.2px 8px;
background-color: #008080;
color: #ffffff;
border-radius: 25px;
font-size: 13px;
`
const SortContainer = styled(Container)`
display:flex;
justify-content: space-between;
align-items: center;
`
const LeftContainer = styled.div`
display: flex;
`
const MapContainer = styled.div`
align-items: center;
display: flex;
border: 1px solid  #A9A9A9;
height: 38px;
margin-left: -20px;
margin-right: 16px;
padding: 0 8px;
border-radius: 5px;
cursor: pointer;
:hover{
  background-color: #F5F5F5;
}
@media only screen and (max-width: 760px) {
margin-left: -10px;
margin-right: 5px;
}
`
const Svg = styled.svg`
width: 12px;
margin-right: 5px;
fill: gray;
`
const Map = styled.p`
display: flex;
font-size: 0.8rem;
@media screen and (max-width: 600px) {
  font-size: 0.7rem;
}
`
const SaveContainer = styled.div`
align-items: center;
display: flex;
border: 1px solid #A9A9A9;
height: 38px;
padding: 0 8px;
border-radius: 5px;
cursor: pointer;
:hover{
  background-color: #F5F5F5;
}
`
const Save = styled.p`
display: flex;
align-self: center;
font-size: 0.8rem;
@media screen and (max-width: 600px) {
  font-size: 0.7rem;
}
`
const  RightContainer = styled.div`
display: flex;
align-items: center;
`
const Sort = styled.p`
text-align: start;
font-size: 0.8rem;
@media screen and (max-width: 600px) {
  font-size: 0.7rem;
}
`
const StyledButton = styled(Button)`
height: 54px;
width: 100%;
background-color: #008080;
:hover{
  background-color: #008080;
}
`
const Form = styled.form`

`
const Bed = styled.p`
display: flex;
text-align: start;
margin-right: 10px;
color: #494949;
@media screen and (max-width: 600px) {
  font-size: 0.8rem;
}
`
const Bath = styled.p`
display: flex;
text-align: start;
margin-right: 10px;
color: #494949;
@media screen and (max-width: 600px) {
  font-size: 0.8rem;
}
`
const Area = styled.p`
text-align: start;
margin-right: 10px;
color: #494949;
@media screen and (max-width: 600px) {
  font-size: 0.8rem;
}
`
const BedBathSvg = styled.svg`
width: 15px;
margin-right: 5px;
fill: #494949;
`
const DetailContainer = styled.div`
display: flex;
align-items: center;
`
const Detail = styled.p`
text-align: start;
margin-top: 0;
font-size: 14px;
color: #494949;
`
const Svgs = styled.svg`
width: 15px;
fill: #4169E1;
margin-right: 7px;
`
const   CallContainer = styled.div`
display: flex;
align-items: center;
padding: 0 8px;
border: 1.5px solid #e3e3e3;
height: 30px;
font-size: 15px;
margin-left: 5px;
margin-right: 5px;
border-radius: 3px;
cursor: pointer;
:hover{
  background: #F5F5F5;
}

`
const BottomContainer = styled.div`
display: flex;
margin: -55px 0 0 25%;
flex-wrap:wrap;
z-index: 1001;  
@media screen and (max-width: 599.9px) {
  display: none;
}
@media screen and (max-width: 900px) {
  margin: -55px 0 0 35%;
}
`
const BottomContainer1 = styled.div`
display: flex;
margin: -40px 0 0 2%;
flex-wrap: wrap;
z-index: 1001;
@media screen and (min-width: 600px) {
  display: none;
}
`
const Call = styled.p`
text-align: center;
color: #494949;
`

const Img = styled.img`
height: 200px;
width: 100%;
`
const LeftContainers = styled.div`
padding-left: 15px;
`
const Price = styled.h4`
text-align: start;
margin-top: 5px;
`
const Para = styled.p`
text-align: start;
margin-top: -18px;
font-size: 15px;
color: #494949;
`
const BedBathContainer = styled.div`
display: flex;
margin-top: -26px;
font-size: 15px;
margin-right: 10px;
`
const Apart = styled.p`
text-align: start;
font-size: 15px;
margin-right: 10px;
color: #494949;
`

const StyledGrid = styled(Grid)`
margin: 15px 0;
`
const StyledContainers = styled.div`
margin: 10px 0;
`
const CardImg = styled(Grid)`

`
const CardDetails = styled(Grid)`
display: flex;     
justify-content: space-between;
border: 0.2px solid  #e3e3e3;
:hover{
  background: #F5F5F5;
}
cursor: pointer;
@media screen and (max-width: 900px) {
  padding: 0 0 55px 0;
}
`
const EmailContainer = styled.div`
border: 1.5px solid #e3e3e3;
display: flex;
align-items: center;
padding: 0 8px;
height: 30px;
font-size: 15px;
margin-right: 5px;
border-radius: 3px;
cursor: pointer;
:hover{
  background: #F5F5F5;
}
z-index: 1;
`
const Email = styled.p`
text-align: start;
color: #494949;
`
const WhatsAppContainer = styled.div`
border: 1.5px solid #e3e3e3;
height: 30px;
font-size: 15px;
display: flex;
align-items: center;
padding: 0 8px;
margin-right: 5px;
border-radius: 3px;
cursor: pointer;
:hover{
  background: #F5F5F5;
}
z-index: 1;
`
const WhatsApp = styled.p`
text-align: start;
color: #494949;
`
const RightContainers = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
align-items: end;
`
const  LogoImg = styled.img`
width: 5rem;
margin: -10px 5px 0 0;
@media screen and (max-width: 600px) {
  width: 2rem;
}
`
const LocateSvg = styled.svg`
width: 10px;
margin: -12px 7px 0 0;
fill: #494949;
`
const VideoContainer = styled.div`
z-index: 1001;
height:30px;
width: 30px;
display: flex;
background-color: #000000;
justify-content: center;
opacity: 0.7;
margin-top: -30px;
align-items: center;
cursor: pointer;
position: absolute;
`
const Video = styled.svg`
width: 15px;
z-index: 1;
fill: rgba(555 555 555 );
`
const Premium = styled.h6`
color: #B8860B;
margin: 5px 5px 15px 0;
`
const ImgContainer = styled.div`
z-index: 1001;
height:30px;
width: 30px;
display: flex;
background-color: #000000;
justify-content: center;
opacity: 0.7;
margin-left: 40px;
margin-top: -30px;
align-items: center;
cursor: pointer;
position: absolute;
`
const WebImg = styled.img`
width: 28px;
z-index: 1;
`
const Featured = styled.h6`
color: #4169E1;
margin: 10px 5px 0 0;
`
const VerifyContainer = styled.div`
z-index: 1001;
position: absolute;
display: flex;
height: 20px;
background-color: #2E8B57;
width: 70px;
margin-top: -190px;
border-radius: 2px;
justify-content: center;
align-items: center;
`
const VerifySvg = styled.svg`
width: 12px;
fill: #ffffff;
margin-right: 5px;
`
const Verify = styled.p`
color: #ffffff;
z-index: 1001;
position: relative;
font-size: 0.7rem;
`
const Links = styled(Link)`
text-decoration: none;
`
const StyledLink = styled(Link)`
 text-decoration: none;
  color: #494949;
  width: 100%;
  height: 100%;
 `
 const SkeletonSeperator = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 `

 const SaveBtnContainer = styled.div`
position: absolute;
z-index: 1000;
margin-top: 16%;
 `
 const SaveBtn = styled.button`
 outline: none;
 border: none;
 background: none;
 `

function Buy() {

  const [saved, setSaved] = useState(false);
   let [searchParams, setSearchParams] = useSearchParams();
   const searchQuery = searchParams.get('search');
   const categoryQuery = searchParams.get('category');
   const typeQuery = searchParams.get('type');
   const bedQuery = searchParams.get('bed');
   const bathQuery = searchParams.get('bath');
   const minPriceQuery = searchParams.get('minPrice');
   const maxPriceQuery = searchParams.get('maxPrice');
  const navigate = useNavigate()

  const initialize = {search: '' , category: 'sale', type: '', bed: '', bath: '', minPrice: '', maxPrice: '', sort: ''}
const [searchData, setSearchData] = useState(initialize)

const debounceSearch = searchData.search

const debounce = useDebounce(debounceSearch, 800);
const search = searchQuery !== null ? searchQuery : debounce 
const category = searchData.category
const type = typeQuery !== null ? typeQuery : searchData.type
const bed = bedQuery !== null ? bedQuery : searchData.bed
const bath = bathQuery !== null ? bathQuery : searchData.bath 
const minPrice = minPriceQuery !== null ? minPriceQuery : searchData.minPrice
const maxPrice = maxPriceQuery !== null ? maxPriceQuery : searchData.maxPrice
const sort = searchData.sort

const page = searchParams.get('page') || 1;

 const {data, isFetching} = useSearchPropertiesByBuyQuery({ search, category, sort, bed,bath, minPrice, maxPrice, type, page}, {refetchOnMountOrArgChange: true });
 //search, category, sort, bed,bath, minPrice, maxPrice, type, page;

  const handleChange = (e: any) => {
  const name = e.target.name;
  const value = e.target.value;
  setSearchData( values => ({...values, [name]: value}));
  // setSearchParams({...searchData, buy: e.target.value});
  };
  const dispatch = useAppDispatch();
  const handleSearch = () => {
    //  setSearchParams({...searchData})
       navigate(`/buy?search=${search || 'none'}&category=${category}&type=${type}&bath=${bath}&bed=${bed}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`)
  }

useEffect(() => {
  if(data) {
    dispatch(setBuyProperty({buyProperty: data }));
 }
 }, [dispatch, data]);
 const {buyProperty} = useAppSelector(selectCurrentBuyProperty);

 const [saveProperty, {isSuccess, error: saveErrorData}] = useSavePropertyMutation()

 const [deleteSaveProperty, {isSuccess: savePropertyDeleteSuccess, error: deleteEroor}] = useDeletePropertyMutation()

 const {user} = useAppSelector(selectCurrentUser);
 {/* @ts-ignore:next-line */}
 const saveBy = user?.result._id


 
 const {data: savePropertyData} = useGetSavedPropertiesQuery(saveBy)

 const [savedProperties, setSavedProperties] = useState([]);

//  useEffect(() => {
//    const savedProps = JSON.parse(localStorage.getItem("savedProperties")) || [];
//    setSavedProperties(savedProps);
//    setSaved(savedProps.some((prop: any) => prop._id));
//  }, [savedProperties])

//  const handleSaveProperty = (result: any) => {
//    {/* @ts-ignore:next-line */}
//   const savedProps = JSON.parse(localStorage.getItem("savedProperties")) || [];
//   const existingSavedProperties = savedProps.filter((prop: any) => {return prop}).map((prop: any) => prop._id === result._id);
//   if (existingSavedProperties){
//   const newSavedProperties = [...savedProperties, result];
//     localStorage.setItem("savedProperties", JSON.stringify(newSavedProperties));
//      {/* @ts-ignore:next-line */}
//     setSavedProperties(newSavedProperties);
//     setSaved(true);
//   }
//  };

//  const handleDeleteSaveProperty = (result: any) => {
//    {/* @ts-ignore:next-line */}
//   const savedProps = JSON.parse(localStorage.getItem("savedProperties")) || [];
//   const newSavedProperties = savedProps.filter((prop: any) => prop._id === result._id);
//   localStorage.removeItem("savedProperties");
//   setSavedProperties(newSavedProperties);
//   setSaved(false);
//   // JSON.stringify(newSavedProperties)
//   };

//    {/* @ts-ignore:next-line */}
//   const savedProps = JSON.parse(localStorage.getItem("savedProperties")) || [];
//   const isSaved  = savedProps.findIndex((prop: any) => prop);
//   console.log(isSaved)

  return (
    <>
        <NavBar />
        <Form> 
        <SearchStyledBox>
        <SearchStyledContainer>
        <Grid container spacing={1}>
        <Grid item lg={5} md={7} sm={9} xs={12}>
    <FormControl  sx={{ width: '100%'}}>
    <TextField  id="City" size="medium" label="Location, Estate or Building" variant="outlined" name='search' value={searchData.search} onChange={handleChange} />
    </FormControl>
    </Grid>
    <Grid item lg={1.2} md={2.5} sm={3} xs={6}>
    <FormControl sx={{width: '100%'}} size="medium">
    <InputLabel id="demo-simple-select-label">Buy/Rent</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name='category'
          value={searchData.category}
          autoWidth
          label='Buy/Rent'
          onChange={handleChange}
        >
          <MenuItem value='sale'>Buy</MenuItem>
          <MenuItem value='rent'>Rent</MenuItem>
          {/* <MenuItem value='commercial-buy'>Commercial buy</MenuItem> */}
          {/* <MenuItem value='commercial-rent'>Commercial rent</MenuItem> */}
        </Select>
        </FormControl>
        </Grid>
        <Grid item lg={1.2} md={2.5} sm={4} xs={6}>
         <FormControl sx={{width: '100%'}} size="medium">
        <InputLabel id="demo-simple-select-autowidth-label">Project type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name='type'
          value={searchData.type}
          label='Property type'
          autoWidth
          onChange={handleChange}
        >
          <MenuItem value='apartment'>Apartment</MenuItem>
          <MenuItem value='office'>office</MenuItem>
          <MenuItem value='flat'>Flat</MenuItem>
          <MenuItem value='terraced'>Terraced</MenuItem>
          <MenuItem value='duplex'>Duplex</MenuItem>
          <MenuItem value='land'>Land</MenuItem>
          <MenuItem value='bungalow'>Bungolow</MenuItem>
          <MenuItem value='hotel-apartment'>Hotel Apartment</MenuItem>
          <MenuItem value='room'>Room</MenuItem>
          <MenuItem value='shop'>Shop</MenuItem>
          <MenuItem value='werehouse'>WareHouse</MenuItem>
          <MenuItem value='mini-flat'>Mini Flat</MenuItem>
          <MenuItem value='self-contain'>Self Contain</MenuItem>
          <MenuItem value='detached'>Detached</MenuItem>
          <MenuItem value='semi detached'>Semi-detached</MenuItem>
          <MenuItem value='full-floor'>Full floor</MenuItem>
          <MenuItem value='industrial'>Industrial</MenuItem>
          <MenuItem value='retail'>Retail</MenuItem>
          <MenuItem value='whole building'>Whole Building</MenuItem>
        </Select>
        </FormControl>
        </Grid>
        <Grid item lg={0.93} md={2} sm={4} xs={6}>
         <FormControl sx={{width: '100%'}} size="medium">
        <InputLabel id="demo-simple-select-autowidth-label">Beds</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name='bed'
          value={searchData.bed}
          label='Beds'
          autoWidth
          onChange={handleChange}
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
        </Grid>
        <Grid item lg={0.93} md={2} sm={4} xs={6}>
         <FormControl sx={{width: '100%'}} size="medium">
        <InputLabel id="demo-simple-select-autowidth-label">Baths</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name='bath'
          value={searchData.bath}
          label='Baths'
          autoWidth
          onChange={handleChange}
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
        </Grid>
        <Grid item lg={1} md={3} sm={4} xs={6}>
         <FormControl sx={{width: '100%'}} size="medium">
         <InputLabel id="demo-simple-select-autowidth-label">Min-price</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name='minPrice'
          value={searchData.minPrice}
          label='min-price'
          autoWidth
          onChange={handleChange}
        >
         <MenuItem value='5000'>₦5,000</MenuItem>
          <MenuItem value='10000'>₦10,000</MenuItem>
          <MenuItem value='15000'>₦15,000</MenuItem>
          <MenuItem value='20000'>₦20,000</MenuItem>
          <MenuItem value='50000'>₦50,000</MenuItem>
          <MenuItem value='100000'>₦100,000</MenuItem>
          <MenuItem value='200000'>₦200,000</MenuItem>
          <MenuItem value='300000'>₦300,000</MenuItem>
          <MenuItem value='500000'>₦500,000</MenuItem>
          <MenuItem value='700000'>₦700,000</MenuItem>
          <MenuItem value='850000'>₦850,000</MenuItem>
          <MenuItem value='1000000'>₦1,000,000</MenuItem>
          <MenuItem value='1500000'>₦1,500,000</MenuItem>
          <MenuItem value='200000'>₦2,000,000</MenuItem>
          <MenuItem value='5000000'>₦5,000,000</MenuItem>
          <MenuItem value='10000000'>₦10,000,000</MenuItem>
          <MenuItem value='15000000'>₦15,000,000</MenuItem>
          <MenuItem value='25000000'>₦25,000,000</MenuItem>
          <MenuItem value='50000000'>₦50,000,000</MenuItem>
          <MenuItem value='100000000'>₦100,000,000</MenuItem>
          <MenuItem value='300000000'>₦300,000,000</MenuItem>
          <MenuItem value='500000000'>₦500,000,000</MenuItem>
          <MenuItem value='1000000000'>₦1,000,000,000</MenuItem>
          <MenuItem value='1500000000'>₦1,500,000,000</MenuItem>
          <MenuItem value='2500000000'>₦2,500,000,000</MenuItem>
          <MenuItem value='3000000000'>₦3,000,000,000</MenuItem>
          <MenuItem value='5000000000'>₦5,000,000,000</MenuItem>
        </Select>
        </FormControl>
        </Grid>
        <Grid item lg={1} md={3} sm={4} xs={6}>
         <FormControl sx={{width: '100%'}} size="medium">
        <InputLabel id="demo-simple-select-autowidth-label">Max-price</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name='maxPrice'
          value={searchData.maxPrice}
          label='max-price'
          autoWidth
          onChange={handleChange}
        >
          <MenuItem value='5000'>₦5,000</MenuItem>
          <MenuItem value='10000'>₦10,000</MenuItem>
          <MenuItem value='15000'>₦15,000</MenuItem>
          <MenuItem value='20000'>₦20,000</MenuItem>
          <MenuItem value='50000'>₦50,000</MenuItem>
          <MenuItem value='100000'>₦100,000</MenuItem>
          <MenuItem value='200000'>₦200,000</MenuItem>
          <MenuItem value='300000'>₦300,000</MenuItem>
          <MenuItem value='500000'>₦500,000</MenuItem>
          <MenuItem value='700000'>₦700,000</MenuItem>
          <MenuItem value='850000'>₦850,000</MenuItem>
          <MenuItem value='1000000'>₦1,000,000</MenuItem>
          <MenuItem value='1500000'>₦1,500,000</MenuItem>
          <MenuItem value='200000'>₦2,000,000</MenuItem>
          <MenuItem value='5000000'>₦5,000,000</MenuItem>
          <MenuItem value='10000000'>₦10,000,000</MenuItem>
          <MenuItem value='15000000'>₦15,000,000</MenuItem>
          <MenuItem value='25000000'>₦25,000,000</MenuItem>
          <MenuItem value='50000000'>₦50,000,000</MenuItem>
          <MenuItem value='100000000'>₦100,000,000</MenuItem>
          <MenuItem value='300000000'>₦300,000,000</MenuItem>
          <MenuItem value='500000000'>₦500,000,000</MenuItem>
          <MenuItem value='1000000000'>₦1,000,000,000</MenuItem>
          <MenuItem value='1500000000'>₦1,500,000,000</MenuItem>
          <MenuItem value='2500000000'>₦2,500,000,000</MenuItem>
          <MenuItem value='3000000000'>₦3,000,000,000</MenuItem>
          <MenuItem value='5000000000'>₦5,000,000,000</MenuItem>
        </Select>
        </FormControl>
        </Grid>
        <Grid item lg={0.6} md={2} sm={4} xs={12}>
        <StyledButton type='button' variant="contained" onClick={handleSearch}><strong>Find</strong></StyledButton>
        </Grid>
        </Grid>
    </SearchStyledContainer>
    </SearchStyledBox>
    </Form>
     <StyledContainer>
     {/* @ts-ignore:next-line */}
    { data?.data.length < 1 ? <Alert style={{marginTop: '10px'}} severity="info">No data found!</Alert> : ''}
    </StyledContainer>
     <StyledBox>
        <StyledContainer>
        <TopContainer>
          <Title>Properties for sale in Nigeria</Title>
          <SalesContainer>
             {/* @ts-ignore:next-line */}
            <SalesResult>{buyProperty?.total} results</SalesResult>
            {/* @ts-ignore:next-line */}
            <NewSales>{buyProperty?.total / 2} new</NewSales>
          </SalesContainer>
        </TopContainer>

        <SortContainer>
          <LeftContainer>
            <MapContainer onClick={() => navigate('/buymap')}>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></Svg>
              <Map>Map View</Map>
            </MapContainer>
            <SaveContainer>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/></Svg>
            <Save>Save</Save>
            </SaveContainer>
          </LeftContainer>
          <RightContainer>
            <Sort>Sort by:</Sort>
            <FormControl sx={{ marginLeft: '3px', minWidth: 90, }} size="small">
           <InputLabel id="demo-simple-select-autowidth-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name='sort'
          value={searchData.sort}
          label='Search'
          autoWidth
          onChange={handleChange}
        >
           <MenuItem value='featured:desc'>Featured</MenuItem>
          {/* <MenuItem value='newwest'>Newest</MenuItem> */}
          <MenuItem value='price:desc'>Price(low)</MenuItem>
          <MenuItem value='price:inc'>Price(high)</MenuItem>
          <MenuItem value='bed:desc'>Beds(least)</MenuItem>
          <MenuItem value='bed:inc'>Beds(most)</MenuItem>
          <MenuItem value='build:inc'>Developed(earliest)</MenuItem>
          <MenuItem value='build:desc'>Developed(latest)</MenuItem>
        </Select> 
        </FormControl>
          </RightContainer>
        </SortContainer>
        <StyledContainers>
          { !buyProperty && isFetching ?
            <>
         <Grid container spacing={2} rowGap={2}>
          <Grid item lg={3} xs={12} md={3} sm={4}>
          <Skeleton variant="rectangular" width='100%' height={220} /> 
          </Grid>
          <Grid item lg={6} xs={12} md={6} sm={8}>
          <>
                <SkeletonSeperator>
                 <Skeleton width="40%" />
                 <Skeleton width="15%" />
                 </SkeletonSeperator>
                 <SkeletonSeperator>
                 <Skeleton width="60%" />
                 <Skeleton width="15%" />
                 </SkeletonSeperator>
                 <SkeletonSeperator>
                 <Skeleton width="50%" height={20} />
                 <Skeleton variant="rectangular" width={80} height={70} />
                 </SkeletonSeperator>
                 <Skeleton width="50%" />
                 <Skeleton width="55%" />
                 <SkeletonSeperator style={{justifyContent: 'left'}}>
                 <Skeleton width="15%" height={40} style={{marginRight: 5}} />
                 <Skeleton width="15%" height={40} style={{marginRight: 5}}  />
                 <Skeleton width="15%" height={40} />
                 </SkeletonSeperator>
                </>
          </Grid>
          </Grid>
          <Grid container spacing={2} style={{marginTop: 5}}>
          <Grid item lg={3} xs={12} md={3} sm={4}>
          <Skeleton variant="rectangular" width='100%' height={220} /> 
          </Grid>
          <Grid item lg={6} xs={12} md={6} sm={8}>
          <>
                <SkeletonSeperator>
                 <Skeleton width="40%" />
                 <Skeleton width="15%" />
                 </SkeletonSeperator>
                 <SkeletonSeperator>
                 <Skeleton width="60%" />
                 <Skeleton width="15%" />
                 </SkeletonSeperator>
                 <SkeletonSeperator>
                 <Skeleton width="50%" height={20} />
                 <Skeleton variant="rectangular" width={80} height={70} />
                 </SkeletonSeperator>
                 <Skeleton width="50%" />
                 <Skeleton width="55%" />
                 <SkeletonSeperator style={{justifyContent: 'left'}}>
                 <Skeleton width="15%" height={40} style={{marginRight: 5}} />
                 <Skeleton width="15%" height={40} style={{marginRight: 5}}  />
                 <Skeleton width="15%" height={40} />
                 </SkeletonSeperator>
                </>
          </Grid>
         </Grid>
         </>
         :
          <>
            {/* @ts-ignore:next-line */}
            {buyProperty?.data.map((result: any) => ( 
              <StyledGrid container  key={result?._id}>
              <CardImg item lg={3} xs={12} md={3} sm={4}>
                <Splide
                  options={{
                    perPage: 1,
                    rewind: false,
                    gap: 0,
                    width: 'cover',
                    height: 220,
                    padding: 0
                  }}
                  aria-label="My Favorite Images"
                >
                  {/* @ts-ignore:next-line */}
                   { result?.images.map((item: any, index: any) => (
                  <SplideSlide key={index} style={{height: '100%', width: '100%', padding: 0, margin: 0}} > 
                    <Img src={item?.img} style={{height: '100%', width: '100%', padding: 0, margin: 0}} />
                  </SplideSlide>  
                   ))}
                </Splide>
                <VerifyContainer>
                  <VerifySvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" /></VerifySvg>
                  <Verify>VERIFIED</Verify>
                </VerifyContainer>
                <Tooltip title="Video tours are pre-recorded video walk-throughs of the property avaialble at all times" placement="top-start" arrow>
                  <VideoContainer>
                    <Video xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M188.3 147.1C195.8 142.8 205.1 142.1 212.5 147.5L356.5 235.5C363.6 239.9 368 247.6 368 256C368 264.4 363.6 272.1 356.5 276.5L212.5 364.5C205.1 369 195.8 369.2 188.3 364.9C180.7 360.7 176 352.7 176 344V167.1C176 159.3 180.7 151.3 188.3 147.1V147.1zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" /></Video>
                  </VideoContainer>
                </Tooltip>
                <Tooltip title="360 Tours offer you static panoramic view of the property." placement="top-start" arrow>
                  <ImgContainer>
                    <WebImg src='../images/icon-360.svg' />
                  </ImgContainer>
                </Tooltip>
              </CardImg>
              <CardDetails item lg={6} xs={12} md={6} sm={8}>
              <StyledLink href={`/buydetailsPage/${result._id}`}>
                  <LeftContainers>
                    <Price>{result?.price?.toLocaleString()} NGN</Price>
                    <Para>{result?.propertyTitle}</Para>
                    <BedBathContainer>
                      <Apart>{result.propertyType}</Apart>
                      <Bed><BedBathSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M176 288C220.1 288 256 252.1 256 208S220.1 128 176 128S96 163.9 96 208S131.9 288 176 288zM544 128H304C295.2 128 288 135.2 288 144V320H64V48C64 39.16 56.84 32 48 32h-32C7.163 32 0 39.16 0 48v416C0 472.8 7.163 480 16 480h32C56.84 480 64 472.8 64 464V416h512v48c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16V224C640 170.1 597 128 544 128z" /></BedBathSvg>{result.bedroom}</Bed>
                      <Bath><BedBathSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M32 384c0 28.32 12.49 53.52 32 71.09V496C64 504.8 71.16 512 80 512h32C120.8 512 128 504.8 128 496v-15.1h256V496c0 8.836 7.164 16 16 16h32c8.836 0 16-7.164 16-16v-40.9c19.51-17.57 32-42.77 32-71.09V352H32V384zM496 256H96V77.25C95.97 66.45 111 60.23 118.6 67.88L132.4 81.66C123.6 108.6 129.4 134.5 144.2 153.2C137.9 159.5 137.8 169.8 144 176l11.31 11.31c6.248 6.248 16.38 6.248 22.63 0l105.4-105.4c6.248-6.248 6.248-16.38 0-22.63l-11.31-11.31c-6.248-6.248-16.38-6.248-22.63 0C230.7 33.26 204.7 27.55 177.7 36.41L163.9 22.64C149.5 8.25 129.6 0 109.3 0C66.66 0 32 34.66 32 77.25v178.8L16 256C7.164 256 0 263.2 0 272v32C0 312.8 7.164 320 16 320h480c8.836 0 16-7.164 16-16v-32C512 263.2 504.8 256 496 256z" /></BedBathSvg>{result.bathroom}</Bath>
                      <Area>{result?.size?.toLocaleString()} sqft</Area>
                    </BedBathContainer>
                    <DetailContainer>
                      <LocateSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" /></LocateSvg>
                      <Detail>{result?.address1}</Detail>
                    </DetailContainer>
                  </LeftContainers>
                  </StyledLink>
                  <RightContainers>
                    <Featured>FEATURED</Featured>
                    <Premium>PREMIUM</Premium>
                    <LogoImg src={result.logo} />
                    <SaveBtnContainer>
                    {/* { isSaved ?
                    <SaveBtn onClick={() => handleDeleteSaveProperty(result)}><FavoriteOutlinedIcon fontSize='large' style={{color: '#008080', cursor: 'pointer'}} /></SaveBtn>
                    :
                    <SaveBtn onClick={() => handleSaveProperty(result)}><FavoriteBorderOutlinedIcon fontSize='large' style={{color: '#008080', cursor: 'pointer'}}  /></SaveBtn>
                   } */}
                  </SaveBtnContainer>
                  </RightContainers>
                </CardDetails>
                <BottomContainer>
                <Links href={`tel:${result?.phone}`}>
                  <CallContainer style={{marginTop: '15px', marginLeft: '15px'}}>
                    <Svgs xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" /></Svgs>
                    <Call>Call</Call>
                  </CallContainer>
                  </Links>
                  <Links href={`mailto:${result?.email}`}>
                  <EmailContainer style={{marginTop: '15px'}}>
                    <Svgs xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z" /></Svgs>
                    <Email>Email</Email>
                  </EmailContainer>
                  </Links>
                  <Links href={`https://wa.me/+234${result?.phone}?text=I'm%20inquiring%20about%20the%20apartment%20listing`}>
                  <WhatsAppContainer style={{marginTop: '15px'}}>
                    <Svgs xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></Svgs>
                    <WhatsApp>WhatsApp</WhatsApp>
                  </WhatsAppContainer>
                  </Links>
                </BottomContainer>
                <BottomContainer1>
                <Links href={`tel:${result?.phone}`}>
                  <CallContainer>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" /></Svg>
                    <Call>Call</Call>
                  </CallContainer>
                  </Links>
                  <Links href={`mailto:${result?.email}`}>
                  <EmailContainer>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z" /></Svg>
                    <Email>Email</Email>
                  </EmailContainer>
                  </Links>
                  <Links href={`https://wa.me/+234${result?.phone}?text=I'm%20inquiring%20about%20the%20apartment%20listing`}>
                  <WhatsAppContainer>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></Svg>
                    <WhatsApp>WhatsApp</WhatsApp>
                  </WhatsAppContainer>
                  </Links>
                </BottomContainer1>
                </StyledGrid>
                ))}
                </>
              }
        </StyledContainers>
        <Paper elevation={2} sx={{ background: 'inherit', marginTop: 2, marginBottom: 2, display: 'flex', justifyContent: 'center'}}>
      <BuyPaginate page={page} />
     </Paper>
        </StyledContainer>
        <Footer />
     </StyledBox>
     </>
  )
}

export default Buy