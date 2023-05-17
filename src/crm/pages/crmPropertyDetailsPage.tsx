import React, {useState} from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink, useNavigate, useParams} from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { logout, selectCurrentAgent } from '../../services/features/agentSlice';
import { useDispatch } from 'react-redux';
import { useGetPropertyQuery } from '../../services/api/propertyAPI';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import LogoutIcon from '@mui/icons-material/Logout';


const StyledBox = styled(Box)`

`

const BodyContainerGrid = styled(Grid)`

`
const BodyGrid = styled(Grid)`
background-color: #F8F8FF;
`
const StyledContainer = styled.div`
height: 50px;
border-bottom: 0.5px solid #D3D3D3;
display: flex;
width: 100%;
`
const StyledGrid = styled(Grid)`

`
const CompanyLogo = styled.img`
width: 40px;
height: 40px;
border-radius: 50px;
background-image: url('../../images/bank_avater.jpg');
background-size: 100% 100%;
cursor: pointer;
`
const RightContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 100%;
margin: 0;
padding: 0 3%;
background-color: #ffffff;
@media screen and (min-width: 680px) {
  padding: 0 2%;
}
`
const Title = styled.h2`
margin: 0;
margin-left: 10px;
color: #494949;
`
const InnerRightContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 100%;
`
const Notification = styled.div`
width: 30px;
height: 30px;
border-radius: 50px;  
border: 0.5px solid #D3D3D3;
display: flex;
align-items: center;
justify-content: center;
margin-left: 5px;
cursor: pointer;
 `
 const Bell = styled.svg`
 width: 15px;
 fill: #D3D3D3;
 `
 const PlusTitleContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 `
 const PropertyBodyContainer = styled.div`
 margin: 15px 20px 20px 20px;
 background-color: #fff;
 ` 
 const GridLeftContainer = styled.div`
 backgroun-color: #F5F5F5;
border-radius: 10px;
 `
 const GridRightContainer = styled.div`
 background-color: #F5F5F5;
 border-radius: 10px;
 `
 const LeftApartment = styled.h3`
 color: #494949;
 `
 const Location = styled.p`
 color: #494949;
 `
 const Address = styled.p`
 font-size: 0.9rem;
 display: flex;
 align-items: center;
 font-weight: 400;
 color: #494949;
 `
 const Amount = styled.p`
 font-size: 1.2rem;
 font-weight: 800;
 color: #383838;
 `
 const Size = styled.p`
 font-size: 0.9rem;
 color: #494949;
 `
 const Bed = styled.p`
 font-size: 0.9rem;
 display: flex;
 align-items: center;
 color: #494949;
 `
 const Bath = styled.p`
 font-size: 0.9rem;
 display: flex;
 align-items: center;
 color: #494949;
 margin-left: 0.8rem;
 `
 const BuildYear = styled.p`
 font-size: 0.9rem;
 display: flex;
 align-items: center;
 color: #494949;
 `
 const City = styled.p`
 font-size: 0.9rem;
 display: flex;
 align-items: center;
 color: #494949;
 `
 const BedBathContainer = styled.div`
 display: flex;
 align-items: center;
 margin-top: -15px;
 margin-bottom: -15px;
 `
 const LivingRoom = styled.p`
 font-size: 0.9rem;
 display: flex;
 align-items: center;
 color: #494949;
 margin-left: 0.8rem;
 `
 const PropertyGroup = styled.p`
 font-size: 0.9rem;
 color: #494949;
 `
 const PropertyTitle = styled.p`
 font-size: 1.2rem;
 font-weight: 800;
 color: #383838;
 `
 const State = styled.p`
 font-size: 0.9rem;
 color: #494949;
 `
 const Tour = styled.div`
 width: 100%;
 height: 100%;
 `
 const Video = styled.div`
 width: 100%;
 height: 100%;
 `
 const Comfort = styled.p`
 font-size: 0.9rem;
 color: #494949;
 `
 const Condition = styled.p`
 font-size: 0.9rem;
 color: #494949;
 `
 const Hvac = styled.p`
 font-size: 0.9rem;
 color: #494949;
 `
 const Parking = styled.p`
 font-size: 0.9rem;
 color: #494949;
 `
 const Pet = styled.p`
 font-size: 0.9rem;
 color: #494949;
 `
 const PropertyType = styled.p`
 font-size: 0.9rem;
 color: #494949;
 `
 const PropertyCategory = styled.p`
 font-size: 1.2rem;
 font-weight: 800;
 color: #383838;
 `
 const Img = styled.img`
 width: 100%;
 height: 100%;
 `
 const ImgDiv = styled.div`
 width: 100%;
 height: 100%;
 `
 const ImgContainer = styled.div`
  width: 100%;
  height: auto;
 `
 const VideoPlayer = styled.iframe`
 width: 100%;
 height: 100%;
 `
 const Span = styled.span`
 color: #494949;
 font-weight: bold;
 margin-left: 10px;
 `
 const FeaturesContainer = styled.div`
 display: flex;
 align-items: center;
 color: #494949;
 font-size: 0.9rem;
 margin: 0;
 margin-top: -15px;
 margin-bottom: -15px;
 `
 const VidTourContainer = styled.div`
 display: flex;
 margin: 15px 0;
 `

function CrmPropertyDetailsPage() {

    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
      setSidebar(!sidebar);
    }
    const {agent} = useAppSelector(selectCurrentAgent);
    let navigate = useNavigate();
    const dispatch = useDispatch();
      const handleLogout = () => {
        // localStorage.removeItem('agent');
        dispatch(logout());
        navigate("/client-login");
        }
    let { cpdId } = useParams();
    const { data} = useGetPropertyQuery(cpdId);   

  return (
    <StyledBox>
    <StyledGrid container>
    <StyledContainer>
     <Grid item lg={12} md={12} sm={12} xs={12} >
    <RightContainer>
    <PlusTitleContainer>
        <ArrowBackIcon  sx={{ color: '#494949',cursor: 'pointer'}} onClick={() => navigate('/agentproperties')} />
    <Title>Property Details</Title>
    </PlusTitleContainer>
    <InnerRightContainer>
        {/* @ts-ignore:next-line */}
       <CompanyLogo src={data?.logo}/>
        <Notification><Bell xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 32V49.88C328.5 61.39 384 124.2 384 200V233.4C384 278.8 399.5 322.9 427.8 358.4L442.7 377C448.5 384.2 449.6 394.1 445.6 402.4C441.6 410.7 433.2 416 424 416H24C14.77 416 6.365 410.7 2.369 402.4C-1.628 394.1-.504 384.2 5.26 377L20.17 358.4C48.54 322.9 64 278.8 64 233.4V200C64 124.2 119.5 61.39 192 49.88V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32V32zM216 96C158.6 96 112 142.6 112 200V233.4C112 281.3 98.12 328 72.31 368H375.7C349.9 328 336 281.3 336 233.4V200C336 142.6 289.4 96 232 96H216zM288 448C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288z"/></Bell></Notification>
    </InnerRightContainer>
    </RightContainer>
     </Grid>
     </StyledContainer>
    </StyledGrid>
   <>
    <BodyContainerGrid container>
     <BodyGrid item lg={12} md={ 12} sm={12} xs={12}>
     <>     
     <PropertyBodyContainer>
       <Grid container spacing={2}>
        <Grid item lg={5} md={5} sm={12} xs={12}>
         <GridLeftContainer>
         <PropertyTitle>{data?.propertyTitle}</PropertyTitle>
          <LeftApartment></LeftApartment>
          <Location></Location>
          <Address><LocationOnOutlinedIcon sx={{marginRight: 0.5, fontSize: 18, color: '#494949'}} />{data?.address1}</Address>
         <Amount>₦ {data?.price.toLocaleString()}</Amount>
         <BedBathContainer>
         <Bed><BedOutlinedIcon sx={{marginRight: 0.5, fontSize: 18, color: '#494949'}} />{data?.bedroom}</Bed>
         <Bath><BathtubOutlinedIcon sx={{marginRight: 0.5, fontSize: 16, color: '#494949'}} />{data?.bathroom}</Bath>
         <LivingRoom><TvOutlinedIcon sx={{marginRight: 0.5, fontSize: 16, color: '#494949'}} />{data?.livingRoom}</LivingRoom>
         </BedBathContainer>
         <PropertyCategory>{data?.category}</PropertyCategory>
        <Size>Size:<Span>{data?.size.toLocaleString()}</Span></Size>
         <BuildYear>Built year:<Span>{data?.buildingYear}</Span></BuildYear>
         <City>Area:<Span>{data?.location}</Span></City>
         <PropertyType>Property type:<Span>{data?.propertyType}</Span></PropertyType>
         <PropertyGroup>Property group:<Span>{data?.propertyGroup}</Span></PropertyGroup>
         <State>State:<Span>{data?.state}</Span></State>
         <Condition>Condition:<Span>{data?.condition}</Span></Condition>
          <FeaturesContainer>
            Comforts:
          {data?.comfort.map((com: any) => ( 
            <Span>
         <Comfort>{com},</Comfort>
         </Span>
         ))}
         </FeaturesContainer>
         <FeaturesContainer>
          HVAC
          {data?.hvac.map((hvac: any) => ( 
             <Span>
         <Hvac>{hvac},</Hvac>
         </Span>
          ))}
         </FeaturesContainer>
         <FeaturesContainer>
          Parking
          {data?.parking.map((parking: any) => (
         <Span>
         <Parking>{parking},</Parking>
         </Span>
         ))}
         </FeaturesContainer>
         <Pet>Pets:<Span>{data?.pets}</Span></Pet>
         </GridLeftContainer>
        </Grid>
        <Grid item lg={7} md={7} sm={12} xs={12}>
            <GridRightContainer>
            <ImgContainer> 
        <ImgDiv >
         <Grid container spacing={2}>
            {/* @ts-ignore:next-line */}
       {data?.images.map((item: any, index: any) => (
         <Grid item lg={4} md={4} sm={4} xs={4} key={index}>
      <Img src={item.img} />
       </Grid>
             ))} 
         </Grid>
        </ImgDiv>
        </ImgContainer>
        <VidTourContainer >
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
          <Tour>
          <VideoPlayer  src={data?.tour} allowFullScreen  />
          </Tour>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
          <Video>
         <VideoPlayer src={data?.video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen  />
          </Video>
          </Grid>
        </Grid>
         </VidTourContainer>
        </GridRightContainer>
        </Grid>
       </Grid>
     </PropertyBodyContainer>
     </>
    </BodyGrid>
    </BodyContainerGrid>
    </>
    </StyledBox>
  )
}

export default CrmPropertyDetailsPage