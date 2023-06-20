import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NavBar from '../components/NavBar';
import Avatar from '@mui/material/Avatar';
import Footer from '../components/Footer';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Link, useParams } from "react-router-dom";
import { useGetPropertiesQuery, useGetPropertyQuery, useMorePropertyQuery } from '../services/api/propertyAPI';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCurrentPropertyDetail, setPropertyDetail } from '../services/features/propertyDetailSlice';
import { selectCurrentMoreProperty, setMoreProperty } from '../services/features/morePropertySlice';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import '@splidejs/splide/dist/css/splide.min.css';
import MapDL, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const StyledBox = styled(Box)`
width: 100%;
`
const StyledContainer = styled(Container)`
margin-top: 20px;
margin-bottom: 20px;

`
const StyledGrid = styled(Grid)`
display: flex;
margin: 30px 0;
`
const ListImg1 = styled.img`
height: 100%;
width: 100%;
`
const ListDiv = styled.div`
height: 215px;
width: 100%;
@media screen and (max-width: 900px) {
  height: 150px;
}
`
const ListDiv1 = styled.div`
height: 440px;
width: 100%;
@media screen and (max-width: 900px) {
  height: 310px;
}
`
const SGrid = styled(Grid)`

`
const CameraContainer = styled.div`
background-color: #ffffff;
display: flex;
margin: -60px 0 0 30px;
position: absolute;
padding: 0 8px;
border-radius: 10px;
max-height: 40px;
align-items: center;
justify-content: center;
cursor: pointer;
`
const Camera = styled.p`
font-size: 1.8vmin;
color: #494949;
`
const MapContainer = styled.div`
background-color: #ffffff;
display: flex;
margin: -60px 0 0 160px;
position: absolute;
padding: 0 8px;
border-radius: 10px;
max-height: 40px;
align-items: center;
justify-content: center;
cursor: pointer;
`
const Map = styled.p`
font-size: 1.8vmin;
color: #494949;
`
const TourContainer = styled.div`
background-color: #ffffff;
display: flex;
margin: -60px 0 0 30px;
position: absolute;
padding: 0 8px;
border-radius: 10px;
max-height: 40px;
align-items: center;
justify-content: center;
z-index: 1001;
cursor: pointer;
`
const Tour = styled.p`
font-size: 1.8vmin;
color: #494949;
`
const VideoContainer = styled.div`
background-color: #ffffff;
display: flex;
margin: -60px 0 0 30px;
position: absolute;
padding: 0 8px;
border-radius: 10px;
max-height: 40px;
align-items: center;
justify-content: center;
z-index: 1001;
cursor: pointer;
`
const Video = styled.p`
font-size: 1.8vmin;
color: #494949;
`
const Svg = styled.svg`
width: 11px;
margin-right: 5px;
`
const ImgView = styled.img`
width: 23px;
margin-right: 5px;
`

const LeftContainer = styled(Grid)`

`
const RightContainer = styled(Grid)`

`
const About = styled.p`
text-align: start;
color: #494949;
font-size: 1.1rem;
display: block;
`
const PropertyInfo = styled.h2`
text-align: start;
margin-top: 5px;
color: #383838;
`
const Apart = styled.p`
text-align: start;
color: #494949;

`
const Bed = styled.p`
text-align: start;
color: #494949;
`
const Size = styled.p`
text-align: start;
color: #494949;
`
const Bath = styled.p`
text-align: start;
color: #494949;
`
const GridPrice = styled(Grid)`
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

` 
const ContactTopContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 0 10px;
` 
const ContactBottomContainer = styled.div`

`
const Price = styled.h2`
text-align: center;
color: #383838;
`
const CallContainer = styled.div`
background-color: #008080;
padding: 0 10px;
margin: 5px;
border-radius: 5px;
display: flex;
cursor: pointer;
`
const Call = styled.p`
color: #ffffff;
`
const EmailContainer = styled.div`
background-color: #008080;
padding: 0 10px;
margin: 5px;
border-radius: 5px;
display: flex;
cursor: pointer;
`
const Email = styled.p`
color: #ffffff;
`
const WhatsAppContainer = styled.div`
background-color: #32CD32;
padding: 0 10px;
margin: 5px;
border-radius: 5px;
display: flex;
cursor: pointer;
`
const WhatsApp = styled.p`
color: #ffffff;
`

const VerifyContainer = styled.div`
display: flex;

`
const Top = styled.div`

`
const Bottom = styled.div`

`
const Verify = styled.h6`
background-color: #2E8B57;
margin-right: 18px;
height: 16px;
display: flex;
color:#ffffff;
padding: 0 6px;
border-radius: 2px;
`
const VerifyInfo = styled.p`
text-align: start;
margin-right: 10px;
color: #494949;
`
const SaveContainer = styled.div`
border: 0.5px solid gray;
margin: 0 25% 20px;
height: 40px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
`
const Save = styled.p`
color: #494949;
`
const VerifySvg = styled.svg`
width: 10px;
fill: #ffffff;
margin: 0 5px 0 0;
`
const Svg3 = styled.svg`
fill: #ffffff;
width: 15px;
margin-right: 10px;
`
const SaveSvg = styled.svg`
width: 15px;
fill:  #494949;
margin-right: 10px;
`
const Apsvg = styled.svg`
width: 20px;
fill:  #494949;
margin-right: 10px;
`
const Location = styled.h3`
text-align: start;
color: #383838;
`
const LocationAddress = styled.p`
text-align: start;
color: #494949;
`
const Agent = styled.h3`
text-align: start;
color: #383838;
`
const AgentName= styled.p`
text-align: start;
font-size: 1.2rem;
color: #4169E1;
`
const AgentWork = styled.p`
text-align: start;
margin: 0;
padding: 0;
color: #494949;
`
const AgentCompany = styled.p`
text-align: start;
margin: 0;
padding: 0;
color: #494949;
`
const AgentProperty = styled.p`
text-align: start;
color: #4169E1;
margin: 0;
padding: 0;
cursor: pointer;
`
const AmenitiesTitle = styled.h3`
text-align: start;
color: #383838;
margin-top: 50px;
`
const Amenities = styled.p`
text-align: start;
margin: 0;
padding: 0;
color: #494949;
`
const Description = styled.p`
text-align: start;
margin: 0;
padding: 0;
color: #494949;
`
const DescriptionTitle = styled.h3`
text-align: start;
color: #383838;
margin-top: 50px;
`
const Plink = styled.p`
  text-align: start;
  width: 120px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  `
  const StyledPlink = styled(Link)`
  text-decoration: none;
  color: #4169E1;
  :hover {
    text-decoration: underline;
  }
  `
  const Psvg = styled.svg`
width: 7px;
fill:  #494949;
margin-right: 5px;
`
const Apartst = styled.strong`
@media screen and (min-width: 900px) {
  margin-left: 30px;
}
`
const Bedst = styled.strong`
margin-left: 25px;
@media screen and (min-width: 900px) {
  margin-left: 52px;
}
`
const Bathst = styled.strong`
margin-left: 15px;
@media screen and (min-width: 900px) {
  margin-left: 36px;
}
`
const Sizest = styled.strong`
@media screen and (min-width: 900px) {
  margin-left: 20px;
}
`
const MoreTitle = styled.h2`
margin: 10px 0;
color: #383838;
text-align: start;
`
const StyledMoreContainer = styled.div`
margin: 30px 0;
`
const MoreContainer = styled.div`
display: flex;
overflow-y: hidden;
overflow-x: auto;
`
const CardGrid = styled.div`
display: flex;
justify-content: start;
`
const MoreCard = styled.div`
height: 250px;
margin: 10px 10px 10px 0;
width: 180px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
const MoreTopContainer = styled.div`
height: 50%;
background-size: 100% 100%;
`
const MoreTopImg = styled.img`
width: 100%;height: 100%;
`
const MoreBottomContainer = styled.div`
height: 50%;
margin: 5px;
`
const MoreApart = styled.p`
text-align: start;
color: #494949;
margin: 0 0 5px 0;
font-size: 0.8rem;
`
const MorePrice = styled.p`
text-align: start;
color: #494949;
margin: 0 0 5px 0;
`
const MoreAddress = styled.p`
text-align: start;
color: #494949;
margin: 0 0 5px 0;
font-size: 0.75rem;
`
const BottomInner = styled.div`
display: flex;
`
const InnerBed = styled.p`
text-align: start;
margin-right: 7px;
color: #494949;
font-size: 0.75rem;
margin-top: 0;
`
const InnerBath = styled.p`
text-align: start;
color: #494949;
margin-right: 7px;
font-size: 0.75rem;
margin-top: 0;
`
const InnerSize = styled.p`
text-align: start;
margin-right: 7px;
color: #494949;
font-size: 0.75rem;
margin-top: 0;
`
const Moresvg = styled.svg`
width: 12px;
fill:  #494949;
margin-right: 3px;
`
const VideoPlayer = styled.iframe`
width: 100%;
height: 100%;
`
const AmenitiesDiv = styled.div`

`
const StyledLink = styled(Link)`
 text-decoration: none;
  color: #494949;
  width: 100%;
  height: 100%;
 `
 const ViewDiv = styled.div`
 position: absolute;
 width: 100%;
 max-height: 100vh;
 z-index: 10001;
 margin-top: -78px;
 background: rgba( 255, 255, 255, 0.1 );
backdrop-filter: blur( 10px );
 `
 const ViewImgContainer = styled.div`
 margin: 2% 3%;
 width: auto;
 height: 90%;
 `
 const ViewImg = styled.img`
 width: 100%;
 height: 100%;
 border-radius: 10px;
 `
 const MapCintainer = styled.div`
 position: absolute;
 z-index: 20001;
 width: 100vw;
 height: 100vh;
 background-color: #f5f5f5;
 `
const MapBtn = styled.button`
position: absolute;
z-index: 30003;
margin: 20px 0 0 30px;
background: rgba( 255, 255, 255, 1 );
backdrop-filter: blur( 4px );
border-radius: 5px;
border: 1px solid rgba( 255, 255, 255, 1 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
cursor: pointer;
`
const Links = styled(Link)`
text-decoration: none;
`

function DetailsPage() {

  const [viewImage, setViewImage] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [more, setMore] = useState({ location: '', price: '', propertyType: '', bedroom: '', category: ''});
  const dispatch = useAppDispatch();
  let { propertyId } = useParams();
  const { data} = useGetPropertyQuery(propertyId, {refetchOnMountOrArgChange: true }); 
  const {data: totalData} = useGetPropertiesQuery();
  const location = more.location
  const price = more.price
  const propertyType = more.propertyType
  const bedroom = more.bedroom
  const category = more.category
    const {data: moreProperty} = useMorePropertyQuery({location, price, propertyType, bedroom, category}, {refetchOnMountOrArgChange: true })
  useEffect(() => {
   dispatch(setPropertyDetail({propertyDetail: data}))
  }, [dispatch, data])

  const {propertyDetail} = useAppSelector(selectCurrentPropertyDetail);
   {/* @ts-ignore:next-line */}
  const img = propertyDetail?.images[0].img

  useEffect(() => {
    {/* @ts-ignore:next-line */}
  setMore({...more, location: propertyDetail?.location, price: propertyDetail?.price, bedroom: propertyDetail?.bedroom, propertyType: propertyDetail?.propertyType, category: propertyDetail?.category}, {refetchOnMountOrArgChange: true });
  }, [setMore, propertyDetail]);

  const {moreProperty: available} = useAppSelector(selectCurrentMoreProperty);
  
  useEffect(() => {
    dispatch(setMoreProperty({moreProperty: moreProperty}))
  },[dispatch, moreProperty])
  
  const initial = { longitude: data?.longitude,  latitude: data?.latitude, zoom: 14}
  const [viewState, setViewState] = useState(initial)
  

  return (
    <StyledBox>
        <NavBar />
        {openMap && (
        <MapCintainer>
          <MapBtn onClick={() => setOpenMap(false)}><CloseOutlinedIcon sx={{color: '#383838'}} /></MapBtn>
        <MapDL
     {...viewState}
    style={{width: '100vw', 
    height: '100vh',
     
     }}
     mapStyle="mapbox://styles/simiremichael/clcz22d6e00l814qni4m9qxaq"
    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onMove={((evt: any) => setViewState(evt))}
    >
   
    <Marker longitude={data?.longitude} latitude={data?.latitude} anchor="bottom"  >
    <LocationOnOutlinedIcon sx={{color: '#008080', fontSize: 40}}/>
    {/* <Img src={img} /> */}
    </Marker>
    </MapDL>
        </MapCintainer>
          )}
        {viewImage && ( 
        <ViewDiv>
        <CloseOutlinedIcon style={{zIndex: 10001, cursor: 'pointer', marginLeft: '94%', marginTop: 5 }} onClick={() => setViewImage(false)}/>
        <ViewImgContainer>
        <Splide
        options={ {
          rewind: false,
          width : '100%',
          height: '100vh',
        } }
      >
          {/* @ts-ignore:next-line */}
        {propertyDetail?.images?.map((img: any) => (
  <SplideSlide>
    <ViewImg src={img.img}/>
  </SplideSlide>
  ))}
</Splide>
        </ViewImgContainer>
        </ViewDiv>
        )}
      <StyledContainer>
        <StyledPlink to='/'><Plink><Psvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" /></Psvg>Back to search</Plink></StyledPlink>
        <StyledGrid container columnSpacing={0.5}>
          <Grid item lg={8} sm={8} md={8} xs={12}>
            <ListDiv1>
            <ListImg1 src={img} />
            </ListDiv1>
            <CameraContainer onClick={() => setViewImage(true)}>
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H194.6zM256 384C309 384 352 341 352 288C352 234.1 309 192 256 192C202.1 192 160 234.1 160 288C160 341 202.1 384 256 384z" /></Svg>
              <Camera>Show {propertyDetail?.images.length} photos</Camera>
            </CameraContainer>
            <MapContainer onClick={() => setOpenMap(!openMap)}>
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" /></Svg>
              <Map>View on map</Map>
            </MapContainer>
          </Grid>
          <SGrid item lg={4} sm={4} md={4} xs={12}>
            <Grid container spacing={1}>
              <Grid item lg={12} sm={12} md={12} xs={6}>
          <ListDiv>
          <VideoPlayer  src={propertyDetail?.tour} allowFullScreen  />
          </ListDiv>
            <TourContainer>
              <ImgView src='../images/img-360.png' />
              <Tour>View 360 tour</Tour>
            </TourContainer>
            </Grid>
            <Grid item lg={12} sm={12} md={12} xs={6}>
            <ListDiv>
             <VideoPlayer src={propertyDetail?.video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen  />
             </ListDiv>
            <VideoContainer>
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M188.3 147.1C195.8 142.8 205.1 142.1 212.5 147.5L356.5 235.5C363.6 239.9 368 247.6 368 256C368 264.4 363.6 272.1 356.5 276.5L212.5 364.5C205.1 369 195.8 369.2 188.3 364.9C180.7 360.7 176 352.7 176 344V167.1C176 159.3 180.7 151.3 188.3 147.1V147.1zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" /></Svg>
              <Video>Watch video tour</Video>
            </VideoContainer>
            </Grid>
            </Grid>
          </SGrid>
        </StyledGrid>
        <Grid container>
          <Grid item lg={8} sm={12} md={8} xs={12}>
            <About>{propertyDetail?.location.toUpperCase()}</About>
            <PropertyInfo>{propertyDetail?.propertyTitle}</PropertyInfo>
            <Grid container>
              <LeftContainer item lg={6} sm={6} md={6} xs={6}>
                {/* @ts-ignore:next-line */}
                <Apart><Apsvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M88 104C88 95.16 95.16 88 104 88H152C160.8 88 168 95.16 168 104V152C168 160.8 160.8 168 152 168H104C95.16 168 88 160.8 88 152V104zM280 88C288.8 88 296 95.16 296 104V152C296 160.8 288.8 168 280 168H232C223.2 168 216 160.8 216 152V104C216 95.16 223.2 88 232 88H280zM88 232C88 223.2 95.16 216 104 216H152C160.8 216 168 223.2 168 232V280C168 288.8 160.8 296 152 296H104C95.16 296 88 288.8 88 280V232zM280 216C288.8 216 296 223.2 296 232V280C296 288.8 288.8 296 280 296H232C223.2 296 216 288.8 216 280V232C216 223.2 223.2 216 232 216H280zM0 64C0 28.65 28.65 0 64 0H320C355.3 0 384 28.65 384 64V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM48 64V448C48 456.8 55.16 464 64 464H144V400C144 373.5 165.5 352 192 352C218.5 352 240 373.5 240 400V464H320C328.8 464 336 456.8 336 448V64C336 55.16 328.8 48 320 48H64C55.16 48 48 55.16 48 64z" /></Apsvg>Property type: <Apartst>{propertyDetail?.propertyType.charAt(0).toUpperCase() + propertyDetail?.propertyType.slice(1)}</Apartst></Apart>
                <Bed><Apsvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M176 288C220.1 288 256 252.1 256 208S220.1 128 176 128S96 163.9 96 208S131.9 288 176 288zM544 128H304C295.2 128 288 135.2 288 144V320H64V48C64 39.16 56.84 32 48 32h-32C7.163 32 0 39.16 0 48v416C0 472.8 7.163 480 16 480h32C56.84 480 64 472.8 64 464V416h512v48c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16V224C640 170.1 597 128 544 128z" /></Apsvg>Bedrooms: <Bedst>{propertyDetail?.bedroom}</Bedst></Bed>
              </LeftContainer>
              <RightContainer item lg={6} sm={6} md={6} xs={6}>
                <Size><Apsvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM488 0H352c-12.94 0-24.62 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.88L370.8 96L169.4 297.4c-12.5 12.5-12.5 32.75 0 45.25C175.6 348.9 183.8 352 192 352s16.38-3.125 22.62-9.375L416 141.3l41.38 41.38c9.156 9.141 22.88 11.84 34.88 6.938C504.2 184.6 512 172.9 512 160V24C512 10.74 501.3 0 488 0z" /></Apsvg>Property Size: <Sizest>{propertyDetail?.size.toLocaleString()} sqt </Sizest></Size>
                <Bath><Apsvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M32 384c0 28.32 12.49 53.52 32 71.09V496C64 504.8 71.16 512 80 512h32C120.8 512 128 504.8 128 496v-15.1h256V496c0 8.836 7.164 16 16 16h32c8.836 0 16-7.164 16-16v-40.9c19.51-17.57 32-42.77 32-71.09V352H32V384zM496 256H96V77.25C95.97 66.45 111 60.23 118.6 67.88L132.4 81.66C123.6 108.6 129.4 134.5 144.2 153.2C137.9 159.5 137.8 169.8 144 176l11.31 11.31c6.248 6.248 16.38 6.248 22.63 0l105.4-105.4c6.248-6.248 6.248-16.38 0-22.63l-11.31-11.31c-6.248-6.248-16.38-6.248-22.63 0C230.7 33.26 204.7 27.55 177.7 36.41L163.9 22.64C149.5 8.25 129.6 0 109.3 0C66.66 0 32 34.66 32 77.25v178.8L16 256C7.164 256 0 263.2 0 272v32C0 312.8 7.164 320 16 320h480c8.836 0 16-7.164 16-16v-32C512 263.2 504.8 256 496 256z" /></Apsvg>Bathrooms: <Bathst>{propertyDetail?.bathroom}</Bathst></Bath>
              </RightContainer>
            </Grid>
          </Grid>

          <GridPrice item lg={4} sm={12} md={4} xs={12}>
            <Price>{propertyDetail?.price.toLocaleString()} NGN / yearly</Price>
            <ContactTopContainer>
            <Links to={`tel:${propertyDetail?.phone}`}>
              <CallContainer>
                <Svg3 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" /></Svg3>
                <Call><strong>CALL</strong></Call>
              </CallContainer>
              </Links>
              <Links to={`mailto:${propertyDetail?.email}`}>
              <EmailContainer>
                <Svg3 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z" /></Svg3>
                <Email><strong>Email</strong></Email>
              </EmailContainer>
              </Links>
              <Links to={`https://wa.me/+234${propertyDetail?.phone}?text=I'm%20inquiring%20about%20the%20apartment%20listing`}>
              <WhatsAppContainer>
                <Svg3 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></Svg3>
                <WhatsApp><strong>WhatsApp</strong></WhatsApp>
              </WhatsAppContainer>
              </Links>
            </ContactTopContainer>
            <ContactBottomContainer>
            {propertyDetail?.verified ?
              <Top>
                <VerifyContainer>
                  <Verify><VerifySvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" /></VerifySvg>VERIFIED</Verify>
                  <VerifyInfo>Property Finder has verified the accuracy and authenticity of this listing</VerifyInfo>
                </VerifyContainer>
              </Top> : '' }
              <Bottom>
                <SaveContainer>
                  <SaveSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" /></SaveSvg>
                  <Save>Save to shortlist</Save>
                </SaveContainer>
              </Bottom>
            </ContactBottomContainer>
          </GridPrice>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={4} sm={12} md={8} xs={12}>
            <Location>Location</Location>
            <Grid container>
              <Grid item lg={6} sm={6} md={6} xs={6}>
                <Avatar sx={{ width: 130, height: 130 }}>
                    <p style={{textAlign: 'center'}}>pactum towers</p>
                </Avatar>
              </Grid>
              <Grid item lg={6} sm={6} md={6} xs={6}>
                <LocationAddress>{propertyDetail?.address1}</LocationAddress>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} sm={12} md={8} xs={12}>
            <Agent>Agent</Agent>
            <Grid container>
              <Grid item lg={6} sm={6} md={6} xs={6}>
                <Avatar src={propertyDetail?.profilePicture} sx={{ width: 130, height: 130 }} />
              </Grid>
              <Grid item lg={6} sm={6} md={6} xs={6}>
                <AgentName><strong>{propertyDetail?.name}</strong></AgentName>
                <AgentWork>Property Consultant at</AgentWork>
                <AgentCompany>{propertyDetail?.companyName}</AgentCompany>
                 {/* @ts-ignore:next-line */}
                <AgentProperty>({totalData?.data?.filter((dat: any) => dat.creator).map((i:any) => i === propertyDetail?.creator).length} properties listed)</AgentProperty>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={8} sm={12} md={8} xs={12}>
            <AmenitiesTitle>Amenities</AmenitiesTitle>
            <Grid container>
              <Grid item lg={6} sm={6} md={6} xs={6}>
                {propertyDetail?.comfort.map((comfort: any, index: any) => ( 
                  <AmenitiesDiv key={index.toLocaleString()}>
                <Amenities>{comfort}</Amenities>
                </AmenitiesDiv>
                ))}
                {propertyDetail?.hvac.map((hvac: any, index: any) => ( 
                  <AmenitiesDiv key={index.toLocaleString()}>
                <Amenities>{hvac}</Amenities>
                </AmenitiesDiv>
                ))}
                {propertyDetail?.pets.map((pets: any, index: any) => ( 
                  <AmenitiesDiv key={index.toLocaleString()}>
                <Amenities>{pets}</Amenities>
                </AmenitiesDiv>
                ))}
              </Grid>
              <Grid item lg={6} sm={6} md={6} xs={6}>
              {propertyDetail?.parking.map((parking: any, index: any) => ( 
                  <AmenitiesDiv key={index.toLocaleString()}>
                <Amenities>{parking}</Amenities>
                </AmenitiesDiv>
                ))}
                {propertyDetail?.security.map((security: any, index: any) => ( 
                  <AmenitiesDiv key={index.toLocaleString()}>
                <Amenities>{security}</Amenities>
                </AmenitiesDiv>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={8} sm={12} md={8} xs={12}>
            <DescriptionTitle>Description</DescriptionTitle>
            <Grid container>
              <Grid item lg={12} sm={12} md={12} xs={12}>
                <Description>{propertyDetail?.description}</Description>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <StyledMoreContainer>
          <MoreTitle>More avaialble in the same area</MoreTitle>
          <MoreContainer>
              {/* @ts-ignore:next-line */}
            {available?.slice(0, 4).map((result: any) => 
          <CardGrid key={result._id}>
            <StyledLink to={`/detailsPage/${result._id}`}>
            <MoreCard>
              <MoreTopContainer>
                <MoreTopImg src={result?.images[0].img} />
              </MoreTopContainer>
              <MoreBottomContainer>
                <MoreApart>{result?.propertyType.toUpperCase()}</MoreApart>
                <MorePrice>{result.price.toLocaleString()} NGN/year</MorePrice>
                <MoreAddress>{result.address1}</MoreAddress>
                <BottomInner>
                  <InnerBed><Moresvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M176 288C220.1 288 256 252.1 256 208S220.1 128 176 128S96 163.9 96 208S131.9 288 176 288zM544 128H304C295.2 128 288 135.2 288 144V320H64V48C64 39.16 56.84 32 48 32h-32C7.163 32 0 39.16 0 48v416C0 472.8 7.163 480 16 480h32C56.84 480 64 472.8 64 464V416h512v48c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16V224C640 170.1 597 128 544 128z" /></Moresvg>{result.bedroom}</InnerBed>
                  <InnerBath><Moresvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M32 384c0 28.32 12.49 53.52 32 71.09V496C64 504.8 71.16 512 80 512h32C120.8 512 128 504.8 128 496v-15.1h256V496c0 8.836 7.164 16 16 16h32c8.836 0 16-7.164 16-16v-40.9c19.51-17.57 32-42.77 32-71.09V352H32V384zM496 256H96V77.25C95.97 66.45 111 60.23 118.6 67.88L132.4 81.66C123.6 108.6 129.4 134.5 144.2 153.2C137.9 159.5 137.8 169.8 144 176l11.31 11.31c6.248 6.248 16.38 6.248 22.63 0l105.4-105.4c6.248-6.248 6.248-16.38 0-22.63l-11.31-11.31c-6.248-6.248-16.38-6.248-22.63 0C230.7 33.26 204.7 27.55 177.7 36.41L163.9 22.64C149.5 8.25 129.6 0 109.3 0C66.66 0 32 34.66 32 77.25v178.8L16 256C7.164 256 0 263.2 0 272v32C0 312.8 7.164 320 16 320h480c8.836 0 16-7.164 16-16v-32C512 263.2 504.8 256 496 256z" /></Moresvg>{result.bathroom}</InnerBath>
                  <InnerSize><Moresvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM488 0H352c-12.94 0-24.62 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.88L370.8 96L169.4 297.4c-12.5 12.5-12.5 32.75 0 45.25C175.6 348.9 183.8 352 192 352s16.38-3.125 22.62-9.375L416 141.3l41.38 41.38c9.156 9.141 22.88 11.84 34.88 6.938C504.2 184.6 512 172.9 512 160V24C512 10.74 501.3 0 488 0z" /></Moresvg>{result.size.toLocaleString()} sqft</InnerSize>
                </BottomInner>
              </MoreBottomContainer>
            </MoreCard>
            </StyledLink>
            </CardGrid>
          )}
        </MoreContainer>
      </StyledMoreContainer>
    </StyledContainer>
    <Footer />
    </StyledBox>
  )
}

export default DetailsPage


