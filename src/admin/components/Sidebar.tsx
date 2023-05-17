import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NavLink, useNavigate } from "react-router-dom";
import {  selectCurrentCompany } from "../../services/features/companySlice";
import {useAppSelector } from '../../app/hooks';
import { toast } from "react-toastify";
import { useLogoutCompanyMutation } from "../../services/api/propertyAPI";
import { ToastContainer } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledLink = styled(NavLink)`
text-decoration: none;
height: 100%;
color: #fff;
margin: 0;              
align-items: start;
:active{
  font-weight: 300;
}
`

  function Sidebar() {
  
  let navigate = useNavigate();
  const {company} = useAppSelector(selectCurrentCompany);
  const [logoutCompany, {isSuccess}] = useLogoutCompanyMutation();
  
    //const dispatchLogOut = useDispatch();

    const handleLogout = () => {
      // dispatchLogOut(companyLogout());
       {/* @ts-ignore:next-line */}
      logoutCompany();
      navigate("/client-login");
  }
//   useEffect(() => { 
//     if(isSuccess) {
//       toast.success('Logout successfully....')
//       navigate("/client-login");
//       }
// }, [isSuccess, navigate])

  return (
    <Container>
      <ProfileContainer>
         {/* @ts-ignore:next-line */}
        <Avatar src={company?.result?.logo} alt='logo' style={{cursor: 'pointer'}} onClick={() => navigate('/adminHomepage')} />
         {/* @ts-ignore:next-line */}
        <Name>{company?.result?.companyName}</Name>
        {company ? <LogoutIcon sx={{color: '#fff', cursor: 'pointer', marginTop: '10px'}} onClick={handleLogout} /> :  <LogoutBtn onClick={handleLogout}>Click to login</LogoutBtn>}
        {/* <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn> */}
      </ProfileContainer>
      <LinksContainer>
        <Links>
            <List>
            <DashboardIcon />
            <NavList><StyledLink to={"/adminHomepage"}>Dashboard</StyledLink></NavList>
            </List>
          <List>
            <ApartmentIcon />
            <NavList><StyledLink to={"/adminHomepage/propertyList"}>Properties</StyledLink></NavList>
            </List>
         
          <List>
            <PeopleIcon />
            <NavList><StyledLink to={"/adminHomepage/agents"}>Agents</StyledLink></NavList>
            </List>
          <List>
            <PersonAddIcon />
            <NavList><StyledLink to={"/adminHomepage/registerAgent"}>Add Agent</StyledLink></NavList>
            </List>
        </Links>
        <ContactContainer>
          <span>Having troubles?</span>
          <a href="#">Contact us </a>
        </ContactContainer>
        <ToastContainer />
      </LinksContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%  !important;
  border-radius: 2rem;
  background-color: #008080;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
    width: 100%;
    height: max-content !important;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Avatar = styled.img`
  height: 7rem;
  border-radius: 6rem;
  margin-top: 20%;
`;

const Name = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.8rem 0 0.5rem 0;
  text-align: center;  
`;

const LinksContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 2rem;
  background: rgba( 255, 255, 255, 0.25 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Links = styled.ul`
  list-style-type: none;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0;
  margin-left: 15%;
  @media screen and (max-width: 900px) { 
   margin-left: 43%;
  }
  @media screen and (max-width: 560px) { 
    margin-left: 36%;
   }
`;

const List = styled.li`
  margin-bottom: 2rem;
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #e4e4e4;
  cursor: pointer;
  h3 {
    font-weight: 300;
  }
  svg {
    font-size: 1.1rem;
  }
  @media only screen and (max-width: 920px) {
    justify-content: center;
  }
  
`;
const NavList = styled.h3`
margin: 0;
`

const ContactContainer = styled.div`
  width: 60%;
  background-color: #008080;
  color: #c4c4c4;
  height: 15%;
  margin: auto auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  a {
    color: white;
    text-decoration: none;
  }

    margin-bottom: 2rem;
`;

const LogoutBtn = styled.button`
 border: none;
 outline: none;
 cursor: pointer;
 `
export default Sidebar;


