import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useOffplanQuery } from '../services/api/propertyAPI';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { selectCurrentOffplan, setOffplan } from '../services/features/offplanSlice';
import {Alert, Paper, Skeleton } from '@mui/material';
import OffplanPaginate from '../components/OffplanPagination';
import useDebounce from '../debounce/useDebounce';

const BoxContainer = styled(Box)``
const StyledContainer = styled(Container)`
display: flex;
align-items: center;
justify-content: start;
flex-wrap: wrap;
`
const StyledButton = styled(Button)`
height: 54px;
width: 100%;
background-color: #008080;
:hover{
  background-color: #008080;
}
`
const StyledBox = styled(Container)`

`

const StyledGrid = styled(Grid)`
margin: 15px 0;
`

const CardImg = styled(Grid)`
@media screen and (min-width: 901px) {
  margin: 0;
}
`
const CardDetails = styled(Grid)`
display: flex;
height: 200px;
justify-content: space-between;
border: 0.5px solid  #c4c4c4;
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
margin-top: 45px;
color: #494949;
`
const Developer = styled.p`
text-align: start;
margin: 18px 0 0 0;
font-size: 12px;
color: #494949;
`
const PropertyName = styled.p`
text-align: start;
font-size: 18px;
font-weight: bold;
margin: 0;
color: #4169E1;
`
const Bed = styled.p`
display: flex;
text-align: start;
margin: 0;
color: #494949;
font-weight: bold;
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
margin: 0;
fill: #494949;
`

const Premium = styled.h6`
color: #B8860B;
margin: 5px 5px 15px 0;
`
const Featured = styled.h6`
color: #DAA520;
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
const LearnmoreContainer = styled.div`
margin: 60px 5px 0 0;
border: 1px solid  #A9A9A9;
height: 30px;
display: flex;
align-items: center;
`
const Learnmore = styled.p`
font-weight: bold;
color: #4169E1;
padding: 0 10px;
font-size: 0.9rem;
@media screen and (max-width: 768px) {
  padding: 0 5px;
font-size: 0.8rem;
 }
`
const Form = styled.form`

`
const PropertyStatus = styled.li`
text-align: start;
margin: 18px 0 0 0;
font-size: 12px;
color: #494949;
list-style-position: inside;
margin: 0 0 0 10px;
padding: 0;
`
const DeveloperContainer = styled.div`
display: flex;
align-items: end;
`
const StyledLink = styled(Link)`
 text-decoration: none;
  color: #494949;
  width: 100%;
  height: 100%;
  display: flex;
height: 200px;
justify-content: space-between;
 `
 const AddressContainer = styled.div`
display: flex;
align-items: center;
`
const Address = styled.p`
text-align: start;
margin: 0 0 0 5px;
font-size: 14px;
color: #494949;
`
 const PropertyNameContainer = styled.div`
display: flex;
margin: 3px 0 5px 0;
font-size: 15px;
`
const SkeletonSeperator = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

function Offplan() {
 
  let [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const propertyGroupQuery = searchParams.get('propertyGroup');
  const typeQuery = searchParams.get('type');
  const minBedQuery = searchParams.get('minBed');
  const maxBedQuery = searchParams.get('maxBed');
  const minPriceQuery = searchParams.get('minPrice');
  const maxPriceQuery = searchParams.get('maxPrice');
  const possessionQuery = searchParams.get('possession');
  const navigate = useNavigate()
  const [searchData, setSearchData] = useState({search: '', state: 'lagos', propertyGroup: 'New Projects', type: '', minBed: '', maxBed: '', minPrice: '', maxPrice: '', possession: '', sort: ''})
  const debounceSearch = searchData.search
  const debounce = useDebounce(debounceSearch, 800);
    const search = searchQuery !== null ? searchQuery : debounce
    const propertyGroup = searchData.propertyGroup
    const type = typeQuery !== null ? typeQuery : searchData.type
    const minBed = minBedQuery!== null ? minBedQuery : searchData.minBed
    const maxBed = maxBedQuery !== null ? maxBedQuery : searchData.maxBed
    const minPrice = minPriceQuery !== null ? minPriceQuery : searchData.minPrice
    const maxPrice = maxPriceQuery !== null ? maxPriceQuery : searchData.maxPrice
    const possession =  possessionQuery !== null ? possessionQuery : searchData.possession
    const sort = searchData.sort
    const state = searchData.state

    console.log(searchData, searchParams)

    //const searchQuery = searchParams.get('searchQuery');
const page = searchParams.get('page') || 1;
const dispatch = useAppDispatch();

    const {data, isFetching} = useOffplanQuery({search, state, minPrice, maxPrice, minBed, maxBed, type, propertyGroup, possession, sort, page}, {refetchOnMountOrArgChange: true })
  
    useEffect(() => {
      dispatch(setOffplan({offplan: data}))
       },[dispatch, data])
   
       const {offplan} = useAppSelector(selectCurrentOffplan);
   
       const handleChange = (e: any) => {
         const name = e.target.name;
         const value = e.target.value;
         setSearchData( values => ({...values, [name]: value}));
        //  setSearchParams(searchData)
         };
   
       const handleSearch = () => {
         navigate(`/offplan?search=${search}&type=${type}&minBed=${minBed}&maxBed=${maxBed}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}&possession=${possession}`)
       }

  return (
    <BoxContainer>
      <NavBar />
      <Form onSubmit={handleSearch}>
    <StyledContainer>
    <Grid container spacing={1}>
    <Grid item lg={5} md={7} sm={9} xs={12}>
    <FormControl  sx={{ width: '100%'}}>
    <TextField  id="City" size="medium" label="Location, Estate or Building" variant="outlined" name='search' value={searchData.search} onChange={handleChange} />
    </FormControl>
    </Grid>
    <Grid item lg={1.2} md={2.5} sm={3} xs={6}>
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
          <MenuItem value='hotel apartment'>Hotel Apartment</MenuItem>
          <MenuItem value='room'>Room</MenuItem>
          <MenuItem value='shop'>Shop</MenuItem>
          <MenuItem value='werehouse'>WareHouse</MenuItem>
          <MenuItem value='mini flat'>Mini Flat</MenuItem>
          <MenuItem value='self contain'>Self Contain</MenuItem>
          <MenuItem value='detached'>Detached</MenuItem>
          <MenuItem value='semi detached'>Semi Detached</MenuItem>
          <MenuItem value='full floor'>Full floor</MenuItem>
          <MenuItem value='whole building'>Whole Building</MenuItem>
          <MenuItem value='industrial'>Industrial</MenuItem>
          <MenuItem value='retail'>Retail</MenuItem>
          <MenuItem value='others'>Others</MenuItem>
        </Select>
        </FormControl>
        </Grid>
        <Grid item lg={0.93} md={2.5} sm={4} xs={6}>
         <FormControl sx={{width: '100%'}} size="medium">
    <InputLabel id="demo-simple-select-autowidth-label">Min-Beds</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name='bed'
          value={searchData.minBed}
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
    <InputLabel id="demo-simple-select-autowidth-label">Max-Beds</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name='bath'
          value={searchData.maxBed}
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
        <Grid item lg={1.2} md={2} sm={4} xs={6}>
         <FormControl sx={{width: '100%'}} size="medium">
    <InputLabel id="demo-simple-select-autowidth-label">Possession date</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name='possession'
          value={searchData.possession}
          label='Possession date'
          autoWidth
          onChange={handleChange}
        >
          <MenuItem value='completed'>Completed</MenuItem>
          <MenuItem value='from-2022'>From 2022</MenuItem>
          <MenuItem value='from-2023'>From 2023</MenuItem>
          <MenuItem value='from-2024'>From 2024</MenuItem>
          <MenuItem value='from-2025'>From 2025</MenuItem>
          <MenuItem value='from-2026'>From 2026</MenuItem>
          <MenuItem value='from-2027'>From 2027</MenuItem>
          <MenuItem value='from-2028'>From 2028</MenuItem>
          <MenuItem value='from-2029'>From 2029</MenuItem>
          <MenuItem value='from-2030'>From 2030</MenuItem>
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
        </Grid>
        <Grid item lg={0.6} md={2} sm={4} xs={12}>
        <StyledButton type='button' variant="contained" onClick={handleSearch}><strong>Find</strong></StyledButton>
        </Grid>
        </Grid>
    </StyledContainer>
    </Form>
    <StyledContainer>
     {/* @ts-ignore:next-line */}
     { data?.data.length < 1 ? <Alert style={{marginTop: '10px'}} severity="info">No data found!</Alert> : ''}
     </StyledContainer>
     <StyledContainer>
    <Grid container>
        <Grid item lg={2} md={3} sm={40} xs={12}>
          <FormControl sx={{ marginLeft: '3px', minWidth: 90, marginTop: 2, marginBottom: 2 }} size="small">
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
        </StyledContainer>
    <StyledBox>
        {/* @ts-ignore:next-line */}
        { data?.data && isFetching ?
            <>
         <Grid container spacing={2} rowGap={2} style={{marginTop: 10}}>
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
      {offplan?.data?.map((result: any) => (
          <StyledGrid container key={result._id}>
         <CardImg  item lg={4} xs={12} md={3.5} sm={4}>
         <Tooltip title={`Anton Estate is Developed by ${result.companyName}.`} placement="top-start" arrow>
         <Img src={result.images[0].img} />
         </Tooltip>
    <VerifyContainer>
    <VerifySvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></VerifySvg>
    <Verify>VERIFIED</Verify>
    </VerifyContainer>
    </CardImg>  
    <CardDetails item lg={5} xs={12} md={5.5} sm={8}>
    <StyledLink to={`/offplanDetailsPage/${result._id}`}>
    <LeftContainer>
   <DeveloperContainer>
    <Developer>{result.developer}</Developer><PropertyStatus>{result.buildingYear  <= new Date() ? 'Completed'.toUpperCase() : 'Under Construction'.toUpperCase() }</PropertyStatus>
    </DeveloperContainer>
    <PropertyNameContainer>
    <PropertyName>{result.propertyName}</PropertyName>
    </PropertyNameContainer>
    <AddressContainer >
    <LocateSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></LocateSvg>
      <Address>{result.address1}</Address>
    </AddressContainer>
    <Bed>1 to {result.bedroom} bedrooms</Bed>
     <Price>{result.price.toLocaleString()} NGN</Price>
    </LeftContainer>
    <RightContainer>
    <Featured>FEATURED</Featured>
      <Premium></Premium>
    <LogoImg src={result.logo} />
<LearnmoreContainer>
<Learnmore>Learn more</Learnmore>
</LearnmoreContainer>
    </RightContainer>
    </StyledLink>
    </CardDetails>
    </StyledGrid>
     ))}
     </>
      }
        <Paper elevation={2} sx={{ background: 'inherit', marginTop: 2, marginBottom: 2, display: 'flex', justifyContent: 'center'}}>
        <OffplanPaginate page={page} />
        </Paper>
    </StyledBox>
      <Footer />
    </BoxContainer>
  )
}

export default Offplan