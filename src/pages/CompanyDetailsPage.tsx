import React, {useState} from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Grid from '@mui/material/Grid';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const StyledBox = styled(Box)`
`
const StyledContainer = styled(Container)`
margin-top: 20px;
margin-bottom: 20px;
`
const Companylogo = styled.img`
width: 100%;
`
const LogoContainer = styled.div`
display: flex;
justify-content: start;
`
const CompanyName = styled.h4`
text-align: start;
color: #383838;
`
const NumOfStaff = styled.p`
text-align: start;
color: #494949;
color: #494949;
`
const Listing = styled.p`
text-align: start;
color: #494949;
`
const Contact = styled.h3`
text-align: start;
color: #383838;
`
const CallBroker = styled.button`
width: 100%;
height: 40px;
margin-bottom: 5px;
font-size: 1.2rem;
font-family: bold;
color: #ffffff;
background-color: #008080;
border: none;
outlined: none;
cursor: pointer;
`
const EmailBroker = styled.button`
width: 100%;
height: 40px;
font-size: 1.2rem;
font-family: bold;
color: #ffffff;
background-color: #008080;
border: none;
outlined: none;
cursor: pointer;
`
const BrokerDetailContainer = styled.div`

`
const About = styled.h4`
text-align: start;
color: #383838;
`
const Address = styled.p`
text-align: start;
color: #494949;
`
const Details = styled.p`
text-align: start;
color: #494949;
`
const A = styled.a`
text-align: start;
text-decoration: none;
margin-left: 30px;
font-size: 0.9rem;
`
const A1 = styled.a`
text-align: start;
text-decoration: none;
margin-left: 68px;
font-size: 0.9rem;
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
justify-content: space-between;
border: 1px solid  #A9A9A9;
:hover{
  background: #ffffff;;
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
  background: #ffffff;
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
  background: #ffffff;;
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
  background: #ffffff;;
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
const ContainerGrid = styled(Grid)`
margin-top: 20px;
`
const AgentList = styled.button`
width: 100%;
height: 50px;
font-size: 1.2rem;
outlined: none;
cursor: pointer;
border: 2px solid #008080;
`
const PropertyList = styled.button`
width: 100%;
height: 50px;
font-size: 1.2rem;
outlined: none;
cursor: pointer;
border: 2px solid #008080;

`
const SortContainer = styled.div`
display: flex;
justify-content: space-between;
margin: 25px 0;
@media screen and (max-width: 900px) {
  justify-content: start;
  flex-wrap: wrap;
}
`
const SortRightContainer = styled.div`

`
const Total = styled.p`

`
const SortLeftContainer = styled.div`
 display: flex;
 align-items: center;
`
const Sort = styled.p`
margin-right: 10px;
` 
const InfoContainer = styled.div`
display: flex;
justify-content: space-between;
border: 0.5px solid #f1f1f1;
height: 220px;
`
const AgentInfoContainer = styled.div`
@media screen and (min-width: 900px) {
  margin-left: 15px;
}
`
const AgentImg = styled.img`
width: 100%;
height: 220px;
`
const AgentName = styled.p`
text-align: start;
`
const Position = styled.p`
text-align: start;
`
const AgentCompanyName = styled.p`
text-align: start;
`
const ButtonContainer = styled.div`
margin-top: 30px;
display: flex;
justify-content: start;
`
const CallAgent = styled.button`
margin-left: 0;
width: 70px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
margin-right: 10px;
border-radius: 5px;
border: 0.5px solid #494949;
background: #ffffff;
color: #494949;
cursor: pointer;
`
const EmailAgent = styled.button`
width: 70px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 5px;
outlined: none;
cursor: pointer;
border: 0.5px solid #494949;
background: #ffffff;
color: #494949;
`
const AgentCompanyLogoContainer = styled.div`

`
const AgentCompanyLogo = styled.img`
width: 100px;
margin-right: 10px;
`
const Strong = styled.strong`
margin-left: 30px;
`
const Svg3 =styled.svg`
width: 13px;
fill: #ffffff;
margin-right: 5px;
`
const Svg4 =styled.svg`
width: 13px;
fill: #008080;
margin-right: 5px;
`


function CompanyDetailsPage() {
    
  const [sort, setSort] = useState('');
  const [view, setView] = useState(false)
  const [view1, setView1] = useState(false)

  const handleSort = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const handleView = () => {
    setView(!view);
    setView1(!view1);
  }
  const handleView1 = () => {
    
    setView1(!view1);
    setView(!view);
  }

  return (
    <StyledBox>
        <NavBar />
    <StyledContainer>
      <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
          <Grid container>
          <Grid lg={4} md={4} sm={12} xs={12}>
          <LogoContainer>
          <Companylogo src='../images/reallogo4.jpg' />
          </LogoContainer>
         </Grid>
         <Grid lg={8} md={8} sm={12} xs={12}>
          <CompanyName>ANTON BROKERAGE</CompanyName>
          <NumOfStaff>EMPLOYEES: <A1 href='/agent'>8 Agents</A1></NumOfStaff>
          <Listing>ACTIVE LISTINGS: <A href='/properties'>38 Properties</A></Listing>
         </Grid>
         </Grid>
         </Grid>
         <Grid item lg={4} md={4} sm={12} xs={12}>
          <Contact>CONTACT THIS BROKER</Contact>
          <CallBroker type='button'><Svg3 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" /></Svg3>CAll broker</CallBroker>
          <EmailBroker type='button'><Svg3 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z" /></Svg3>Email broker</EmailBroker>
         </Grid>
         </Grid>
         <Grid container>
        <Grid item lg={8} md={8} sm={12} xs={12}>
         <BrokerDetailContainer>
          <About>ABOUT ANTON BROKERAGE</About>
          <Address><em> 1220 amadu bello way victoria island, Lagos state</em></Address>
          <Details>
          Edifice Brokerage is a full service Dubai-based real estate company that prides itself on its integrity when matching people to property.

           An 'edifice' is a large imposing building, or a complex system of beliefs, or in our case both. Edifice Brokerage was founded on a simple set of values and prides itself on its integrity when matchmaking people and property.
          </Details>
         </BrokerDetailContainer>
         </Grid>
         </Grid>
         <ContainerGrid container>
        <Grid item lg={4} md={4} sm={6} xs={6}>
        <AgentList type='button' style={{  backgroundColor: view1 ? '#008080': '', color: view1 ? 'white': ''   }} onClick={handleView1}>Our agents (8)</AgentList>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={6}>
        <PropertyList type='button' style={{ backgroundColor: !view ? '#008080': '', color: !view ? 'white': ''   }} onClick={handleView}>Our properties (12)</PropertyList>
        </Grid>
        </ContainerGrid>
        <SortContainer>
        <SortLeftContainer>
        <Sort>Sort by</Sort>
        <FormControl sx={{  minWidth: 150, }} size="small">
        <InputLabel id="demo-simple-select-autowidth-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={sort}
              label='select'
              autoWidth
              onChange={handleSort}
            >
              <MenuItem value='Featured'>Featured</MenuItem>
              <MenuItem value='Newest'>Newest</MenuItem>
              <MenuItem value='Price low'>Price(low)</MenuItem>
              <MenuItem value='Price high'>Price(high)</MenuItem>
              <MenuItem value='beds least'>Beds(least)</MenuItem>
              <MenuItem value='beds most'>Beds(most)</MenuItem>
            </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 150, }} size="small">
            <InputLabel id="demo-simple-select-autowidth-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={sort}
                  label='select'
                  autoWidth
                  onChange={handleSort}
                >
                  <MenuItem value='all'>All</MenuItem>
                  <MenuItem value='for sale'>For sale</MenuItem>
                  <MenuItem value='for rent'>For rent</MenuItem>
                  <MenuItem value='commercial sale'>Commercial sale</MenuItem>
                  <MenuItem value='commercial rent'>Commercial rent</MenuItem>
                </Select>
                </FormControl>
        </SortLeftContainer>
        <SortRightContainer>
        <Total>Total properties: 12</Total>
        </SortRightContainer>
        </SortContainer>
         { !view ?
        <StyledGrid container>
        <CardImg  item lg={3} xs={12} md={3} sm={12}>
       <Splide
       options={ {
      perPage: 1,
       rewind: true,
       gap   : 0,
       width: 'cover',
 
       
     } }
     aria-label="My Favorite Images"
   >
     <SplideSlide>
       <Img src="../images/pexels1.jpg" alt="Image 1"/>
     </SplideSlide>
     <SplideSlide>
       <Img src="../images/pexels2.jpg" alt="Image 2"/>
     </SplideSlide>
     <SplideSlide>
       <Img src="../images/pexels3.jpg" alt="Image 3"/>
     </SplideSlide>
   </Splide>
   <VerifyContainer>
   <VerifySvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></VerifySvg>
   <Verify>VERIFIED</Verify>
   </VerifyContainer>
   <Tooltip title="Video tours are pre-recorded video walk-throughs of the property avaialble at all times" placement="top-start" arrow>
   <VideoContainer>
   <Video xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M188.3 147.1C195.8 142.8 205.1 142.1 212.5 147.5L356.5 235.5C363.6 239.9 368 247.6 368 256C368 264.4 363.6 272.1 356.5 276.5L212.5 364.5C205.1 369 195.8 369.2 188.3 364.9C180.7 360.7 176 352.7 176 344V167.1C176 159.3 180.7 151.3 188.3 147.1V147.1zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></Video>
   </VideoContainer>
   </Tooltip>
   <Tooltip title="360 Tours offer you static panoramic view of the property." placement="top-start" arrow>
   <ImgContainer>
   <WebImg src='../images/icon-360.svg'  />
   </ImgContainer>
   </Tooltip>
   </CardImg>
   
   <CardDetails item lg={6} xs={12} md={6} sm={12}>
   <LeftContainer>
   <Price>50,000,000 NGN</Price>
   <Para>Corner Big Unit | Sea View | Lowest Price</Para>
   <BedBathContainer>
   <Apart>Apartment</Apart>
   <Bed><BedBathSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M176 288C220.1 288 256 252.1 256 208S220.1 128 176 128S96 163.9 96 208S131.9 288 176 288zM544 128H304C295.2 128 288 135.2 288 144V320H64V48C64 39.16 56.84 32 48 32h-32C7.163 32 0 39.16 0 48v416C0 472.8 7.163 480 16 480h32C56.84 480 64 472.8 64 464V416h512v48c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16V224C640 170.1 597 128 544 128z"/></BedBathSvg>3</Bed>
   <Bath><BedBathSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M32 384c0 28.32 12.49 53.52 32 71.09V496C64 504.8 71.16 512 80 512h32C120.8 512 128 504.8 128 496v-15.1h256V496c0 8.836 7.164 16 16 16h32c8.836 0 16-7.164 16-16v-40.9c19.51-17.57 32-42.77 32-71.09V352H32V384zM496 256H96V77.25C95.97 66.45 111 60.23 118.6 67.88L132.4 81.66C123.6 108.6 129.4 134.5 144.2 153.2C137.9 159.5 137.8 169.8 144 176l11.31 11.31c6.248 6.248 16.38 6.248 22.63 0l105.4-105.4c6.248-6.248 6.248-16.38 0-22.63l-11.31-11.31c-6.248-6.248-16.38-6.248-22.63 0C230.7 33.26 204.7 27.55 177.7 36.41L163.9 22.64C149.5 8.25 129.6 0 109.3 0C66.66 0 32 34.66 32 77.25v178.8L16 256C7.164 256 0 263.2 0 272v32C0 312.8 7.164 320 16 320h480c8.836 0 16-7.164 16-16v-32C512 263.2 504.8 256 496 256z"/></BedBathSvg>4</Bath>
   <Area>4,150 sqft</Area>
   </BedBathContainer>
   <DetailContainer >
   <LocateSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></LocateSvg>
     <Detail>Pactum Towers, Ahmadu Bello Way, VI</Detail>
   </DetailContainer>
   </LeftContainer>
   <RightContainer>
   <Featured>FEATURED</Featured>
     <Premium>PREMIUM</Premium>
   <LogoImg src="../images/reallogo3.jpg" alt="Image 2" />
   </RightContainer>
   </CardDetails>
   <BottomContainer>
   <CallContainer>
   <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"/></Svg>
     <Call>Call</Call>
   </CallContainer>
   <EmailContainer>
   <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z"/></Svg>
     <Email>Email</Email>
   </EmailContainer>
   <WhatsAppContainer>
   <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></Svg>
     <WhatsApp>WhatsApp</WhatsApp>
   </WhatsAppContainer>
   </BottomContainer>
   <BottomContainer1>
   <CallContainer>
   <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"/></Svg>
     <Call>Call</Call>
   </CallContainer>
   <EmailContainer>
   <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z"/></Svg>
     <Email>Email</Email>
   </EmailContainer>
   <WhatsAppContainer>
   <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></Svg>
     <WhatsApp>WhatsApp</WhatsApp>
   </WhatsAppContainer>
   </BottomContainer1>
   </StyledGrid> : ''
     }
     { view ?
      <Grid container>
      <Grid lg={12} md={12} sm={12} xs={12}>
        <Grid container>
          <Grid lg={3} md={3} sm={12} xs={12}>
          <AgentImg src='../images/agent1.jpg' />
          </Grid>
          <Grid lg={9} md={9} sm={12} xs={12}>
          <InfoContainer>
            <AgentInfoContainer>
              <AgentName>Simire Michael</AgentName>
              <Position>Property consultant</Position>
              <AgentCompanyName>Company <Strong>Anton Brokerage</Strong></AgentCompanyName>
              <ButtonContainer>
              <CallAgent><Svg4 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" /></Svg4>Call</CallAgent>
              <EmailAgent><Svg4 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z" /></Svg4>Email</EmailAgent>
              </ButtonContainer>
             </AgentInfoContainer>
             <AgentCompanyLogoContainer>
              <AgentCompanyLogo src='../images/reallogo4.jpg' />
             </AgentCompanyLogoContainer>
          </InfoContainer>
          </Grid>
        </Grid>
      </Grid>
      </Grid>
      : ''
     }
    </StyledContainer>
    <Footer />
    </StyledBox>
  )
}

export default CompanyDetailsPage;