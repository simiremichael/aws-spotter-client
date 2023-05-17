import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


const StyledBox = styled(Box)`
height: auto;
background-color: #F5F5F5;
border-top: 0.5px solid #c4c4c4;
`
const StyledContainer = styled(Container)`
align-items: center;
display: flex;
height: 100%;
justify-content: space-between;
width: 100%;
@media screen and (max-width: 780px) {
  flex-wrap: wrap;
  margin-top: 15px;
}
`

const LogoContainer = styled.div`
cursor: pointer;
`
// const Logo1 = styled.h4`
// margin-bottom: 0;
// color: #008080;
// text-align: start;
// `
// const Logo2 = styled.h4`
// margin-top: 0;
// color: #008080;
// text-align: start;
// `

const MenuItemsContainer = styled.div`
height: 100%;
display: flex;
width: 100%;
align-items: center;
justify-content: center;
@media screen and (max-width: 780px) {
  justify-content: start;
}
`
const UL = styled.div`
display: flex;
height: auto;
margin-left: -80px;
  margin: 0;
@media screen and (max-width: 780px) {
    flex-wrap: wrap;
  }
`

const MenuItems = styled.li`
list-style-type: none;
cursor: pointer;
text-align: start;
display: flex;
border-bottom: 0.2px solid #F5F5F5;
padding: 0;
margin: 10px 10px 10px 0;
:hover {
  border-bottom: 0.2px solid #494949;
  transition: ease-in-out, width 0.4s, 0.2s;

}
`
 const RightContainer = styled.div`
 display: flex;
 @media screen and (max-width: 768px) {
  justify-content: start;
}
`
const Img = styled.img`
max-width: 10rem;
cursor: pointer;
@media screen and (max-width: 768px) {
  max-width: 8rem;
}
` 
const Img1 = styled.img`
max-width: 13rem;
cursor: pointer;
margin-left: -5%;
@media screen and (max-width: 768px) {
  max-width: 11rem;
}
` 
const   StyledLink = styled(NavLink)`
text-decoration: none;
:active{
  color: #000000;
  font-weight: bold;
}
color: #494949;
`
const   LogoLink = styled(Link)`
text-decoration: none;
`

const LogoImg = styled.img`
max-width: 120px;
margin-right: 10px;
`


const Footer = () => {
  return (
    <StyledBox>
    <StyledContainer>
    <LogoLink to='/'>
    <LogoContainer>
          <LogoImg  src='../images/logo-only.svg'  />
      </LogoContainer>
      </LogoLink>
      <MenuItemsContainer>
      <UL>
        <StyledLink to='/about'><MenuItems>About us</MenuItems></StyledLink>
        <StyledLink to='/terms&Condition'><MenuItems>Terms & Conditions</MenuItems></StyledLink>
        <StyledLink to='/privacy-policy'><MenuItems>Privacy Policy</MenuItems></StyledLink>
        <StyledLink to='/client-login'><MenuItems>Login as admin/agent</MenuItems></StyledLink>
      </UL>
      </MenuItemsContainer> 
      <RightContainer>
      <Img1 src='../images/google-play.svg' alt='play-store-logo' />
      <Img src='../images/apple-store.svg' alt='apple-store-logo' />
      </RightContainer>
    </StyledContainer>
    </StyledBox>
  )
}

export default Footer