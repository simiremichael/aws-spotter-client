import React, {useState} from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink } from "react-router-dom";

const LeftInnerGrid = styled(Grid)`
background-color: #008080;;
height: 50px;
`
const LeftContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 0 10px;
height: 100%;
`
const BurgerMenu = styled.svg`
width: 18px;
fill: #ffffff;
cursor: pointer;
`
const CompanyName = styled.p`
color: #ffffff;
font-size: 0.8rem;
`
const CompanyLogo = styled.img`
width: 30px;
height: 30px;
border-radius: 50px;
`
const RightContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 100%;
margin: 0 15px;
`
const InnerRightContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 100%;
`
const InputContainer = styled.div`
border: 0.5px solid #D3D3D3;
height: 26px;
display: flex;
justify-content: space-between;
border-radius: 5px;
width: 150px;
cursor: pointer;
`
const ProfilePix = styled.img`
width: 30px;
height: 30px;
border-radius: 50px;
margin-left: 10px;
cursor: pointer;
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
 const SearchIcon = styled.svg`
 width: 15px;
 fill: #D3D3D3;
 margin-right: 5px
 `
 const SearchSpan = styled.span`
 margin-left: 5px;
 color: #D3D3D3;
 `
 const Bell = styled.svg`
 width: 15px;
 fill: #D3D3D3;
 `
function NavBar() {

  const [sidebar, setSidebar] = useState(false);


  const handleSidebar = () => {
    setSidebar(!sidebar);
  }

  return (
    <>
    {/* <StyledGrid container>
    <StyledContainer> */}
     <LeftInnerGrid item lg={2} md={2} sm={4} xs={4} >
     <LeftContainer>
      <CompanyLogo src={''} />
      <CompanyName>{''}</CompanyName>
      <BurgerMenu onClick={handleSidebar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></BurgerMenu>
     </LeftContainer>
     </LeftInnerGrid>
     <Grid item lg={10} md={10} sm={8} xs={8} >
    <RightContainer>
    <InnerRightContainer>
      <InputContainer>
        <SearchSpan>search</SearchSpan>
        <SearchIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></SearchIcon>
        </InputContainer>
        <ProfilePix src='../images/agent.jpg'/>
        <Notification><Bell xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 32V49.88C328.5 61.39 384 124.2 384 200V233.4C384 278.8 399.5 322.9 427.8 358.4L442.7 377C448.5 384.2 449.6 394.1 445.6 402.4C441.6 410.7 433.2 416 424 416H24C14.77 416 6.365 410.7 2.369 402.4C-1.628 394.1-.504 384.2 5.26 377L20.17 358.4C48.54 322.9 64 278.8 64 233.4V200C64 124.2 119.5 61.39 192 49.88V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32V32zM216 96C158.6 96 112 142.6 112 200V233.4C112 281.3 98.12 328 72.31 368H375.7C349.9 328 336 281.3 336 233.4V200C336 142.6 289.4 96 232 96H216zM288 448C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288z"/></Bell></Notification>
    </InnerRightContainer>
    </RightContainer>
     </Grid>
     {/* </StyledContainer>
    </StyledGrid> */}
    </>
  )
}

export default NavBar

