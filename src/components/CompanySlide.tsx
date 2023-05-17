import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Marquee from 'react-fast-marquee';

const StyledBox = styled(Box)`
margin: 40px 0 20px 0;
`
const StyledContainer = styled(Container)`

`
const Title = styled.h1`
color: #494949;
margin-bottom: 30px;
font-size: 6vmin;
`
const Slide1 = styled.div`
margin: 15px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
background-image: url("../images/reallogo1.png");
border-radius: 10px;
cursor: pointer;
background-size: 100% 100%;
width: 8rem;
height: 6rem;
`
const Slide2 = styled(Slide1)`
background-image: url("../images/reallogo2.png")`
const Slide3 = styled(Slide1)`
background-image: url("../images/reallogo3.jpg")`
const Slide4 = styled(Slide1)`
background-image: url("../images/reallogo4.jpg")`
const Slide5 = styled(Slide1)`
background-image: url("../images/reallogo5.png")`
const Slide6 = styled(Slide1)`
background-image: url("../images/reallogo6.png")`
const Slide7 = styled(Slide1)`
background-image: url("../images/reallogo7.png")`
const Slide8 = styled(Slide1)`
background-image: url("../images/reallogo8.png")`
const Slide9 = styled(Slide1)`
background-image: url("../images/reallogo3.jpg");`
const Slide10 = styled(Slide1)`
background-image: url("../images/reallogo10.png")`

const CompanySlide = () => {
  return (
    <StyledBox>
    <StyledContainer>
        <Title>Top Real Estate Companies</Title>
    <Marquee gradient={false} pauseOnHover>
     <Slide1></Slide1>
     <Slide2></Slide2>
     <Slide3></Slide3>
     <Slide4></Slide4>
     <Slide5></Slide5>
     <Slide6></Slide6>
     <Slide7></Slide7>
     <Slide8></Slide8>
     <Slide9></Slide9>
     <Slide10></Slide10>
    </Marquee>
    </StyledContainer> 
    </StyledBox>
  )
}

export default CompanySlide