import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink} from "react-router-dom";
import imggif from '../../images/imggif3.gif';
import { useNavigate } from 'react-router-dom';
import { selectCurrentAgent } from '../../services/features/agentSlice';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useLogoutAgentMutation } from '../../services/api/propertyAPI';

const StyledBox = styled(Box)`
`
const BodyContainerGrid = styled(Grid)`
`
const BodyGrid = styled(Grid)`
background-color: #F8F8FF;
width: 100%;
`
const StyledContainer = styled.div`
height: 50px;
border-bottom: 0.5px solid #D3D3D3;
display: flex;
width: 100%;
`
const StyledGrid = styled(Grid)`

`
const LeftInnerGrid = styled(Grid)`
height: 50px;
background-color: #008080;
`
const LeftContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 0 3%;
height: 100%;
`
const BurgerMenu = styled.svg`
width: 18px;
fill: #ffffff;
cursor: pointer;
`
const CompanyName = styled.p`
color: #ffffff;
font-size: 2.5vmin;
@media screen and (max-width: 400px) {
    display: none;
  }
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
color: #383838;
@media screen and (max-width: 800px) {
  display: none;
}
`
const InnerRightContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 100%;
`
// const InputContainer = styled.div`
// border: 0.5px solid #D3D3D3;
// height: 26px;
// display: flex;
// justify-content: space-between;
// border-radius: 5px;
// width: 120px;
// cursor: pointer;
// @media screen and (max-width: 680px) {
//     width: auto;
// }
// `
const ProfilePix = styled.img`
width: 40px;
height: 40px;
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
//  const SearchIcon = styled.svg`
//  width: 15px;
//  fill: #D3D3D3;
//  margin-right: 5px
//  `
//  const SearchSpan = styled.span`
//  margin-left: 5px;
//  color: #D3D3D3;
//  `
 const Bell = styled.svg`
 width: 15px;
 fill: #D3D3D3;
 `
 const SideBarContainer = styled(Grid)`
 height: 655px; 
 width: 225px;
 transition: height ease-in-out 0.5s; 
 `

 const NavItemsContainer = styled.div`
 width: 100%;
 height: 100%;
 background-color:  #029999;
 padding-top: 20px;
 `
 const NavItems = styled.li`
 llist-style-type: none;
 color: #ffffff;
 padding: 20px 0 0 7%;
 display: flex;
 justify-content: start;
 font-size: 1.1rem;
 `
 const NavItemsIcon = styled.svg`
 width: 15px;
 fill: #ffffff;
 margin-right: 5px;
 `
 const NavBarLink = styled(NavLink)`
 text-decoration: none;
 color: #ffffff;
 display: flex;
 align-items: center;
 justify-content: space-around;
 :active{
  front-weight: bold;
 }
 `
 const ContactsContainer = styled.div`
 margin: 30px 0 0 3%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 width: 98%;
 height: 100%;
 @media screen and (min-width: 680px) {
    margin: 20px 6% 0 5%;
}

 `
 const ContactsTitle = styled.p`
 font-size: 1.5rem;
 font-weight: 600;
 color: #383838;
 `
 const ContactsContent = styled.p`
 text-align: start;
 font-size: 2.5vmin;
 `
 const CreateContactsContainer = styled.div`
 
 `
 const CreateContacts = styled.button`
 outline: none;
 border: 0.5px solid #029999;
 height: 36px;
 background-color: #029999;
 color: #ffffff;
 font-weight: 500;
 font-size: 1rem;
 border-radius: 5px;
 cursor: pointer;
 margin-right: 10px;
 `
 const IllustrationContainer = styled.div`
 margin-top: 70px;
 width: 100%;
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 @media screen and (min-width: 680px) {
    margin-top: 140px;
}
 `
 const ImgGif = styled.img`
 width: 70%;
 height: auto;
 `
 const AllProperties = styled.p`
 text-align: start;
 margin-left: 20px;
 font-weight: 600;
 color: #383838;
 `
//  const ItemsContainer = styled.div`
//  display: flex;
//  justify-content: start;
//  margin: 20px;
//  `
//  const  Items = styled.button`
//  padding: 5px 10px;
//  color: #494949;
//  border: 0.5px solid #c4c4c4;
//  outline: none;
//  background: inherit;
//  display: flex;
//  align-items: center;
//  cursor: pointer;
//   :hover {
//     background-color: #fff;
//     color: #029999;
//    }
 
//  `
//  const ItemsSvg = styled.svg`
//  height: 15px;
//  width: 15px;
//  color: #494949;
//  margin-right: 3px;

//  `
 const PropertyBodyContainer = styled.div`
 margin: 5px 20px 20px 20px;
 background-color: #fff;
 min-width: 900px;
 ` 
 const PropertyOuterBodyContainer = styled.div`
 width: 100%;
 @media screen and (max-width: 900px) {
 overflow-x: scroll;
}
 `
 const Plusbutton = styled.div`
 margin-left: 15px;
 background-color: #029999;
 width: 28px;
 height: 28px;
 padding: 0;
 border-radius: 50px;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: width ease-in-out 0.3s;
 :hover {
  width: 120px;
  justify-content: space-between;
  padding: 0 5px;
  ::after{
    content: 'Create new';
    color: #ffffff;
    font-size: 0.9rem;
    padding: 0 2px;
    cursor: pointer;
  }
 }
 @media screen and (max-width: 680px) {
  margin-left: 0;
}
 `
 const PlusTitleContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 `
 const SelectBtn = styled.button`
 width: 100%;
border: none;
outline: none;
height: 40px;
background-color: inherit;
cursor: pointer;
text-align: start;
padding-left: 20px;
:hover {
  background-color: #d3d3d3;
 }
  `
  
 const ActivityHeading = styled.p`
 border: 0.2px solid #d3d3d3;
 margin: 0;
 padding: 15px 5px;
 font-size: 0.7rem;
 font-weight: 600;
 color: #383838;
 text-align: start;
 `
 const Activity = styled.p`
 text-align: start;
 cursor: pointer;
 font-size: 0.7rem;
 margin-left: 5%;
 :hover {
  background-color: #f8f8ff;
 }
 `
 const InnerActivityContainer = styled.div`
 height: 100%;
 border-right: 0.2px solid #d3d3d3;
 `
 const Activityinput = styled.input`
 width: 96%;
 height: 25px;
 border-radius: 5px;
 border: 0.2px solid #c4c4c4;
 outline: none;
 margin-bottom: 5px;
 ` 
 const PropertDetailContainer = styled.div`
 margin: 5px;
 font-size: 0.9rem;
 display: flex;
 align-items: center;                                                                                                                                                                                                                                       
 `
 const BodyTopContainer = styled.div`
 border-left: 0.2px solid #c4c4c4;
 `
 const BodyBottomContainer = styled.div`
 border-right: 0.2px solid #c4c4c4;
 border-left: 0.2px solid #c4c4c4;
 border-bottom: 0.2px solid #c4c4c4;
 : hover {
  background-color: #F5F5F5;
}
 `
 const TickInput = styled.input`
 display: none;
 :checked + label {
  background-color: #008080;
 }
 `
 const TickLabel = styled.label`
 cursor: pointer;
 width: 20px;
 height: 30px;
 border-radius: 50px;
 `
 const TickSvg = styled.svg`
 width: 20px;
 height: 15px;
 color: #c4c4c4;
 margin-top: 30%;
 `
const UserImg = styled.img`
 width: 30px;
 height: 30px;
 margin-right: 10px;
 object-fit: cover;
 border-radius: 5px;
 `
 const LogoutBtn = styled.button`
 border: none;
 outline: none;
 cursor: pointer;
 `

function Contacts() {
 
   let navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [info, setInfo] = useState(true)
    const [all, setAll] = useState(true);
    const [active, setActive] = useState(false);
    const [reserved, setReserved] = useState(false);
    const [sold, setSold] = useState(false);
    const [archive, setArchive] = useState(false);

    const [logoutAgent, {isSuccess} ] = useLogoutAgentMutation();
    
  const handleSidebar = () => {
    setSidebar(!sidebar);
  }
  
    const handleAll = () => {
      setAll(true)
      setActive(false)
      setSold(false)
      setReserved(false)
      setArchive(false)
    }
    const handleActive = () => {
      setActive(true)
      setAll(false)
      setSold(false)
      setReserved(false)
      setArchive(false)
    }
    const handleSold = () => {
      setSold(true)
      setAll(false)
      setActive(false)
      setReserved(false)
      setArchive(false)
    }
    const handleReserved = () => {
      setReserved(true)
      setAll(false)
      setActive(false)
      setSold(false)
      setArchive(false)
    }
    const handleArchive = () => {
      setArchive(true)
      setAll(false)
      setActive(false)
      setSold(false)
      setReserved(false)
    }
    const handleNavigate = () => {
     navigate('/contacts/contactform');
    }
    const {agent} = useAppSelector(selectCurrentAgent);
    //const dispatch = useDispatch();
    
    const handleLogout = async () => {
      try {
        {/* @ts-ignore:next-line */}
        await logoutAgent().unwrap();
       console.log('fulfilled')
     } catch (error) {
       console.error('rejected', error);
     }
    }

    useEffect(() => {
      if (isSuccess) {
        navigate("/client-login");
      }
    },[isSuccess, navigate])
      
    
  return (
    <StyledBox>
      <StyledGrid container>
      <StyledContainer>
       <LeftInnerGrid item lg={2} md={3} sm={4} xs={6} >
       <LeftContainer>
        {/* @ts-ignore:next-line */}
       <ProfilePix src={agent?.result?.profilePicture}/>
         {/* @ts-ignore:next-line */}
        <CompanyName>{agent?.result?.name}</CompanyName>
        {agent ? <LogoutIcon sx={{color: '#fff', cursor: 'pointer'}} onClick={handleLogout} /> :  <LogoutBtn onClick={() => navigate("/client-login")}>Click to login</LogoutBtn>}
        <BurgerMenu onClick={handleSidebar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></BurgerMenu>
       </LeftContainer>
       </LeftInnerGrid>
       <Grid item lg={10} md={9} sm={8} xs={6} >
      <RightContainer>
      <PlusTitleContainer>
      <Title>Contacts</Title>
      <Plusbutton onClick={handleNavigate}><AddOutlinedIcon style={{color: 'white'}}/></Plusbutton>
      </PlusTitleContainer>
      <InnerRightContainer>
        {/* <InputContainer>
          <SearchSpan>search</SearchSpan>
          <SearchIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></SearchIcon>
          </InputContainer> */}
          {/* @ts-ignore:next-line */}
        <CompanyLogo src={agent?.result?.logo} />
          <Notification><Bell xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 32V49.88C328.5 61.39 384 124.2 384 200V233.4C384 278.8 399.5 322.9 427.8 358.4L442.7 377C448.5 384.2 449.6 394.1 445.6 402.4C441.6 410.7 433.2 416 424 416H24C14.77 416 6.365 410.7 2.369 402.4C-1.628 394.1-.504 384.2 5.26 377L20.17 358.4C48.54 322.9 64 278.8 64 233.4V200C64 124.2 119.5 61.39 192 49.88V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32V32zM216 96C158.6 96 112 142.6 112 200V233.4C112 281.3 98.12 328 72.31 368H375.7C349.9 328 336 281.3 336 233.4V200C336 142.6 289.4 96 232 96H216zM288 448C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288z"/></Bell></Notification>
      </InnerRightContainer>
      </RightContainer>
       </Grid>
       </StyledContainer>
      </StyledGrid>
     <>
      <BodyContainerGrid container>
      { sidebar && (
      <SideBarContainer  item lg={2} md={3} sm={4} xs={6}>
      <NavItemsContainer>
        <NavItems><NavBarLink to='/dashboard'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 96C0 60.65 28.65 32 64 32H448C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96zM64 416H224V160H64V416zM448 160H288V416H448V160z"/></NavItemsIcon>Dashboard</NavBarLink></NavItems>
        <NavItems><NavBarLink to='/agentproperties'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"/></NavItemsIcon>Properties</NavBarLink></NavItems>
        <NavItems><NavBarLink to='/contacts'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/></NavItemsIcon><strong>Contacts</strong></NavBarLink></NavItems>
        <NavItems><NavBarLink to='/propertyScouting'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M411.4 175.5C417.4 185.4 417.5 197.7 411.8 207.8C406.2 217.8 395.5 223.1 384 223.1H192C180.5 223.1 169.8 217.8 164.2 207.8C158.5 197.7 158.6 185.4 164.6 175.5L260.6 15.54C266.3 5.897 276.8 0 288 0C299.2 0 309.7 5.898 315.4 15.54L411.4 175.5zM288 312C288 289.9 305.9 272 328 272H472C494.1 272 512 289.9 512 312V456C512 478.1 494.1 496 472 496H328C305.9 496 288 478.1 288 456V312zM0 384C0 313.3 57.31 256 128 256C198.7 256 256 313.3 256 384C256 454.7 198.7 512 128 512C57.31 512 0 454.7 0 384z"/></NavItemsIcon>Property Scouting</NavBarLink></NavItems>
        {/* <NavItems><NavBarLink to='/documents'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M447.1 96h-172.1L226.7 50.75C214.7 38.74 198.5 32 181.5 32H63.1c-35.35 0-64 28.66-64 64v320c0 35.34 28.65 64 64 64h384c35.35 0 64-28.66 64-64V160C511.1 124.7 483.3 96 447.1 96zM463.1 416c0 8.824-7.178 16-16 16h-384c-8.822 0-16-7.176-16-16V96c0-8.824 7.178-16 16-16h117.5c4.273 0 8.293 1.664 11.31 4.688L255.1 144h192c8.822 0 16 7.176 16 16V416z"/></NavItemsIcon>Documents</NavBarLink></NavItems>
        <NavItems><NavBarLink to='/finances'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M262.5 256H320V64C320 46.33 334.3 32 352 32C369.7 32 384 46.33 384 64V256H416C433.7 256 448 270.3 448 288C448 305.7 433.7 320 416 320H384V448C384 462.1 374.8 474.5 361.3 478.6C347.8 482.7 333.2 477.5 325.4 465.8L228.2 320H128V448C128 465.7 113.7 480 96 480C78.33 480 64 465.7 64 448V320H32C14.33 320 0 305.7 0 288C0 270.3 14.33 256 32 256H64V64C64 49.9 73.23 37.46 86.73 33.37C100.2 29.29 114.8 34.52 122.6 46.25L262.5 256zM305.1 320L320 342.3V320H305.1zM185.5 256L128 169.7V256H185.5z"/></NavItemsIcon>Finances</NavBarLink></NavItems> */}
        <NavItems><NavBarLink to='/calendar'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z"/></NavItemsIcon>Calendar</NavBarLink></NavItems>
        <NavItems><NavBarLink to='/events'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></NavItemsIcon>Events</NavBarLink></NavItems>
        <NavItems><NavBarLink to='/reports'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 80C160 53.49 181.5 32 208 32H240C266.5 32 288 53.49 288 80V432C288 458.5 266.5 480 240 480H208C181.5 480 160 458.5 160 432V80zM0 272C0 245.5 21.49 224 48 224H80C106.5 224 128 245.5 128 272V432C128 458.5 106.5 480 80 480H48C21.49 480 0 458.5 0 432V272zM400 96C426.5 96 448 117.5 448 144V432C448 458.5 426.5 480 400 480H368C341.5 480 320 458.5 320 432V144C320 117.5 341.5 96 368 96H400z"/></NavItemsIcon>Reports</NavBarLink></NavItems>
      </NavItemsContainer>
       </SideBarContainer>
       )}
       <BodyGrid item lg={sidebar ? 10 : 12} md={sidebar ? 9 : 12} sm={sidebar ? 8 : 12} xs={sidebar ? 6 : 12} onClick={() => setSidebar(false)}>
       { !info ?
       <Grid container>
       <Grid item lg={6} md={6} sm={12} xs={12}>
       <ContactsContainer>
       <ContactsTitle>Contacts</ContactsTitle>
        <ContactsContent>
        Create high quality contact database. Enrich contact record with assigned properties, events, notes, tasks, important documents. Share your contacts with the rest of your company.
        </ContactsContent>
        <CreateContactsContainer>
        <CreateContacts>Create Contacts</CreateContacts>
        <CreateContacts>Import Contacts</CreateContacts>
        </CreateContactsContainer>
       </ContactsContainer>
     </Grid>
     <Grid item lg={6} md={6} sm={12} xs={12}>
      <IllustrationContainer>
       <ImgGif src={imggif} />
      </IllustrationContainer>
     </Grid>
     </Grid>
       
       : 
       <>
       <Grid container>
        <Grid item lg={2} md={3} sm={4} xs={6}>
        <AllProperties>All Contacts</AllProperties>
        </Grid>
       </Grid>
       {/* <ItemsContainer>
        <Items>
        <ItemsSvg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M8.5 5A3.5 3.5 0 0 0 5 8.5v15A3.5 3.5 0 0 0 8.5 27h15a3.5 3.5 0 0 0 3.5-3.5V19a1 1 0 1 1 2 0v4.5a5.5 5.5 0 0 1-5.5 5.5h-15A5.5 5.5 0 0 1 3 23.5v-15A5.5 5.5 0 0 1 8.5 3H13a1 1 0 1 1 0 2H8.5ZM18 4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0V6.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L25.586 5H19a1 1 0 0 1-1-1Z"/></ItemsSvg>
          open
          </Items>
        <Items>
        <ItemsSvg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585l1.594-1.58zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006v-1.589z"/><path fill="currentColor" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"/></ItemsSvg>
          bulk edit
          </Items>
        <Items>
        <ItemsSvg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576L6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76l7.494-7.493Z"/></ItemsSvg>
          send listing presentaton
          </Items>
        <Items>
        <ItemsSvg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l4-5h-3V4h-2v7H8z"/><path fill="currentColor" d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"/></ItemsSvg>
          download xls
          </Items>
        <Items>
        <ItemsSvg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"/></ItemsSvg>
          delete
          </Items>
       </ItemsContainer> */}
       <PropertyOuterBodyContainer>
       <PropertyBodyContainer>
        <Grid container>
          <Grid item lg={2.4} md={2.4} sm={2.4} xs={3}>
           <SelectBtn onClick={handleAll} style={{ borderRadius: '5px 0 0 0 ', borderBottom: '3px solid #191970', backgroundColor: all ? '#191970': '', color: all ? '#fff': ''}}>ALL</SelectBtn>
          </Grid>  
          <Grid item lg={2.4} md={2.4} sm={2.4} xs={3}>
           <SelectBtn  onClick={handleActive} style={{borderBottom: '3px solid #32CD32', backgroundColor: active ? '#32CD32': '', color: active ? '#fff': ''}}>Prospect</SelectBtn>
          </Grid>   
          <Grid item lg={2.4} md={2.4} sm={2.4} xs={3}>
           <SelectBtn  onClick={handleReserved} style={{borderBottom: '3px solid #4169E1', backgroundColor: reserved ? '#4169E1': '', color: reserved ? '#fff': ''}}>Lead</SelectBtn>
           </Grid>   
           <Grid item lg={2.4} md={2.4} sm={2.4} xs={3}>
           <SelectBtn  onClick={handleSold} style={{ borderBottom: '3px solid #FF8C00', backgroundColor: sold ? '#FF8C00': '', color: sold ? '#fff': ''}}>Buyer</SelectBtn>
            </Grid>
            <Grid item lg={2.4} md={2.4} sm={2.4} xs={3}>
           <SelectBtn  onClick={handleArchive} style={{borderRadius: '0 5px 0 0 ',borderBottom: '3px solid #2f4f4f', backgroundColor: archive ? '#2f4f4f': '', color: archive ? '#fff': ''}}>Archive</SelectBtn>
            </Grid>
        </Grid>
        <BodyTopContainer>
        <Grid container>
          <Grid item lg={0.5} md={0.5} sm={0.5} xs={0.5}>
          <ActivityHeading style={{color: '#fff'}}>tick</ActivityHeading>
         <InnerActivityContainer>
          <PropertDetailContainer></PropertDetailContainer>
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={0.5} md={0.5} sm={0.5} xs={0.5}>
            <ActivityHeading style={{color: '#fff'}}>icon</ActivityHeading>
            <InnerActivityContainer>
            <PropertDetailContainer>
            </PropertDetailContainer>
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <ActivityHeading>Name</ActivityHeading>
            <InnerActivityContainer>
            <Activityinput type='text'  />
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <ActivityHeading>Phone</ActivityHeading>
            <InnerActivityContainer>
            <Activityinput type='text'  />
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <ActivityHeading>Email</ActivityHeading>
            <InnerActivityContainer>
            <Activityinput  type='text'  />
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <ActivityHeading>Updated</ActivityHeading>
            <InnerActivityContainer>
            <Activityinput placeholder='from' type='number'  />
            <Activityinput placeholder='to' type='number'  />
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <ActivityHeading>Record Owner</ActivityHeading>
            <InnerActivityContainer>
            <Activityinput  type='search'  />
          </InnerActivityContainer> 
            </Grid>
            </Grid>
            </BodyTopContainer>

            <BodyBottomContainer>
            <Grid container>
          <Grid item lg={0.5} md={0.5} sm={0.5} xs={0.5}>
         <InnerActivityContainer>
          <PropertDetailContainer>
          <TickInput type='checkbox' id='ticks' name='tick' />
          <TickLabel htmlFor='ticks' ><TickSvg  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m2.75 8.75l3.5 3.5l7-7.5"/></TickSvg></TickLabel>
          </PropertDetailContainer>
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={0.5} md={0.5} sm={0.5} xs={0.5}>
            <InnerActivityContainer>
            <PropertDetailContainer>

            </PropertDetailContainer>
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <InnerActivityContainer>
            <PropertDetailContainer>
             <Activity>Simire Michael </Activity>
            </PropertDetailContainer>
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <InnerActivityContainer>
            <PropertDetailContainer>
              <Activity>08067253462</Activity>
            </PropertDetailContainer>
            </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <InnerActivityContainer>
            <PropertDetailContainer>
              <Activity>simiremichael@gmail.com</Activity>
            </PropertDetailContainer>
            </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <InnerActivityContainer>
            <PropertDetailContainer>
              <Activity>{new Date().toLocaleDateString()}</Activity>
            </PropertDetailContainer>
            </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <InnerActivityContainer>
            <PropertDetailContainer>
            <UserImg src='../../images/agent.jpg'/>
              <Activity>Simire Michael</Activity>
            </PropertDetailContainer>
          </InnerActivityContainer> 
            </Grid>
            </Grid>
            </BodyBottomContainer>

            <BodyBottomContainer>
            <Grid container>
          <Grid item lg={0.5} md={0.5} sm={0.5} xs={0.5}>
         <InnerActivityContainer>
          <PropertDetailContainer>
          <TickInput type='checkbox' id='ticks' name='tick' />
          <TickLabel htmlFor='ticks' ><TickSvg  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m2.75 8.75l3.5 3.5l7-7.5"/></TickSvg></TickLabel>
          </PropertDetailContainer>
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={0.5} md={0.5} sm={0.5} xs={0.5}>
            <InnerActivityContainer>
            <PropertDetailContainer>

            </PropertDetailContainer>
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <InnerActivityContainer>
            <PropertDetailContainer>
             <Activity>Simire Michael </Activity>
            </PropertDetailContainer>
          </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <InnerActivityContainer>
            <PropertDetailContainer>
              <Activity>08067253462</Activity>
            </PropertDetailContainer>
            </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <InnerActivityContainer>
            <PropertDetailContainer>
              <Activity>simiremichael@gmail.com</Activity>
            </PropertDetailContainer>
            </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <InnerActivityContainer>
            <PropertDetailContainer>
              <Activity>{new Date().toLocaleDateString()}</Activity>
            </PropertDetailContainer>
            </InnerActivityContainer> 
            </Grid>
            <Grid item lg={2.2} md={2.2} sm={2.2} xs={2.2}>
            <InnerActivityContainer>
            <PropertDetailContainer>
            <UserImg src='../../images/agent.jpg'/>
              <Activity>Simire Michael</Activity>
            </PropertDetailContainer>
          </InnerActivityContainer> 
            </Grid>
            </Grid>
            </BodyBottomContainer>
       </PropertyBodyContainer>
       </PropertyOuterBodyContainer>
       </>
       }
      </BodyGrid>
      </BodyContainerGrid>
      </>
      </StyledBox>
    )
}

export default Contacts