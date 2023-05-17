import React from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { NavLink} from "react-router-dom";
import CallIcon from '@mui/icons-material/Call';


const StyledBox = styled(Box)`
width: 100%;
height: 60px;
background: rgba( 255, 255, 255, 0.4);
backdrop-filter: blur( 1px );
`
const StyledContainer = styled(Container)`
display: flex;
align-items: center;
justify-content: space-between;
height: 60px;
`
const MenuItemsContainer = styled.div`
height: 100%;
@media screen and (max-width: 900px) {
  display: none;
  justify-content: space-between;
}
`
const UL = styled.ul`
list-style-type: none;
margin-top: 6%;
padding: 0;
`

const MenuItems = styled.li`
cursor: pointer;
font-size: 0.95rem;


`
const CallContainer = styled.div`
display: flex;
justify-content: end;
align-items: center;
@media screen and (max-width: 900px) {
  margin-right: 10px;
}
`
const Call = styled.p`
border: 1px solid;
padding: 6px 8px 4px 8px;
border-color: #008080;
border-radius: 5px;
background-color: inherit;
cursor: pointer;
color: #008080;
:hover{
  background-color: #008080;
  color: #fff;
}
display: flex;
align-items: center;
justify-content: center;
font-weight: 200;
letter-spacing: 1.2px;
margin: 0;
`
const StyledLink = styled(NavLink)`
text-decoration: none;
color: #494949;
height: 80%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: start;
:active{
  color: #000000;
  font-weight: bold;
}
`



function MortgageNavBar() {

  return (
    <StyledBox> 
    <StyledContainer>
        {/* <LogoContainer>
          <StyledLink to='/mortgage'>
            <Logo1><strong>Mortgage</strong></Logo1>
            <Logo2><strong>Finder</strong></Logo2>
          </StyledLink>
        </LogoContainer> */}
        <MenuItemsContainer>
          <UL>
            <MenuItems><StyledLink to='/mortgage-calculator'>CALCULATOR</StyledLink></MenuItems>
           {/* <MenuItems><StyledLink to='/commercial-finance'>COMMERCIAL FINACE</StyledLink></MenuItems>
            <MenuItems><StyledLink to='/how-it-works'>HOW IS WORKS</StyledLink></MenuItems> */}
           </UL>
        </MenuItemsContainer>
        <CallContainer>
         <Call><CallIcon sx={{ fontSize: 18, marginRight: 0.5}}/>+2348024990457</Call>
        </CallContainer>
      </StyledContainer>
    </StyledBox>
  )
}

export default MortgageNavBar

//className={({isActive}) => isActive? 'active': 'inactive'}
//(e: any) => setFormData({...formData, email: e.target.value})