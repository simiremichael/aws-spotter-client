import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPropertyQuery } from '../services/api/propertyAPI';
import Link from '@mui/material/Link';

const StyledBox = styled(Box)`
`
const StyledContainer = styled(Container)`
margin-top: 20px;
margin-bottom: 20px;
`
const SlideContainer = styled.div`
`
const Slideimg = styled.img`
height: 25rem;
width: 100%;
@media screen and (min-width: 761px) {
  height: 30rem;
}
`
const ContactContainer = styled.div`
display: flex;
flex-direction: column;
aling-items: center;
 width: 220px;
 height: auto;
 position: absolute;
 padding:  0 20px 10px  20px;
 z-index: 1;
 margin: -400px 0 0 55%;
 background-color: rgba(225 225 225 0.6);
 backdrop-filter: blur(10px);
 @media screen and (max-width: 760px) {
  display: none;
}
 `
 const ContactContainer1 = styled.div`
 width: 93%;
 height: auto;
 position: fixed;
 z-index: 1001;
 padding: 0 2%;
 bottom: 0;
 background-color: rgba(225, 225, 225, 0.8 );
 backdrop-filter: blur(10px);
 @media screen and (min-width: 761px) {
  display: none;
}
 `
 const ContactCompany = styled.h4`
 color: #383838;
 text-align: start;
 margin: 10px 0;
 `
const ContactForm = styled.form`
display: flex;
flex-direction: column;
`
const ContactForm1 = styled(ContactForm)`
margin: 30px 0;
`
const RequestButoon = styled.button`
height: 40px;
width: 100%;
margin: 10px 0;
outline: none;
border: none;
border-radius: 5px;
background-color: #4169E1;
color: #383838;
font-size: 1.1rem;
font-weight: bold;
cursor: pointer;
`
const CallButton = styled.button`
height: 40px;
width: 100%;
margin: 10px 0;
outline: none;
border: none;
border-radius: 5px;
background-color: #4169E1;
color: #383838;
font-size: 1.1rem;
font-weight: bold;
cursor: pointer;
`
const ClickMoreButton = styled(RequestButoon)`
width: 100%;
background: none;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
position: sticky;
bottom: 0;
color: #4169E1;
`
const ClickMoreButton1Container = styled.div`
display: flex;
justify-content: end;
`
const ClickMoreButton1 = styled(RequestButoon)`
width: 20%;
background: none;
color: #4169E1;
margin-right: 0;
`
const RequestSvg = styled.svg`
width: 15px;
fill: #4169e1;
margin-left: 10px;
`
const AddressContainer = styled.div`

`
const Logo = styled.div`
 width: 100px;
 height: 100px;
`
const RightContainer = styled.div`
margin: 0 0 0 10px;
`
const Reallogo = styled.img`
width: 100%;
height: 100%;
`
const BackTo = styled.p`
text-align: start;
margin: -8px 0 10px 0;
color: #4169E1;
border: 1px solid #4169E1;
width: 110px;
padding: 5px 3px 5px 5px;
cursor: pointer;
`
const Developer = styled.h6`
text-align: start;
margin: 0;
color: #4169E1;
`
const Property = styled.h2`
text-align: start;
margin: 0;
color: #383838;
`
const Amount = styled.p`
text-align: start;
margin: 5px 0;
color: #ef5e4e;
font-weight: bold;
`
const AboutContainer = styled.div`

`
const Title = styled.h2`
text-align: start;
color: #383838;
margin: 15px 0 25px 0;
`
const AboutTopContainer = styled.div`
display: flex;
`
const AboutDownContainer = styled.div`
display: flex;
margin-top: 15px;
`
const AboutPriceContainer = styled.div`

`
const AboutPriceNaration = styled.p`
text-align: start;
margin: 0;
color: #383838;
`
const AboutPrice = styled.h4`
text-align: start;
margin: 5px 0;
color: #7a858c;
`
const AboutDeliveryContainer = styled.div`

`
const AboutDeliveryNaration = styled.p`
text-align: start;
margin: 0;
color: #383838 ;
`
const AboutDelivery = styled.h4`
text-align: start;
margin:  5px 0;
color: #7a858c;
`
const AboutUnitContainer = styled.div`

`
const AboutUnitNaration = styled.p`
text-align: start;
margin: 0;
color: #383838;
`
const AboutUnit = styled.h4`
text-align: start;
margin: 5px 0;
color: #7a858c;
`
const AboutStatusContainer = styled.div`

`
const AboutStatusNaration = styled.p`
text-align: start;
margin: 0;
color: #383838;
`
const AboutStatus = styled.h4`
text-align: start;
margin: 5px 0;
color: #7a858c;
`
const AboutSqftContainer = styled.div`

`
const AboutSqftNaration = styled.p`
text-align: start;
margin: 0;
color: #383838;
`
const AboutSqft = styled.h4`
text-align: start;
margin: 5px 0;
color: #7a858c;
`
const AboutBedContainer = styled.div`

`
const AboutBedNaration = styled.p`
text-align: start;
margin: 0;
color: #383838;
`
const AboutBed = styled.h4`
text-align: start;
margin: 5px 0;
color: #7a858c;
`
const Address = styled.address`
text-align: start;
margin-top: 13px;
display: flex;
align-items: center;
`
const Svg = styled.svg`
width: 13px;
margin-right: 5px;
fill: #494949;
`
const DecriptionContainer = styled.div`
`
const DescriptionTitle = styled.h4`
text-align: start;
margin: 20px 0 5px 0;
color: #383838;
font-size: 0.9rem;
`
const Description = styled.p`
text-align: start;
color: #7a858c;
`
const AmenitiesContainer = styled.div`
display: flex;
flex-wrap: wrap;
`
const AmenitiesTitle = styled.h4`
text-align: start;
margin: 20px 0 2px 0;
color: #383838;
font-size: 0.9rem;
`
const Amenities = styled.p`
text-align: start;
margin: 10px 20px 5px 0;
color: #7a858c;
`
const AmenitiesSvg = styled.svg`
width: 10px;
fill: green;
margin-right: 5px;
`
const StyledLink = styled(Link)`
text-decoration: none;
 `
 const PropertyStatus = styled.li`
text-align: start;
margin: 18px 0 0 0;
font-size: 12px;
color: #4169E1;
font-weight: bold;
list-style-position: inside;
margin: 0 0 0 10px;
padding: 0;
`
const DeveloperContainer = styled.div`
display: flex;
align-items: end;
margin: 5px 0;
`
 
function NewProjectDetailsPage() {

 const [show, setShow] = useState(false);
 let { projId } = useParams();
  const { data} = useGetPropertyQuery(projId, {refetchOnMountOrArgChange: true }); 
 
 const navigate = useNavigate();

 const handleShow = () => {
  setShow(!show);
 }

 const [buttonPosition, setButtonPosition] = useState('bottom');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;
      const position = scrollPosition + windowHeight >= bodyHeight ? 'bottom' : 'fixed';
      setButtonPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


 const handleSubmit = () => {

 }
  return (
    <StyledBox>
      <NavBar  />
      <StyledContainer>
        <SlideContainer>
      <Splide aria-label="My Favorite Images">
         {/* @ts-ignore:next-line */}
        {data?.images.map((image: any, index: any) => ( 
  <SplideSlide key={index}>
    <Slideimg src={image.img} alt="Image"/>
  </SplideSlide>
  ))}
   </Splide>
   
  <ContactContainer>
      <ContactCompany>Contact {data?.companyName[0].toUpperCase()}{data?.companyName.slice(1)}</ContactCompany>
      <ContactForm1 onSubmit={handleSubmit}>
      <StyledLink href={`mailto:${data?.email}`}>
        <RequestButoon type='button'>Send Email</RequestButoon>
        </StyledLink>
        <StyledLink href={`tel:${data?.phone}`}>
      <CallButton type='button'>Call Now</CallButton>
      </StyledLink>
      </ContactForm1>
    </ContactContainer>
   </SlideContainer>
   {/* @ts-ignore:next-line */}
   <ContactContainer1 style={{ position: buttonPosition }}> 
      { show && (
        <>
        <ClickMoreButton1Container>
        <ClickMoreButton1 onClick={handleShow}> Close</ClickMoreButton1>
        </ClickMoreButton1Container>
        <ContactCompany>Contact {data?.companyName[0].toUpperCase()}{data?.companyName.slice(1)}</ContactCompany>
      <ContactForm onSubmit={handleSubmit}>
          <StyledLink href={`mailto:${data?.email}`}>
        <RequestButoon type='button'>Send Email</RequestButoon>
        </StyledLink>
        <StyledLink href={`tel:${data?.phone}`}>
      <CallButton type='button'>Call Now</CallButton>
      </StyledLink>
      </ContactForm>
      </>
      )}
      <ClickMoreButton onClick={handleShow}>Contact us<RequestSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z"/></RequestSvg></ClickMoreButton>
    </ContactContainer1>
      <AddressContainer>
      <Title>About This Project</Title>
      <Grid container rowSpacing={2}>
        <Grid item lg={2} md={2} sm={6}  xs={6}>
          <Logo><Reallogo src={data?.logo}/></Logo>
          </Grid>
          <Grid item lg={3} md={3} sm={6}  xs={6}>
          <RightContainer>
           <BackTo onClick={() => navigate('/newProject')}>Back to project</BackTo>
           <DeveloperContainer>
            {/* @ts-ignore:next-line */}
           <Developer>BY {data?.companyName.toUpperCase()}</Developer><PropertyStatus>{data?.buildingYear <= new Date() ? 'Completed'.toUpperCase() : 'Under Construction'.toUpperCase() }</PropertyStatus>
           </DeveloperContainer>
           <Property>Zella Homes</Property>
           <Amount>From {data?.price.toLocaleString()} NGN</Amount>
          </RightContainer>
          </Grid>
          <Grid item lg={7} md={7} sm={13}  xs={12}>
          
          <AboutContainer>
           <AboutTopContainer>
           <Grid container> 
           
        <Grid item lg={3} md={3} sm={4}  xs={4}>
          <AboutPriceContainer>
            <AboutPriceNaration>Price From</AboutPriceNaration>
            <AboutPrice>{data?.price.toLocaleString()} NGN</AboutPrice>
          </AboutPriceContainer>
          </Grid>
          <Grid item lg={3} md={3} sm={4}  xs={4}>
          <AboutSqftContainer>
            <AboutSqftNaration>Price per sqft</AboutSqftNaration>
            <AboutSqft>Ask for price</AboutSqft>
          </AboutSqftContainer>
          </Grid>
          <Grid item lg={3} md={3} sm={4}  xs={4}>
          <AboutStatusContainer>
            <AboutStatusNaration>Status</AboutStatusNaration>
           {/* @ts-ignore:next-line */}
            <AboutStatus>{data?.buildingYear <= new Date() ? 'Completed' : 'Under Construction'}</AboutStatus>
          </AboutStatusContainer>
          </Grid>
          </Grid>
           </AboutTopContainer>
           <AboutDownContainer>
            <Grid container>
           <Grid item lg={3} md={3} sm={4}  xs={4}>
           <AboutDeliveryContainer>
            <AboutDeliveryNaration>Deliver Date</AboutDeliveryNaration>
            <AboutDelivery>{data?.buildingYear}</AboutDelivery>
          </AboutDeliveryContainer>
          </Grid>
          <Grid item lg={3} md={3} sm={4}  xs={4}>
          <AboutUnitContainer>
            <AboutUnitNaration>Total units</AboutUnitNaration>
            <AboutUnit>15</AboutUnit>
          </AboutUnitContainer>
          </Grid>
          <Grid item lg={3} md={3} sm={4}  xs={4}>
          <AboutBedContainer>
          <AboutBedNaration>Bedrooms</AboutBedNaration>
            <AboutBed>1 to {data?.bedroom}</AboutBed>
          </AboutBedContainer>
          </Grid>
          </Grid>
           </AboutDownContainer>
          </AboutContainer>
          </Grid>
          </Grid>
          <Address><Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" /></Svg>{data?.address1}</Address>
      </AddressContainer>
      <DecriptionContainer>
        <DescriptionTitle>DESCRIPTION</DescriptionTitle>
        <Description>{data?.description}</Description>
      </DecriptionContainer>
      <AmenitiesTitle>AMENITIES</AmenitiesTitle>
      <AmenitiesContainer>
      {data?.comfort.map((comfort: any, index: any) => ( 
       <Amenities key={index}><AmenitiesSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></AmenitiesSvg>{comfort}</Amenities>
       ))}
       {data?.hvac.map((hvac: any, index: any) => ( 
       <Amenities key={index}><AmenitiesSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></AmenitiesSvg>{hvac}</Amenities>
       ))}
       {data?.parking.map((parking: any, index: any) => ( 
       <Amenities key={index}><AmenitiesSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></AmenitiesSvg>{parking}</Amenities>
       ))}
       {data?.security.map((security: any, index: any) => ( 
       <Amenities key={index}><AmenitiesSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></AmenitiesSvg>{security}</Amenities>
       ))}
       </AmenitiesContainer>
      </StyledContainer>
      <Footer />
      </StyledBox>
  )
}

export default NewProjectDetailsPage