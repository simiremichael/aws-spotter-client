import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {Link, NavLink } from "react-router-dom";
import '@splidejs/react-splide/css';



const StyledBox = styled(Box)`
overflow: hidden;
`
const StyledContainer = styled(Container)`
padding-bottom: 15px;
`
const TopContainer = styled.div`
 padding: 10px 0 0 10px;
`

const Title = styled.h1`
text-align: start;
margin: 30px 0 10px 0;
color: #494949;
font-family: Sans-serif;
font-size: 6vmin;
`
const PropertyType = styled.p`
text-align: start;
margin: 20px 0 15px 0;
color: #383838;
font-family: Sans-serif;
font-weight: 400;
`
const CardContainer = styled.div`

`

const Card = styled(SplideSlide)`
width: 14rem;
height: 14rem;
margin: 10px 5px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
border-radius: 10px;
cursor: pointer;
`
const CardMedia = styled.div`
background-image: url("../images/lekki.jpg");
border-radius: 10px 10px 0 0;
background-size: 100% 100%;
height: 10rem;
`
const PlaceDiv = styled.div`
display: flex;
 background-color:  #008080;
 align-items: center;
 justify-content: center;
 width: 50px;
 border-radius: 25px;
 padding: 2px 0 4px 0;
 height: 10px;
`
const Place = styled.p`
color: #ffffff;
text-align: start;
font-family: Sans-serif;
font-size: 0.8rem;
`
const Location = styled.h3`
color: #ffffff;
letter-spacing: 0.9px;
text-align: start;
font-family: Sans-serif;
`
const CardTextContainer = styled.div`
height: 4rem;
margin: 0 10px;
text-align: start;
`
const CardText = styled.p`
font-family: Sans-serif;
letter-spacing: 0.8px;
font-size: 0.8rem;
color: #494949;
`
const CardMedia2 = styled.div`
background-image: url("../images/victoria-island.jpg");
border-radius: 10px 10px 0 0;
background-size: 100% 100%;
height: 10rem;
`
const CardMedia3 = styled.div`
background-image: url("../images/ajah.jpeg");
border-radius: 10px 10px 0 0;
background-size: 100% 100%;
height: 10rem;
`
const CardMedia4 = styled.div`
background-image: url("../images/ikeja.jpg");
border-radius: 10px 10px 0 0;
background-size: 100% 100%;
height: 10rem;
`
const CardMedia5 = styled.div`
background-image: url("../images/Lagos_Island.jpg");
border-radius: 10px 10px 0 0;
background-size: 100% 100%;
height: 10rem;
`
const CardMedia6 = styled.div`
background-image: url("../images/ikoyi.jpg");
border-radius: 10px 10px 0 0;
background-size: 100% 100%;
height: 10rem;
`
const CardMedia7 = styled.div`
background-image: url("../images/yaba.webp");
border-radius: 10px 10px 0 0;
background-size: 100% 100%;
height: 10rem;
`
const CardMedia8 = styled.div`
background-image: url("../images/banana-island.jpg");
border-radius: 10px 10px 0 0;
background-size: 100% 100%;
height: 10rem;
`
const CardMedia9 = styled.div`
background-image: url("../images/Surulere.jpg");
border-radius: 10px 10px 0 0;
background-size: 100% 100%;
height: 10rem;
`
const CardMedia10 = styled.div`
background-image: url("../images/sangotedo.jpg");
border-radius: 10px 10px 0 0;
background-size: 100% 100%;
height: 10rem;
`
const Links = styled(Link)`
margin-left: 5px;
font-weight: 600;
color: #007ea8;
text-decoration: none;
font-family: "Open Sans",sans-serif;
`


function NewForRent () {
  
  return (
    <StyledBox>
    <StyledContainer>
      <Title>Something New Everyday</Title>
      <PropertyType>New properties <Links to='/rent'>For Rent</Links></PropertyType>
      <CardContainer>
      <Splide
      options={ {
        gap : '0.5rem',
        perPage: 5,
        speed: 2000,
        breakpoints: {
        1200: {  },
          992: { perPage: 4 },
          768: {perPage: 3},
          600 : { perPage: 2 },
          300 : { perPage: 1 },
        },
        
      } }>
        {/* <Link to='rent?search=lekki&category=rent&type=apartment&bath=4&bed=4&minPrice=100000&maxPrice=5000000&sort= '> */}
    <Card>
      <CardMedia>
        <TopContainer>
        <PlaceDiv>
        <Place>Lagos</Place>
        </PlaceDiv>
      <Location>Lekki</Location>
      </TopContainer>
      </CardMedia>
      <CardTextContainer>
        <CardText>78 new properties for rent</CardText>
      </CardTextContainer>
    </Card>
    {/* </Link>
    <Link to='rent?search=victoria%20island&category=rent&type=apartment&bath=4&bed=4&minPrice=100000&maxPrice=5000000&sort='>
   */}
    <Card> 
      <CardMedia2>
        <TopContainer>
        <PlaceDiv>
        <Place>Lagos</Place>
        </PlaceDiv>
      <Location >Victoria Island</Location>
      </TopContainer>
      </CardMedia2>
      <CardTextContainer>
        <CardText>78 new properties for rent</CardText>
      </CardTextContainer>
    </Card>
    {/* </Link>
    <Link to='rent?search=banana%20island&category=rent&type=apartment&bath=4&bed=4&minPrice=100000&maxPrice=5000000&sort='>
      */}
     <Card>
      <CardMedia8>
        <TopContainer>
        <PlaceDiv>
        <Place>Lagos</Place>
        </PlaceDiv>
      <Location >Banana Island</Location>
      </TopContainer>
      </CardMedia8>
      <CardTextContainer>
        <CardText>78 new properties for rent</CardText>
      </CardTextContainer>
    </Card>
    {/* </Link> */}
    <Card>
      <CardMedia4>
        <TopContainer>
        <PlaceDiv>
        <Place>Lagos</Place>
        </PlaceDiv>
      <Location >Ikeja</Location>
      </TopContainer>
      </CardMedia4>
      <CardTextContainer>
        <CardText>78 new properties for rent</CardText>
      </CardTextContainer>
    </Card>
    <Card>
      <CardMedia6>
        <TopContainer>
        <PlaceDiv>
        <Place>Lagos</Place>
        </PlaceDiv>
      <Location>Ikoyi</Location>
      </TopContainer>
      </CardMedia6>
      <CardTextContainer>
        <CardText>78 new properties for rent</CardText>
      </CardTextContainer>
    </Card>
    <Card>
      <CardMedia5>
        <TopContainer>
        <PlaceDiv>
        <Place>Lagos</Place>
        </PlaceDiv>
      <Location >Lagos Island</Location>
      </TopContainer>
      </CardMedia5>
      <CardTextContainer>
        <CardText>78 new properties for rent</CardText>
      </CardTextContainer>
    </Card>
    <Card>
      <CardMedia7>
        <TopContainer>
        <PlaceDiv>
        <Place>Lagos</Place>
        </PlaceDiv>
      <Location >Yaba</Location>
      </TopContainer>
      </CardMedia7>
      <CardTextContainer>
        <CardText>78 new properties for rent</CardText>
      </CardTextContainer>
    </Card>
    <Card>
      <CardMedia3>
        <TopContainer>
        <PlaceDiv>
        <Place>Lagos</Place>
        </PlaceDiv>
      <Location >Ajah</Location>
      </TopContainer>
      </CardMedia3>
      <CardTextContainer>
        <CardText>78 new properties for rent</CardText>
      </CardTextContainer>
    </Card>
    {/* <NavLink to='http://localhost:3000/rent?search=surulere&category=rent&type=apartment&bed=4&bath=4&minPrice=100000&maxPrice=200000&sort=&buy=5000000'> */}
    <Card>
      <CardMedia9>
        <TopContainer>
        <PlaceDiv>
        <Place>Lagos</Place>
        </PlaceDiv>
      <Location>Surulere</Location>
      </TopContainer>
      </CardMedia9>
      <CardTextContainer>
        <CardText>78 new properties for rent</CardText>
      </CardTextContainer>
    </Card>
    {/* </NavLink> */}
    <Card>
      <CardMedia10>
        <TopContainer>
        <PlaceDiv>
        <Place>Lagos</Place>
        </PlaceDiv>
      <Location >Sangotedo</Location>
      </TopContainer>
      </CardMedia10>
      <CardTextContainer>
        <CardText>78 new properties for rent</CardText>
      </CardTextContainer>
    </Card>
    </Splide>
    </CardContainer>
    </StyledContainer>
    </StyledBox>
  )
}

export default NewForRent