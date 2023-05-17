import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink, useNavigate} from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {selectCurrentAgent} from '../../services/features/agentSlice';
import { useAppSelector } from '../../app/hooks';
import LogoutIcon from '@mui/icons-material/Logout';
import { useBookEventsMutation, useGetEventByAgentQuery, useGetEventsQuery, useLogoutAgentMutation } from '../../services/api/propertyAPI';
import { TextField } from '@mui/material';



const StyledBox = styled(Box)`
`
const BodyContainerGrid = styled(Grid)`
`
const BodyGrid = styled(Grid)`
background-color: #F8F8FF;
height: 100vh;
`
const StyledContainer = styled.div`
height: 50px;
border-bottom: 0.5px solid #D3D3D3;
display: flex;
width: 100%;
`
const StyledGrid = styled(Grid)`

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
const CreateContactContainer = styled.div`

`
const CreateContacts = styled.div`

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
`
const InnerRightContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 100%;
`
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
 const Bell = styled.svg`
 width: 15px;
 fill: #D3D3D3;
 `
 const SideBarContainer = styled(Grid)`
 height: 655px; 
 width: 225px;
 `
 const NavItemsContainer = styled.div`
 width: 100%;
 height: 100%;
 background-color:  #029999;
 padding-top: 20px;
 transition: height ease-in-out 0.3s;
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
 const CalendarContainer = styled.div`
 margin: 70px 4% 0 4%;
 @media screen and (max-width: 680px) {
  
}
 `
 const BigCalendarContainer = styled.div`
 margin: 70px 4% 15px 4%;
 height: 500px;
 @media screen and (max-width: 680px) {
  margin-top: 30px;
}
 `
 const DateTitleInput = styled.input`
 width: 100%;
 margin-bottom: 10px;
 height: 30px;
 outline: none;
 border-radius: 5px;
 border: 0.5px solid #D3D3D3;
 `
 const DateButton = styled.button`
 width: 100%;
 outline: none;
 background-color: #029999;
 color: #ffffff;
 font-weight: bold;
 border: none;
 height: 30px;
 width: 100%;
 border-radius: 5px;
 cursor: pointer;
 margin-top: 20px;
 `
 const DatePickers = styled(DatePicker)`
 width: 50%;
 outline: none;
 border-radius: 5px;
 height: 30px;
 border: 0.5px solid #D3D3D3;
 color: #494949;
 cursor: pointer;
 `
 const P = styled.p`
 margin: 0;
 color: #494949;
 `
 const LogoutBtn = styled.button`
 border: none;
 outline: none;
 cursor: pointer;
 `
 const Form = styled.form`
 
 `
 const localizer = momentLocalizer(moment)

function CrmCalendar() {

   const [sidebar, setSidebar] = useState(false);
   const [info, setInfo] = useState(true);
  const [newEvent, setNewEvent] = useState({title: '', note: '', start: new Date(), end: new Date() });
  //const [allEvents, setAllEvents] = useState(eventsList);
  
  const [logoutAgent, {isSuccess} ] = useLogoutAgentMutation();

   const handleSidebar = () => {
    setSidebar(!sidebar);
  }

  // const handleAddEvent = () => {
  // setAllEvents([...allEvents, newEvent]);
  // }
  const {agent} = useAppSelector(selectCurrentAgent);
  let navigate = useNavigate();
 // const dispatch = useDispatch();
 {/* @ts-ignore:next-line */}
 const agentId = agent?.result?._id
 const {data} = useGetEventByAgentQuery(agentId);
 const [bookEvents, {isSuccess: eventSuccess}] = useBookEventsMutation();
                                                           
 const handleSumit = async (e: any) => {
  e.preventDefault();
 try {
  {/* @ts-ignore:next-line */}
  await bookEvents(newEvent).unwrap();
 console.log('fulfilled')
} catch (error) {
 console.error('rejected', error);
}
 }    
    
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
    <CreateContactContainer>
      <CreateContacts><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z"/></NavItemsIcon>Create event</CreateContacts>
      </CreateContactContainer>
    </PlusTitleContainer>
    <InnerRightContainer>
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
      {/* <NavItems><NavBarLink to='/contacts'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/></NavItemsIcon>Contacts</NavBarLink></NavItems> */}
      <NavItems><NavBarLink to='/propertyScouting'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M411.4 175.5C417.4 185.4 417.5 197.7 411.8 207.8C406.2 217.8 395.5 223.1 384 223.1H192C180.5 223.1 169.8 217.8 164.2 207.8C158.5 197.7 158.6 185.4 164.6 175.5L260.6 15.54C266.3 5.897 276.8 0 288 0C299.2 0 309.7 5.898 315.4 15.54L411.4 175.5zM288 312C288 289.9 305.9 272 328 272H472C494.1 272 512 289.9 512 312V456C512 478.1 494.1 496 472 496H328C305.9 496 288 478.1 288 456V312zM0 384C0 313.3 57.31 256 128 256C198.7 256 256 313.3 256 384C256 454.7 198.7 512 128 512C57.31 512 0 454.7 0 384z"/></NavItemsIcon>Property Scouting</NavBarLink></NavItems>
      {/* <NavItems><NavBarLink to='/documents'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M447.1 96h-172.1L226.7 50.75C214.7 38.74 198.5 32 181.5 32H63.1c-35.35 0-64 28.66-64 64v320c0 35.34 28.65 64 64 64h384c35.35 0 64-28.66 64-64V160C511.1 124.7 483.3 96 447.1 96zM463.1 416c0 8.824-7.178 16-16 16h-384c-8.822 0-16-7.176-16-16V96c0-8.824 7.178-16 16-16h117.5c4.273 0 8.293 1.664 11.31 4.688L255.1 144h192c8.822 0 16 7.176 16 16V416z"/></NavItemsIcon>Documents</NavBarLink></NavItems>
      <NavItems><NavBarLink to='/finances'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M262.5 256H320V64C320 46.33 334.3 32 352 32C369.7 32 384 46.33 384 64V256H416C433.7 256 448 270.3 448 288C448 305.7 433.7 320 416 320H384V448C384 462.1 374.8 474.5 361.3 478.6C347.8 482.7 333.2 477.5 325.4 465.8L228.2 320H128V448C128 465.7 113.7 480 96 480C78.33 480 64 465.7 64 448V320H32C14.33 320 0 305.7 0 288C0 270.3 14.33 256 32 256H64V64C64 49.9 73.23 37.46 86.73 33.37C100.2 29.29 114.8 34.52 122.6 46.25L262.5 256zM305.1 320L320 342.3V320H305.1zM185.5 256L128 169.7V256H185.5z"/></NavItemsIcon>Finances</NavBarLink></NavItems> */}
      <NavItems><NavBarLink to='/calendar'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z"/></NavItemsIcon><strong>Calendar</strong></NavBarLink></NavItems>
      <NavItems><NavBarLink to='/events'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></NavItemsIcon>Events</NavBarLink></NavItems>
      <NavItems><NavBarLink to='/reports'><NavItemsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 80C160 53.49 181.5 32 208 32H240C266.5 32 288 53.49 288 80V432C288 458.5 266.5 480 240 480H208C181.5 480 160 458.5 160 432V80zM0 272C0 245.5 21.49 224 48 224H80C106.5 224 128 245.5 128 272V432C128 458.5 106.5 480 80 480H48C21.49 480 0 458.5 0 432V272zM400 96C426.5 96 448 117.5 448 144V432C448 458.5 426.5 480 400 480H368C341.5 480 320 458.5 320 432V144C320 117.5 341.5 96 368 96H400z"/></NavItemsIcon>Reports</NavBarLink></NavItems>
    </NavItemsContainer>
     </SideBarContainer>
     )}
     <BodyGrid item lg={sidebar ? 10 : 12} md={sidebar ? 9 : 12} sm={sidebar ? 8 : 12} xs={sidebar ? 6 : 12}>
     { info ?
     <Grid container>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <Form onSubmit={handleSumit}>
                  <CalendarContainer>
                  <DateTitleInput type='text' placeholder='Add Tittle' 
                  value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
                  <TextField
                 id="outlined-textarea"
                 name='note'
                 label="Note"
                 placeholder="Note"
                 multiline
                 fullWidth
                minRows={2}
                value={newEvent.note} onChange={(e) => setNewEvent({...newEvent, note: e.target.value})} 
                />
                  <P> Start date </P>
                 <DatePickers placeholderText='Start Date'
                  selected={newEvent.start}
                   onChange={(start: Date) => setNewEvent({...newEvent, start})} 
                    dateFormat="Pp"
                    showTimeSelect              
                 />
                 <P> End date </P>
                  <DatePickers placeholderText='End Date'
                     selected={newEvent.end} 
                     onChange={(end: Date) => setNewEvent({...newEvent, end})}  
                     dateFormat="Pp"
                     showTimeSelect  
                   />
                  <DateButton type='submit'>Add Event</DateButton>
     
            </CalendarContainer>
            </Form>
              </Grid>
              <Grid item lg={9} md={9} sm={12} xs={12}>
              <BigCalendarContainer>
                 {/* @ts-ignore:next-line */}
              <Calendar localizer={localizer} events={data?.data}
                 startAccessor="start"
                 endAccessor="end"
                 style={{ height: 500 }}
               />
              </BigCalendarContainer>
              </Grid>
   </Grid>
     : ''}
    </BodyGrid>
    </BodyContainerGrid>
    </>
    </StyledBox>
  )
}

export default CrmCalendar



