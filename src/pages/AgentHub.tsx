import React from 'react';
import Container from '@mui/material/Container';
import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import { Link} from "react-router-dom";
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

const NavBar = styled.div`
height: 60px;
border-bottom: 0.5px solid #c4c4c4;
`

const LogoContainer = styled.div`

`
const Logo = styled.h3`
color: #008080;
margin: 5px 0;
text-align: start;
cursor: pointer;
`
const MenuItems = styled.li`
color: #383838;
list-style-type: none;
align-self: center;
cursor: pointer;
margin-top: 5px;
`
const UL = styled.ul`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 100%;
`
const Button = styled.button`
height: 40px;
width: 140px;
margin-left: 1.2%;
margin-top: 10px;
padding: 0 15px;
font-weight: 500;
font-size: 1.1rem;
background-color: #008080;
color: #fff;
cursor: pointer;
outline: none;
border: none;
`
const BodyContainer = styled(Container)`
margin-bottom: 40px;
`
const NavigationContainer = styled.div`
display: flex;
justify-content: start;
align-items: center;
height: 70px;
`
const Navi = styled.p`
font-size: 0.7rem;
`
const Links = styled(Link)`
text-decoration: none;
color: #007ea8;
display: flex;
align-items: center;
cursor: pointer;
`
const GrowContainer = styled.div`
margin: 30px 0;
height: 300px;
`
const GrowHeading = styled.h1`
text-align: start;
padding: 30px 15px 0 15px;
color: #383838;
`
const GrowContent = styled.p`
text-align: start;
padding: 0 15px 0 15px;
color: #403b45;;
font-size: 1.05rem;
font-weight: 200;
letter-spacing: 0.3px;
`
const Iframe = styled.iframe`
width: 100%;
height: 100%;
`
const GrowAddContainer = styled.div`
background-color: #F5F5F5;
padding-bottom: 40px;
`
const BottomContainer = styled(Container)`
display: flex;
flex-direction: column;
justify-content: start;
`
const Divider = styled.div`
border-bottom: 0.5px solid #c4c4c4;
margin: 30px 0 -15px 0;
`
const AddOwnwerHeading = styled.h3`
text-align: start;
padding: 30px 15px 0 15px;
color: #383838;
margin-left: 6%;
`
const FinderAgentBtn = styled.button`
height: 40px;
width: 140px;
margin-left: 1.2%;
margin-top: 10px;
padding: 0 15px;
font-weight: 500;
font-size: 1.1rem;
background-color: #fff;
color: #008080;
cursor: pointer;
outline: none;
border: none;
border: 0.3px solid #c4c4c4;
margin-top: 60px;
`

function AgentHub() {
  
  const navigate = useNavigate();

  return (
    <Box>
    <NavBar>
    <Container>
     <Grid container>
     <Grid item lg={3} md={3} sm={3} xs={3}>
      <LogoContainer>
        <Logo>Property</Logo>
        <Logo>Finder</Logo>
      </LogoContainer>
     </Grid>
     <Grid item lg={6} md={6} sm={6} xs={6}>
     <Grid container>
     <UL>
      <MenuItems>Advertise</MenuItems>
     <MenuItems>Tools</MenuItems>
     <MenuItems>Agent Guides</MenuItems>
     <MenuItems>Resouces</MenuItems>
     </UL>
     </Grid>
     </Grid>
     <Grid item lg={3} md={3} sm={3} xs={3}>
      <Button>Get Started</Button>
     </Grid>
     </Grid>
    </Container>
  </NavBar>
  <BodyContainer>
    <NavigationContainer>
    <Links to='/'>
    <ArrowBackIosSharpIcon sx={{fontSize: 8 }}/>
    <Navi>Home</Navi>
    </Links>
    </NavigationContainer>
    <Grid container spacing={3}>
    <Grid item lg={2} md={2} sm={1} xs={0}></Grid>
    <Grid item lg={8} md={8} sm={10} xs={12}>
     <Grid container>
     <Grid item lg={6} md={6} sm={6} xs={12}>
     <GrowContainer>
     <GrowHeading>GROW YOUR BUSINESS. GAIN AN ADVANTAGE.</GrowHeading>
     <GrowContent>Use the power of data to give you an edge over your competition. Manager comes with a free dashboard completely tailored to you to help you grow.</GrowContent>
     </GrowContainer>
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={12}>
     <GrowContainer>
     <Iframe src="https://embed.lottiefiles.com/animation/95297"></Iframe>
     </GrowContainer>
    </Grid>
     </Grid>
    </Grid>
    <Grid item lg={2} md={2} sm={1} xs={0}></Grid>
    </Grid>

    <Grid container spacing={3}>
    <Grid item lg={2} md={2} sm={1} xs={0}></Grid>
    <Grid item lg={8} md={8} sm={10} xs={12}>
     <Grid container>
     <Grid item lg={6} md={6} sm={6} xs={12}>
     <GrowContainer>
     <Iframe src="https://embed.lottiefiles.com/animation/43108"></Iframe>
     </GrowContainer>
    </Grid>
     <Grid item lg={6} md={6} sm={6} xs={12}>
     <GrowContainer>
     <GrowHeading>Stay on top of your game</GrowHeading>
     <GrowContent>See how many leads your agents are generating, understand your performance relative to your competitors, view your Quality Score and recommendations on how to boost it and verify your listings and agents.</GrowContent>
     </GrowContainer>
    </Grid>
     </Grid>
    </Grid>
    <Grid item lg={2} md={2} sm={1} xs={0}></Grid>
    </Grid>
    <Grid container spacing={3}>
    <Grid item lg={2} md={2} sm={1} xs={0}></Grid>
    <Grid item lg={8} md={8} sm={10} xs={12}>
     <Grid container>
     <Grid item lg={6} md={6} sm={6} xs={12}>
     <GrowContainer>
     <GrowHeading>Maximise your membership</GrowHeading>
     <GrowContent>Access key statistics like impressions, listing clicks, click-through rates, leads and conversion rates to see where you can improve. Maximise the performance of Premium and Featured by making use of our recommendations on where to allocate them to your best advantage.</GrowContent>
     </GrowContainer>
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={12}>
     <GrowContainer>
     <Iframe src="https://embed.lottiefiles.com/animation/21371"></Iframe>
     </GrowContainer>
    </Grid>
     </Grid>
    </Grid>
    <Grid item lg={2} md={2} sm={1} xs={0}></Grid>
    </Grid>
  </BodyContainer>
  <GrowAddContainer>
    <Grid container>
        <Grid item lg={9} md={9} sm={10} xs={12}>
        <BottomContainer>
    <GrowHeading style={{marginLeft: '6%'}}>Grow your business with Property Finder</GrowHeading>
    <GrowContent style={{marginLeft: '6%'}}>Start connecting with active home seekers and gain exclusive member benefits. Reach the largest, most active property seekers in the NIGERIA with our advertising products.</GrowContent>
    <Button style={{marginLeft: '7.5%'}}>Get Started</Button>
    </BottomContainer>
        </Grid>
        <Grid item lg={3} md={3} sm={2} xs={12}>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <Divider></Divider>
        </Grid>
        <Grid item lg={9} md={9} sm={10} xs={12}>
        <BottomContainer>
    <AddOwnwerHeading style={{marginLeft: '6%'}}>Are you an owner looking to sell or rent your property?</AddOwnwerHeading>
    <GrowContent style={{marginLeft: '6%'}}>Browse more than 3,500 verified agents ready to partner with you on your property journey</GrowContent>
    </BottomContainer>
        </Grid>
        <Grid item lg={3} md={3} sm={2} xs={12}>
        <BottomContainer>
        <FinderAgentBtn type='button' onClick={() => navigate("/findAgent")}>Find an agent</FinderAgentBtn>
        </BottomContainer>
        </Grid>
    </Grid>
  </GrowAddContainer>
  <Footer />
  </Box>
  )
}

export default AgentHub