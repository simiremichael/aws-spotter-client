import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Alert, ClickAwayListener, FormControl, InputLabel, Link, Select, Skeleton } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Tooltip from '@mui/material/Tooltip';
import { useSearchPropertiesQuery } from '../services/api/propertyAPI';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import Paginate from './Pagination';
import Paper from '@mui/material/Paper';
import { selectCurrentPropertySearch, setPropertySearch } from '../services/features/propertySearchSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import useDebounce from '../debounce/useDebounce';
import MenuItem from '@mui/material/MenuItem';

const StyledBox = styled(Box)`
justify-content: center;
background-image: url("../images/pexels1.jpg");
min-height: 440px;
padding: 1rem 0;
width: 100%;
  background-attachment: fixed;
  background-position: center;
  background-size: 100% 100%; 
  @media screen and (min-width: 800px) {
    min-height: 400px;
  }
`
const InnerContainer = styled(Container)`
background-color: #ffffff;
padding: 2rem 1rem;
border-radius: 10px;
`

const TopContainer = styled.div`
display: flex;
margin-bottom: 10px;
`
const StyledBottomContainer = styled.div`
width: 100%;
`
const Title = styled.h1`
color: #ffffff;
padding: 5px 0 1.5rem 0;
font-size: 8vmin;
text-align: center;
font-weight: 600;
`
const Form = styled.form`
`
const BtnInput = styled.input`
display: none;
:checked + Label {
  background-color:#008080;
  color: #ffffff;
}
`
const Label = styled.label`
position: relative;
color: #008080;
font-size: 15px;
border: 1px solid #008080;
border-radius: 5px;
margin-right: 5px;
align-items: center;
cursor: pointer;
padding: 10px 12px;
`
const SearchInputContainer = styled.div`
height: 44px;
background-color: #ffffff;
border: 1px solid gray;
width: 100%;
display: flex;
border-radius: 5px;
align-items: center;
`
const SearchInput = styled.input`
border: none;
height: 80%;
width: 90%;
outline: none;
font-size: 14px;
`
const Select1 = styled.select`
width: 100%;
border-radius: 5px;
background-color: #fff;
height: 44px;
cursor: pointer;
color: gray;
border: 1px solid gray;
`
const Options = styled.option`
color: gray;
`
const SearchButton = styled.button`
background-color: #008080;
width: 100%;
height: 44px;
cursor: pointer;
border: none;
border-radius: 5px;
`
const Svg2 = styled.svg`
width: 15px;
fill: #ffffff;
`
const Svg1 = styled.svg`
width: 16px;
margin-top: 2px;
fill: gray;
align-self: center;
`
const Svg1Container = styled.div`
width: 20px;
margin-left: 8px;
`
const BedContainer = styled.div`
width: 100%;
height: 44px;
position: relative;
border: 1px solid gray;
border-radius: 5px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: space-between;
`
const BedP = styled.span`
font-size: 14px;
color: gray;
margin-left: 4px;
font-size: 0.9rem;
`
const BedTitle = styled.h3`
text-align: start;
color: gray;
margin-left: 8px;
`
const BedBathDropdown = styled.div`
cursor: pointer;
margin: 0 -11px;
`
const BedBathWrapper = styled.div`
z-index: 1;
position: absolute;
background: #ffff;
width: auto;
`
const DropdownSelector = styled.div`
padding: 5px 10px;
`
const Ul = styled.ul`
list-style-type: none;
display: flex;
flex-wrap:wrap;
justify-content: space-between;
padding-left: 0;
padding-right: 10px;
`
const Li =styled.li`
`
const Input1 = styled.input`
display: none;
:checked + label {
  border: 1px solid #008080;
  color: #008080;
}
`
const Input2 = styled.input`
display: none;
:checked + label {
  border: 1px solid #008080;
  color: #008080;
}
`
const Label1 = styled.label`
position: relative;
color: gray;
font-size: 15px;
background: #F5F5F5;
border-radius: 5px;
margin: 15px 0 15px 5px;
align-items: center;
cursor: pointer;
padding: 1px 8px;
`
const Label2 = styled.label`
position: relative;
color: gray;
font-size: 15px;
background: #F5F5F5;
border-radius: 5px;
margin: 15px 0 15px 5px;
align-items: center;
cursor: pointer;
padding: 1px 8px;
`
const StyledSvg = styled.svg`
width: 10px;
fill: gray;
margin-right: 4px;
`
const Button = styled.button`
color: #008080;
display: block;
border: none;
background: none;
font-size: 15px;
cursor: pointer;
margin: 0 0 5px 8px;
`
const PriceContainer = styled.div`
display:flex;
border: 1px solid gray;
width: 100%;
justify-content: space-between;
height: 44px;
align-items: center;
border-radius: 5px;
cursor: pointer;
`
const PriceP = styled.span`
margin: 0 5px;
color: gray;
font-size: 0.9rem;
`
const PriceDropDown = styled.div`
background: #ffff;
padding: 5px;
`
const PriceSelect = styled.div`
display: flex;
`
const MinPrice = styled.div`
border: 1px solid gray;
margin: 10px;
width: 120px;
height: 45px;
border-radius: 5px;
`
const Seperator = styled.div`
border-bottom: 1px solid gray;
width: 10px;
margin-top: 10px;
height: 22.5px;
`
const Span = styled.span`
color: gray;
font-size: 13px;
`
const MaxPrice = styled.div`
border: 1px solid gray;
margin: 10px;
width:  120px;
height: 45px;
border-radius: 5px;
`
const PriceInput = styled.input`
width: 116px;
outline: none;
border: none;
color: gray;
text-align: center;
`
const RentDurationContainer = styled.div`
`
const Datalist = styled.datalist`
`
const Option = styled.option`
`
const Period = styled.h3`
text-align: start;
color: #708090;
font-size: 17px;
margin-left: 10px;
`
const InnerSelect = styled.div`
margin-left: 9px;
display: flex;
flex-wrap: wrap;
`
const BtnInput5 = styled(BtnInput)`
`
const Label5 = styled(Label)`
margin-bottom: 10px;
`
const PriceReset = styled(Button)`
margin: 8px 0 0 5px;
`
const Div = styled.div`
`
const BoxDiv = styled.div`
position: absolute;
width: 380px;
z-index: 10000 ;
margin-top: 50px;
`
const BoxDiv1 = styled.div`
position: absolute;
width: 320px;
z-index: 10000;
margin-top: 50px;
margin-left: -140px;
`
const SearchResultContainer = styled(Container)`
z-index: 1000;
position: absolute;
margin-top: -20px;
background: rgba( 255, 255, 255, 0.6 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 15px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.5 );
hight: auto;
padding-bottom: 10px;
@media screen and (min-width: 900px) {
  margin-top: -45px;
}
`
const StyledGrid = styled(Grid)`
margin-bottom: 15px;
margin-top: 15px;
`
const StyledContainer = styled.div`
margin: 10px 0;
`
const CardImg = styled(Grid)`
`
const CardDetails = styled(Grid)`
display: flex;     
justify-content: space-between;
border: 1px solid  #A9A9A9;
:hover{
  background: #F5F5F5;
}
cursor: pointer;
@media screen and (max-width: 900px) {
  padding: 0 0 55px 0;
}
`
const Img = styled.img`
height: 200px;
width: 100%;
`
const LeftContainer = styled.div`
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
const Bed = styled.p`
display: flex;
text-align: start;
margin-right: 10px;
color: #494949;
`
const Bath = styled.p`
display: flex;
text-align: start;
margin-right: 10px;
color: #494949;
`
const Area = styled.p`
text-align: start;
margin-right: 10px;
color: #494949;
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
const Svg = styled.svg`
width: 15px;
fill: #4169E1;
margin-right: 7px;
`
const   CallContainer = styled.div`
display: flex;
align-items: center;
padding: 0 15px;
border: 1px solid gray;
height: 30px;
font-size: 15px;
margin-right: 5px;
border-radius: 3px;
cursor: pointer;
:hover{
  background: #F5F5F5;
}
`
const BottomContainer = styled.div`
display: flex;
margin: -55px 0 0 290px;
flex-wrap:wrap;
z-index: 1001;
@media screen and (max-width: 900px) {
  display: none;
}
`
const BottomContainer1 = styled.div`
display: flex;
margin: -40px 0 0 14px;
flex-wrap:wrap;
z-index: 1001;
@media screen and (min-width: 901px) {
  display: none;
}
`
const Call = styled.p`
text-align: center;
color: #494949;
`
const EmailContainer = styled.div`
border: 1px solid gray;
display: flex;
align-items: center;
padding: 0 15px;
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
border: 1px solid gray;
height: 30px;
font-size: 15px;
display: flex;
align-items: center;
padding: 0 15px;
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
const RightContainer = styled.div`
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
const StyledLink = styled(Link)`
 text-decoration: none;
  color: #494949;
  width: 100%;
  height: 100%;
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
const CloseIconContainer = styled.div`
display: flex;
justify-content: end;
`
const Links = styled(Link)`
text-decoration: none;
`
const SkeletonSeperator = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

function SearchArea() {

const initialInput = "Beds & Baths";
const priceState = 'Prices'

 
//  let [pageParams, setPageParams] = useSearchParams();
  const [show, setShow] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [input, setInput] = useState(initialInput);
  const [bath, setBath] = useState('');
  const [value1, setValue1] = useState(priceState);
  const [value2, setValue2] = useState('');
  const initialData = {toggle: '', search: '', type: '', state: 'lagos', select_bed: '', page: '', select_bath: '', MinPrice: '', MaxPrice: '', duration: ''  }
  const [searchData, setSearchData] = useState(initialData)
   let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()
  const [reveal, setReveal] = useState(false);

 
  //  console.log(searchQuery, toggleQuery, typeQuery, selectBedQuery, selectBathQuery, minPriceQuery, maxPriceQuery);
   const page = searchParams.get('page') || 1;
  const makeVisble = () => {
    setShow((prev) => !prev);
  };
  const priceReveal = () => {
    setShowPrice((prev) => !prev);
  };

  const clear = () => {
    setInput(initialInput);
    setSearchData(initialData);
    setBath('')
  }

  const handleValue1  = (e: any) => {
    let Input3 = e.target.value;
    setValue1(Input3)
    setSearchData({...searchData, MinPrice: e.target.value})
  }
  const handleValue2  = (e: any) => {
    let Input4 = e.target.value;
    setValue2(Input4)
    setSearchData({...searchData, MaxPrice: e.target.value})
  }
   const dispatch = useAppDispatch();

  const clearPrice = () => {
    setValue1(priceState);
    setSearchData(initialData);
    setValue2('')
  }
 
  const handleClickAway = () => {
    setShow(false);
  };
  const handleClickAway1 = () => {
    setShowPrice(false);
  };
const debounceSearch = searchData.search

  const debounce = useDebounce(debounceSearch, 800);

 const search = debounce
 const toggle = searchData.toggle
 const type = searchData.type
 const selectBed = searchData.select_bed
 const selectBath = searchData.select_bath
 const minPrice = searchData.MinPrice
 const duration = searchData.duration
 const maxPrice = searchData.MaxPrice
 const state = searchData.state


  const {data, isFetching} = useSearchPropertiesQuery({page, state, search, minPrice, maxPrice, toggle, type, selectBed, selectBath, duration });

  useEffect(() => {
    if(data) {
      dispatch(setPropertySearch({propertySearch: data }));
   }
   }, [dispatch, data]);
   const {propertySearch} = useAppSelector(selectCurrentPropertySearch);

   const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchData({...searchData, [name]: value});
     }
 
     const handleDuration = (e: any) => {
      const name = e.target.name;
    const value = e.target.value;
    setSearchData({...searchData, [name]: value});
     }
     const clearSearch = () => {
      setSearchData(initialData);
      setSearchParams(initialData)
      setReveal(false)
      navigate('/')
      setValue1(priceState)
      setValue2('')
     }
//console.log(search) 
const handleSearch = () => {
  {/* @ts-ignore:next-line */}
   if(data?.data.length >= 1){
    setReveal(true);
      {/* @ts-ignore:next-line */}
     navigate(`/properties?search=${search}&toggle=${toggle}&type=${type}&selectBath=${selectBath}&selectBed=${selectBed}&minPrice=${minPrice}&maxPrice=${maxPrice}&duration=${duration}`)
  
    } else {
    setReveal(false);
   }
}
useEffect(() => {
   {/* @ts-ignore:next-line */}
   if (data?.data.length < 1) {
    setReveal(false);
  }
},[data])

  return (
    <>
    <StyledBox>
      <Title>Find Your Future Home</Title>
      <InnerContainer sx={{ position: 'relative' }}>
      <Form>
        <Grid container> 
          <Grid item lg={1.5} md={1.8} sm={2.5} xs={5}>
          <TopContainer>
          <BtnInput type='radio' name='toggle' id='buy' value='sale' onChange={handleChange}/>
          <Label htmlFor='buy'>Buy</Label>
          <BtnInput type='radio' name='toggle' id='rent' value='rent' defaultChecked onChange={handleChange} />
          <Label htmlFor='rent'>Rent</Label>  
          </TopContainer>
          </Grid>
          <Grid item lg={10} md={10} sm={8} xs={6}>
          <FormControl sx={{  minWidth: 90 }} size="small">
           <InputLabel id="demo-simple-select-autowidth-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name='state'
          value={searchData.state}
          label='Choose a State'
          autoWidth
          onChange={handleChange}
        >
           <MenuItem value='lagos'>Lagos</MenuItem>
          <MenuItem value='abuja'>Abuja</MenuItem>
          <MenuItem value='ogun'>Ogun</MenuItem>
          <MenuItem value='rivers'>Rivers</MenuItem>
          <MenuItem value='oyo'>Oyo</MenuItem>
          <MenuItem value='ekiti'>Ekiti</MenuItem>
          <MenuItem value='ondo'>Ondo</MenuItem>
          <MenuItem value='edo'>Edo</MenuItem>
          <MenuItem value='delta'>Delta</MenuItem>
          <MenuItem value='akwa ibom'>Akwa Ibom</MenuItem>
          <MenuItem value='abia'>Abia</MenuItem>
          <MenuItem value='kogi'>Kogi</MenuItem>
          <MenuItem value='bayelsa'>Bayelsa</MenuItem>
          <MenuItem value='benue'>Benue</MenuItem>
          <MenuItem value='kaduna'>Kaduna</MenuItem>
          <MenuItem value='kanu'>Kanu</MenuItem>
          <MenuItem value='katsina'>Katsina</MenuItem>
          <MenuItem value='yobe'>Yobe</MenuItem>
          <MenuItem value='cross river'>Cross River</MenuItem>
          <MenuItem value='taraba'>Taraba</MenuItem>
          <MenuItem value='nasarawa'>Nasarawa</MenuItem>
          <MenuItem value='imo'>Imo</MenuItem>
          <MenuItem value='enugu'>Enugu</MenuItem>
          <MenuItem value='kwara'>Kwara</MenuItem>
          <MenuItem value='kebbi'>Kebbi</MenuItem>
          <MenuItem value='adamawa'>Adamawa</MenuItem>
          <MenuItem value='bauchi'>Bauchi</MenuItem>
          <MenuItem value='jigawa'>Jigawa</MenuItem>
          <MenuItem value='anambra'>Anambra</MenuItem>
          <MenuItem value='osun'>Osun</MenuItem>
          <MenuItem value='niger'>Niger</MenuItem>
          <MenuItem value='bornu'>Bornu</MenuItem>
          <MenuItem value='ebonyi'>Ebonyi</MenuItem>
          <MenuItem value='ekiti'>Ekiti</MenuItem>
          <MenuItem value='zanfara'>Zanfara</MenuItem>
          <MenuItem value='gombe'>Gombe</MenuItem>
          <MenuItem value='bayelsa'>Bayelsa</MenuItem>
          <MenuItem value='rivers'>Rivers</MenuItem>
        </Select> 
        </FormControl>
        </Grid>
        </Grid>
        
      <StyledBottomContainer>
      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={9} xs={12}>
        <SearchInputContainer>
          <Svg1Container>
        <Svg1 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></Svg1>
        </Svg1Container>
      <SearchInput type="text" name="search" placeholder='Location, Estate or Building' value={searchData.search}  onChange={handleChange} />
      </SearchInputContainer>
      </Grid>
      {/* <SelectContainer> */}
      <Grid item lg={2} md={2} sm={3} xs={12}>
      <Select1 name='type' value={searchData.type} onChange={handleChange}>
      <Options>Select Property</Options>
      <Options value='apartment'>Apartment</Options>
      <Options value='office'>Office</Options> 
      <Options value='flat'>Flat</Options>
      <Options value='terraced'>Terraced</Options>
      <Options value='full floor'>Full Floor</Options>
      <Options value='duplex'>Duplex</Options>
      <Options value='land'>Land</Options>
      <Options value='whole building'>Whole Building</Options>
      <Options value='hotel apartment'>Hotel Appartment</Options>
      <Options value='bungalow'>Bungalow</Options>
      <Options value='shop'>Shop</Options>
      <Options value='room'>Room</Options>
      <Options value='warehouse'>Warehouse</Options>
      <Options value='mini flat'>Mini Flat</Options>
      <Options value='self contain'>Self Contain</Options>
      <Options value='detached'>Detached</Options>
      <Options value='semi detached'>Semi-detached</Options>
      <Options value='industrial'>Industrial</Options>
      <Options value='retail'>Retail</Options>
      </Select1>
      </Grid>
      <Grid item lg={1.5} md={1.5} sm={4} xs={6}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Div style={{ position: 'relative', display: 'flex', flexDirection: 'column'}} >
          <BedContainer onClick={makeVisble}>
            <BedP>{!searchData.select_bed ? input : searchData.select_bed} {searchData.select_bed !== 'studio' && searchData.select_bed !== 'shop' && searchData.select_bed !== '' ? 'bed' : ''}{searchData.select_bed !== 'studio' && searchData.select_bed !== 'shop' && searchData.select_bed > '1' ? 's' : ''}{searchData.select_bath? ',' : ''} {bath? '&' : ''} {!searchData.select_bed ? bath : searchData.select_bath} {searchData.select_bath? 'bath' : ''}{searchData.select_bath > '1' ? 's' : ''}</BedP>
        <StyledSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></StyledSvg>
      </BedContainer>
      {show ? (
        // <Portal>
          <BoxDiv>
      <BedBathDropdown>
      <BedBathWrapper>
      <DropdownSelector>
      <BedTitle>Bedrooms</BedTitle>
      <Ul>
      <Li>
        <Input1 type='radio' name='select_bed' id='01' value='shop' onChange={handleChange} />
        <Label1 htmlFor='01'>Shop</Label1>
        </Li>
        <Li>
        <Input1 type='radio' name='select_bed' id='0' value='studio'  onChange={handleChange} />
        <Label1 htmlFor='0'>Studio</Label1>
        </Li>
        <Li>
        <Input1 type='radio' name='select_bed' id='1' value='1'  onChange={handleChange} />
        <Label1 htmlFor='1'>1</Label1>
        </Li>
        <Li>
        <Input1 type='radio' name='select_bed' id='2' value='2'  onChange={handleChange}/>
        <Label1 htmlFor='2'>2</Label1>
        </Li>
        <Li>
        <Input1 type='radio' name='select_bed' id='3' value='3' onChange={handleChange}/>
        <Label1 htmlFor='3'>3</Label1>
        </Li>
        <Li>
        <Input1 type='radio' name='select_bed' id='4' value='4'  onChange={handleChange}/>
        <Label1 htmlFor='4'>4</Label1>
        </Li>
        <Li>
        <Input1 type='radio' name='select_bed' id='5' value='5' onChange={handleChange}/>
        <Label1 htmlFor='5'>5</Label1>
        </Li>
        <Li>
        <Input1 type='radio' name='select_bed' id='6' value='6' onChange={handleChange}/>
        <Label1 htmlFor='6'>6</Label1>
        </Li>
        <Li>
        <Input1 type='radio' name='select_bed' id='7+' value='7+' onChange={handleChange}/>
        <Label1 htmlFor='7+'>7+</Label1>
        </Li>
      </Ul>
      </DropdownSelector>
      <DropdownSelector>
      <BedTitle>Bathrooms</BedTitle>
      <Ul>
        <Li>
        <Input2 type='radio' name='select_bath' id='8' value='1' onChange={handleChange}/>
        <Label2 htmlFor='8'>1</Label2>
        </Li>
        <Li>
        <Input2 type='radio' name='select_bath' id='9' value='2' onChange={handleChange} />
        <Label2 htmlFor='9'>2</Label2> 
        </Li>
        <Li>
        <Input2 type='radio' name='select_bath' id='10' value='3' onChange={handleChange}/>
        <Label2 htmlFor='10'>3</Label2>
        </Li>
        <Li>
        <Input2 type='radio' name='select_bath' id='11' value='4' onChange={handleChange} />
        <Label2 htmlFor='11'>4</Label2>
        </Li>
        <Li>
        <Input2 type='radio' name='select_bath' id='12' value='5' onChange={handleChange} />
        <Label2 htmlFor='12'>5</Label2>
        </Li>
        <Li>
        <Input2 type='radio' name='select_bath' id='13' value='6' onChange={handleChange} />
        <Label2 htmlFor='13'>6</Label2>
        </Li>
        <Li>
        <Input2 type='radio' name='select_bath' id='14' value='7+' onChange={handleChange} />
        <Label2 htmlFor='14'>7+</Label2>
        </Li>
      </Ul>
      </DropdownSelector>
      <Button type='reset' onClick={() => clear()} >Reset</Button>
      </BedBathWrapper>
      </BedBathDropdown> </BoxDiv>
      //  </Portal>
       ): null 
 }  </Div>
 </ClickAwayListener>
 </Grid>
 <Grid item lg={1.5} md={1.5} sm={4} xs={6}>
 <ClickAwayListener onClickAway={handleClickAway1}>
        <Div style={{ position: 'relative', display: 'flex', flexDirection: 'column'}} >
        <PriceContainer onClick={priceReveal}>
        <PriceP>{value1} {value2 ? '-' : ''}   {value2}</PriceP>
        <StyledSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></StyledSvg>
        </PriceContainer>
        { showPrice ?
        <BoxDiv1>
        <PriceDropDown>
          <PriceSelect>
           <MinPrice>
            <Span>Min. Price (₦)</Span>
            <PriceInput type='text' list='min-price' name='minPrice' onChange={handleValue1} value={searchData.MinPrice} />
            <label htmlFor='min-price'></label>
            {/* <RangeInput type='range' min='0' list='minPrice' max={searchData.MaxPrice} value={searchData.MinPrice} onChange={(e: any) => setSearchData({...searchData, MinPrice: e.target.value})} /> */}
           <Datalist id='min-price'>
           <Option value='5000'></Option>
          <Option value='10000'></Option>
          <Option value='20000'></Option>
          <Option value='30000'></Option>
          <Option value='40000'></Option>
          <Option value='50000'></Option>
           <Option value='100000'></Option>
           <Option value='150000'></Option>
           <Option value='200000'></Option>
           <Option value='300000'></Option>
           <Option value='350000'></Option>
           <Option value='400000'></Option>
           <Option value='500000'></Option>
           <Option value='600000'></Option>
           <Option value='700000'></Option>
           <Option value='800000'></Option>
           <Option value='900000'></Option>
           <Option value='1000000'></Option>
           <Option value='1500000'></Option>
           <Option value='2000000'></Option>
           <Option value='3000000'></Option>
           <Option value='5000000'></Option>
           <Option value='1000000'></Option>
           <Option value='15000000'></Option>
           <Option value='20000000'></Option>
           <Option value='30000000'></Option>
           <Option value='50000000'></Option>
           <Option value='100000000'></Option>
           <Option value='300000000'></Option>
           <Option value='500000000'></Option>
           <Option value='800000000'></Option>
           <Option value='1000000000'></Option>
           <Option value='2500000000'></Option>
           <Option value='3000000000'></Option>
           <Option value='5000000000'></Option>
           </Datalist>
           </MinPrice>
           <Seperator></Seperator>
           <MaxPrice>
           <Span>Max. Price (₦)</Span>
          
           <PriceInput type='text' list='max-price' name='maxPrice' onChange={handleValue2} value={searchData.MaxPrice}  />
            <label htmlFor='max-price'></label>
            {/* <RangeInput type='range' min='0' list='maxPrice' max={searchData.MaxPrice} value={searchData.MaxPrice} onChange={(e: any) => setSearchData({...searchData, MaxPrice: e.target.value})} /> */}
           <Datalist id='max-price'>
           <Option value='5000'></Option>
          <Option value='10000'></Option>
          <Option value='20000'></Option>
          <Option value='30000'></Option>
          <Option value='40000'></Option>
          <Option value='50000'></Option>
           <Option value='100000'></Option>
           <Option value='150000'></Option>
           <Option value='200000'></Option>
           <Option value='300000'></Option>
           <Option value='350000'></Option>
           <Option value='400000'></Option>
           <Option value='500000'></Option>
           <Option value='600000'></Option>
           <Option value='700000'></Option>
           <Option value='800000'></Option>
           <Option value='900000'></Option>
           <Option value='1000000'></Option>
           <Option value='1500000'></Option>
           <Option value='2000000'></Option>
           <Option value='3000000'></Option>
           <Option value='5000000'></Option>
           <Option value='1000000'></Option>
           <Option value='15000000'></Option>
           <Option value='20000000'></Option>
           <Option value='30000000'></Option>
           <Option value='50000000'></Option>
           <Option value='100000000'></Option>
           <Option value='300000000'></Option>
           <Option value='500000000'></Option>
           <Option value='800000000'></Option>
           <Option value='1000000000'></Option>
           <Option value='2500000000'></Option>
           <Option value='3000000000'></Option>
           <Option value='5000000000'></Option>
           </Datalist>
           </MaxPrice>
          </PriceSelect>
          <RentDurationContainer>
           <Period>Rental Period</Period>
           <InnerSelect>
            {toggle === 'rent' && ( 
              <>
           <BtnInput5 type='radio' name='duration' id='year' value='yearly' onChange={handleDuration} />
      <Label5 htmlFor='year'>Yearly</Label5>
      <BtnInput5 type='radio' name='duration' id='month' value='monthly' onChange={handleDuration} />
      <Label5 htmlFor='month'>Monthly</Label5>
      <BtnInput5 type='radio' name='duration' id='week' value='weekly' onChange={handleDuration} />
      <Label5 htmlFor='week'>Weekly</Label5>
      <BtnInput5 type='radio' name='duration' id='day' value='daily' onChange={handleDuration} />
      <Label5 htmlFor='day'>Daily</Label5>
      </>
      )}
      {toggle === 'sale' && ( 
        <>
      <BtnInput5 type='radio' name='duration' id='total' value='total price' onChange={handleDuration} />
      <Label5 htmlFor='total'>Total price</Label5>
      <BtnInput5 type='radio' name='duration' id='meter' value='price per square meter' onChange={handleDuration} />
      <Label5 htmlFor='meter'>Price per square meter</Label5>
      </>
      )}
           </InnerSelect>
          </RentDurationContainer>
          <PriceReset type='reset' onClick={() => clearPrice()} >Reset</PriceReset>
        </PriceDropDown> </BoxDiv1> : null
     }</Div>
     </ClickAwayListener>
     </Grid>
 <Grid item lg={1} md={1} sm={4} xs={12}>
      <SearchButton type='button' onClick={handleSearch}><Svg2 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></Svg2></SearchButton>
      {/* </SelectContainer> */}
      </Grid>
      </Grid>
      </StyledBottomContainer>
      </Form>
      {/* @ts-ignore:next-line */}
      { data?.data.length < 1 ? <Alert style={{marginTop: '10px'}} severity="info">No data found!</Alert> : ''}
      </InnerContainer>
    </StyledBox>
 {/* @ts-ignore:next-line */}
    { reveal === true && debounce  ? ( 
       <>
       <Box style={{display: 'flex', justifyContent: 'center'}}>
      <SearchResultContainer>
        <CloseIconContainer>
          {/* @ts-ignore:next-line */}
   {data?.data.length >= 1 &&
        <CloseIcon sx={{marginTop: 2, cursor: 'pointer'}} onClick={clearSearch} />
   }
        </CloseIconContainer>
      <StyledContainer>
           {/* @ts-ignore:next-line */}
           { !propertySearch?.data && isFetching ?
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
            {propertySearch.data.map((result: any) => ( 
              <StyledGrid container key={result?._id}>
         <CardImg item lg={3} xs={12} md={3} sm={12}>
                <Splide
                  options={{
                    perPage: 1,
                    rewind: true,
                    gap: 0,
                    width: 'cover',
                    height: 220,
                    padding: 0
                  }}
                  aria-label="My Favorite Images"
                >
                  {/* @ts-ignore:next-line */}
                   {result?.images.map((item: any, index: any) => (
                  <SplideSlide key={index} style={{height: '100%', width: '100%', padding: 0, margin: 0}}> 
                    <Img src={item?.img} style={{height: '100%', width: '100%', padding: 0, margin: 0}} />
                  </SplideSlide>   
                   ))}
                </Splide>
                {result.verified ?
                <VerifyContainer>
                  <VerifySvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" /></VerifySvg>
                  <Verify>{result.verified.toUpperCase()}</Verify>
                </VerifyContainer> : '' }
                {result.video ?
                <Tooltip title="Video tours are pre-recorded video walk-throughs of the property avaialble at all times" placement="top-start" arrow>
                  <VideoContainer>
                    <Video xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M188.3 147.1C195.8 142.8 205.1 142.1 212.5 147.5L356.5 235.5C363.6 239.9 368 247.6 368 256C368 264.4 363.6 272.1 356.5 276.5L212.5 364.5C205.1 369 195.8 369.2 188.3 364.9C180.7 360.7 176 352.7 176 344V167.1C176 159.3 180.7 151.3 188.3 147.1V147.1zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" /></Video>
                  </VideoContainer>
                </Tooltip>: '' }
                {result.tour ? 
                <Tooltip title="360 Tours offer you static panoramic view of the property." placement="top-start" arrow>
                  <ImgContainer>
                    <WebImg src='../images/icon-360.svg' />
                  </ImgContainer>
                </Tooltip> : '' }
              </CardImg>
              <CardDetails item lg={6} xs={12} md={6} sm={8}>
              <StyledLink href={`/buydetailsPage/${result._id}`}>
                  <LeftContainer>
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
                      <Detail>{result?.address}</Detail>
                    </DetailContainer>
                  </LeftContainer>
                  </StyledLink>
                  <RightContainer>
                    {result.featured ?
                    <Featured>{result.featured.toUpperCase()}</Featured> : '' }
                    {result.premium ?
                    <Premium>{result.premium.toUpperCase()}</Premium> : ''}
                    { result.logo ?
                    <LogoImg src={result.logo} style={{ marginTop: !result.featured ? '12px' : '-10px' }} /> : ''}
                    {/* <SaveBtnContainer>
                    { isSaved ?
                    <SaveBtn onClick={() => handleDeleteSaveProperty(result)}><FavoriteOutlinedIcon fontSize='large' style={{color: '#008080', cursor: 'pointer'}} /></SaveBtn>
                    :
                    <SaveBtn onClick={() => handleSaveProperty(result)}><FavoriteBorderOutlinedIcon fontSize='large' style={{color: '#008080', cursor: 'pointer'}}  /></SaveBtn>
                   }
                  </SaveBtnContainer> */}
                  </RightContainer>
                </CardDetails>
                <BottomContainer>
                <Links href={`tel:${result?.phone}`}>
                  <CallContainer style={{marginTop: '15px', marginLeft: '15px'}}>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" /></Svg>
                    <Call>Call</Call>
                  </CallContainer>
                  </Links>
                  <Links href={`mailto:${result?.email}`}>
                  <EmailContainer style={{marginTop: '15px'}}>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z" /></Svg>
                    <Email>Email</Email>
                  </EmailContainer>
                  </Links>
                  <Links href={`https://wa.me/${result?.phone}?text=I'm%20inquiring%20about%20the%20apartment%20listing`}>
                  <WhatsAppContainer style={{marginTop: '15px'}}>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></Svg>
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
                  <Links href={`https://wa.me/${result?.phone}?text=I'm%20inquiring%20about%20the%20apartment%20listing`}>
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
        </StyledContainer>
      <>
      {/* @ts-ignore:next-line */}
      { data?.data.length >= 1 ?
     <Paper elevation={2} sx={{ background: 'inherit', marginTop: 2, marginBottom: 2, display: 'flex', justifyContent: 'center'}}>
      <Paginate page={page} />
     </Paper>
     : ''}
     </>
      </SearchResultContainer>
      </Box>
      </>
      ): ''}
    </>
  )
}
export default SearchArea



