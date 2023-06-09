import React from 'react';
import styled from '@emotion/styled';
//import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
//import Virtual_Tour from '../images/Virtual_Tours.mp4';
//import Video_Tour from '../images/Video_Tour.mp4';


const StyledContainer = styled(Container)`
margin-top: 30px;
`
const StyledGrid = styled(Grid)`
justify-content: space-between;
`
const InnerContainer = styled.div`
border-radius: 10px;
background-size: 100% 100%;
height: 300px;
position: relative;
margin-right: 10px;
`

const InnerContainer2 = styled.div`
background-color: #008080;
border-radius: 10px;
display: flex;
height: 300px;
position: relative;
`
const Title = styled.h1`
font-size: 6vmin;
text-align: start;
margin: 10px 0 30px 0;
font-family: Sans-serif;
color: #494949;
`
const AgentListing = styled.h4`
color: #ffffff;
text-align: start;
font-weight: 500px;
margin: 30px 20px 0 10px;
`
const Button = styled.button`
background-color: #ffffff;
color: #008080;
width: 130px;
height: 40px;
outlined: none;
cursor: pointer;
border: none;
border-radius: 5px;
margin: 10% 0 0 10px;
font-size: 1rem;
`
const GradTitle = styled.h2`
text-align: start;
color: #fff;
font-size: 2rem;
font-family: Sans-serif;
margin-left: 10px;
`
const P = styled.p`
text-align: start;
color: #ffffff;
font-size: 1rem;
font-weight: 700;
margin-left: 10px;
margin-top: 10px;
`
const GradButton = styled.div`
background-color: #ffffff;
color: #008080;
width: 130px;
height: 40px;
cursor: pointer;
display: flex;
justify-content: center;
border-radius: 5px;
margin: 10% 0 0 10px;
font-size: 1rem;
align-items: center;
`
const A = styled.a`
text-align: start;
margin-left: 15px;
color: #ffffff;
text-decoration: none;
margin-top: 10px;
`
const AnimationContainer = styled.div`
display: flex;
justify-content: space-between;
@media only screen and (max-width: 760px) {
  margin-top: 20px;
}
`
const Animate = styled.img`
height: 100px;
margin-right: 10px;
position: relative;
`
const Video = styled.video`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 10px;
`
const TextDiv = styled.div`
position: absolute;
height: 100%;
width: 100%;
top: 0;
display: flex;
flex-direction: column;
justify-content: start;
`

function Hub() {
  return (
    
      <StyledContainer>
        <Title>Home search made easy</Title>
        <StyledGrid container  spacing={2}>
        <Grid item lg={6} xs={12} sm={12} md={6}>
        <InnerContainer>
        <Video src='https://res.cloudinary.com/do2u3zzko/video/upload/v1680080414/tour/Virtual_Tours_fayxpi.mp4' autoPlay loop muted />
        <TextDiv>
          <GradTitle>Discover immersive 360° property tours</GradTitle>
        <P>Explore properties from the comfort of your home</P>
        <GradButton><strong>Coming soon</strong></GradButton>
        </TextDiv>
        </InnerContainer>
         </Grid>
         <Grid item lg={6} xs={12} sm={12} md={6}>
        <InnerContainer2>
        <Video src='https://res.cloudinary.com/do2u3zzko/video/upload/v1680080522/tour/Video_Tour_veyjul.mp4' autoPlay loop muted />
        <TextDiv>
         <GradTitle>Explore your future home with detail videos</GradTitle>
         <AgentListing>View your dream home online</AgentListing>
         <AnimationContainer>
         <Button><strong>Coming Soon</strong></Button>
         {/* <Animate src='../images/animate2.svg' /> */}

         </AnimationContainer>
         </TextDiv>
        </InnerContainer2>
        </Grid>
        </StyledGrid>
        </StyledContainer>
   
  )
}

export default Hub

  // <iframe width="100%" height="100%" src="https://www.youtube.com/embed/HJV16_4gyuU" title="Discover immersive 360° property tour" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> 