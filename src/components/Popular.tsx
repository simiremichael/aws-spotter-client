import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link} from "react-router-dom";


const StyledBox = styled(Box)`
margin: 40px 0;
`
const StyledContainer = styled(Container)`

`
const StyledGrid = styled(Grid)`

`
const InnerContainer = styled(Grid)`
display: flex;
flex-direction: column;
align-items: start;
`
const Links = styled(Link)`
text-decoration: none;
color: #007ea8;
`
const StyledItem = styled.li`
text-align: start;
display: inline;
list-style-type: none;
font-size: 0.9rem;
line-height: 1.6rem;
cursor: pointer;
font-family:   Open Sans;
:hover {
  border-bottom: 1px solid  #007ea8;
  transition: ease-in-out, width 0.4s, 0.2s;

}
`
const Heading = styled.h3`
text-align: start;
font-size: 1rem;
color: #383838;
cursor: pointer;
font-familyt: Roboto;
`

function Popular() {
  return (  
   <StyledBox>
    <StyledContainer>
     <StyledGrid container spacing={2}>
     <InnerContainer item lg={3}>
     <Heading>POPULAR SEARCHES</Heading>
     <Links to='/rent?search=victoria%20island&category=rent&type=apartment&bath=4&bed=4&minPrice=300000&maxPrice=50000000&sort='><StyledItem>Properties for rent in Victoria Island</StyledItem></Links>
     <Links to='/buy?search=ikeja&category=sale&type=apartment&bed=4&bath=4&minPrice=1000000&maxPrice=&sort=&buy=5000000000'><StyledItem>Property for sale in Ikeja</StyledItem></Links>
     <Links to='/rent?search=lekki&category=rent&type=apartment&bath=4&bed=4&minPrice=300000&maxPrice=50000000&sort='><StyledItem>Apartment for rent in Lekki</StyledItem></Links>
     <Links to='/buy?search=ikoy&category=sale&type=apartment&bed=4&bath=4&minPrice=1000000&maxPrice=5000000000&sort=&buy=ikoyi'><StyledItem>Aparment for sale in Ikoyi</StyledItem></Links>
     <Links to='/buy?search=ibeju+lekk&category=sale&type=apartment&bed=4&bath=4&minPrice=1000000&maxPrice=5000000000&sort=&buy=ibeju+lekki'><StyledItem>Land for sale in Ibeju Lekki</StyledItem></Links>
     <Links to='/rent?search=banana%20island&category=rent&type=apartment&bath=4&bed=4&minPrice=300000&maxPrice=50000000&sort='><StyledItem>Apartment for rent in Banana Island </StyledItem></Links>
     </InnerContainer>

     <InnerContainer item lg={3}>
     <Heading>POPULAR AREAS</Heading>
     <Links to='/rent?search=banana%20island&category=rent&type=apartment&bath=4&bed=4&minPrice=300000&maxPrice=50000000&sort='><StyledItem>Properties for rent in Banana Island</StyledItem></Links>
     <Links to='/buy?search=ikoy&category=sale&type=apartment&bed=4&bath=4&minPrice=1000000&maxPrice=5000000000&sort=&buy=ikoyi'><StyledItem>Property for sale in Ikoyi</StyledItem></Links>
     <Links to='/rent?search=ikeja&category=rent&type=apartment&bath=2&bed=3&minPrice=200000&maxPrice=2000000&sort='><StyledItem>Apartment for rent in Ikeja</StyledItem></Links>
     <Links to='/commercial?search=victoria%20island&category=rent&propertyGroup=Commercial&type=office&bath=1&bed=1&minPrice=300000&maxPrice=5000000000&sort='><StyledItem>Office for rent in Victoria Island</StyledItem></Links>
     <Links to='/rent?search=ajah&category=rent&type=flat&bath=2&bed=3&minPrice=200000&maxPrice=5000000&sort='><StyledItem>Flat for rent in Ajah</StyledItem></Links>
     <Links to='/buy?search=lekki&category=sale&type=apartment&bath=4&bed=4&minPrice=1000000&maxPrice=5000000000&sort='><StyledItem>Apartment for sale in Lekki </StyledItem></Links>
     </InnerContainer>

     <InnerContainer item lg={3}>
    <Heading>TENDING AREAS</Heading>
     <Links to='/commercial?search=marina&category=rent&propertyGroup=Commercial&type=office&bath=1&bed=1&minPrice=300000&maxPrice=5000000000&sort='><StyledItem>Office for rent in Marina</StyledItem></Links>
     <Links to='/commercial?search=ikoyi&category=rent&propertyGroup=Commercial&type=office&bath=1&bed=1&minPrice=300000&maxPrice=5000000000&sort='><StyledItem>Office for rent in Ikoyi</StyledItem></Links>
     <Links to='/buy?search=banana%20island&category=sale&type=apartment&bath=4&bed=4&minPrice=1000000&maxPrice=5000000000&sort='><StyledItem>Properties for sale in Banana Island</StyledItem></Links>
     <Links to='/rent?search=ikeja&category=rent&type=apartment&bath=1&bed=2&minPrice=200000&maxPrice=2000000&sort='><StyledItem>Property for rent in Ikeja</StyledItem></Links>
     <Links to='/buy?search=lekki&category=sale&type=wholeBuilding&bed=4&bath=4&minPrice=1000000&maxPrice=5000000000&sort=&buy=terraced'><StyledItem>Building for sale in Lekki</StyledItem></Links>
     <Links to='/commercial?search=ikeja&category=rent&propertyGroup=Commercial&type=office&bath=1&bed=1&minPrice=300000&maxPrice=5000000000&sort='><StyledItem>Office for rent in Ikeja</StyledItem></Links>
     </InnerContainer>

     <InnerContainer item lg={3}>
     <Heading>TRENDING SEARCHES</Heading>
     <Links to='/rent?search=lekki&category=rent&type=apartment&bath=4&bed=4&minPrice=300000&maxPrice=50000000&sort='><StyledItem>Properties for rent in Lekki</StyledItem></Links>
     <Links to='/buy?search=sangotedo&category=sale&type=apartment&bath=4&bed=4&minPrice=1000000&maxPrice=5000000000&sort='><StyledItem>Property for sale in Sangotedo</StyledItem></Links>
     <Links to='/rent?search=banana%20island&category=rent&type=apartment&bath=4&bed=4&minPrice=300000&maxPrice=50000000&sort='><StyledItem>Apartment for rent in Banana Island</StyledItem></Links>
     <Links to='/buy?search=ikoyi&category=sale&type=apartment&bath=4&bed=4&minPrice=1000000&maxPrice=5000000000&sort='><StyledItem>Apartment for sale in Ikoyi</StyledItem></Links>
     <Links to='/buy?search=ibeju%20lekki&category=sale&type=land&bath=4&bed=4&minPrice=1000000&maxPrice=5000000000&sort='><StyledItem>Land for sale in Ibeju Lekki</StyledItem></Links>
     <Links to='/rent?search=ikeja&category=rent&type=apartment&bath=1&bed=1&minPrice=200000&maxPrice=2000000&sort='><StyledItem>Apartment for rent in Ikeja</StyledItem></Links>
     </InnerContainer>
     </StyledGrid>
    </StyledContainer>
    </StyledBox>
  )
}

export default Popular