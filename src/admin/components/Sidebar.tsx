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
import { useLogoutCompanyMutation, useUpdateCompanyMutation } from "../../services/api/propertyAPI";
import { ToastContainer } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid, FormControl, TextField, CircularProgress } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { LinearProgress } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


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
const FormControls = styled(FormControl)`
display: flex;
width: 100%;
flex-direction: column;
justify-content: space-around;
`
const TextFields = styled(TextField)`
color: #ffffff;
margin-top: 10px;
width: 350px;
width: 100%;
`
const ImgInput = styled.input`
width: 0;
height: 0;
 `
 const SpinnerContainer = styled.div`
 display: flex;
 align-items: center;
justify-content: start; 
width: 80px;
`
 const SpinnerDiv = styled.div`
 width: 100%;
 margin-top: 4px;
 `
 const CompanyLogoContainer = styled.div`
width: 80px;
height: 80px;
border: 0.5px solid #C4C4C4;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-image: url('../../images/blank_avater.jpg');
background-size: 100% 100%;
border-radius: 20px;
`
const CompanyLogo = styled.img`
width: 100%;
height: 100%;
border-radius: 20px;
`
const AgentImgLabel = styled.label`
color: #008080;
width: 100px;
cursor: pointer;
font-size: 0.8rem;
text-align: center;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
`

  function Sidebar() {
  
    const adminInitialState = { companyName: '', phone: '', id: '', email: '', area: '', role: '', address: '', password: '', confirmPassword: '', state: '', L_G_A: '', logo: ''}
    const [adminFormData, setAdminFormData] = useState(adminInitialState)
    let navigate = useNavigate();
  const {company} = useAppSelector(selectCurrentCompany);
  const [logoutCompany, {isSuccess}] = useLogoutCompanyMutation();
  const [updateCompany, {isLoading, isSuccess: updateSuccess}] = useUpdateCompanyMutation();
  useEffect(() => {                 
    if(company) {
       {/* @ts-ignore:next-line */}
       setAdminFormData({...company.result, id: company.result._id});
    }
  }, [company]);

  const [loading, setLoading] = useState(false);
  
    //const dispatchLogOut = useDispatch();

    const handleLogout = () => {
      // dispatchLogOut(companyLogout());
       {/* @ts-ignore:next-line */}
      logoutCompany();
      navigate("/client-login");
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: any) => {
    setAdminFormData({...adminFormData, [e.target.name]: e.target.value})
  }


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleUpload = async (e: any) => {
    setLoading(true);
    const files = e.target.files
     const formData = new FormData();
     formData.append('picture', files[0]);
    await fetch('http://localhost:5000/api/companies/upload', {
     method: 'POST',
     body: formData,
   })
   .then(r => r.json())
   .then(data => {
    console.log(data);
    setAdminFormData({...adminFormData, logo: data.url});
    //setUserFormData({...userFormData, picture: data.url});
       if (data) {
        setLoading(false);
          toast.success('Uploaded successfully....')
         } 
       })
      };

      const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
             {/* @ts-ignore:next-line */}
            await updateCompany({...adminFormData }).unwrap();
        } catch (error) {
          console.error('rejected', error);
        }
      };

      useEffect(() => {
        if (updateSuccess) {
          navigate('adminHomepage')
        }
       },[updateSuccess, navigate])

  return (
    <Container>
      <ProfileContainer>
         {/* @ts-ignore:next-line */}
        <Avatar src={company?.result?.logo} alt='logo' style={{cursor: 'pointer'}} onClick={() => navigate('/adminHomepage')} />
         {/* @ts-ignore:next-line */}
        <Name>{company?.result?.companyName}</Name>
        {company ? <LogoutIcon sx={{color: '#fff', cursor: 'pointer', marginTop: '10px', ":hover": 'logout', }} onClick={handleLogout} /> :  <LogoutBtn onClick={handleLogout}>Click to login</LogoutBtn>}
        <Button onClick={handleOpen}><EditOutlinedIcon style={{ color: 'white', marginTop: 5}} /></Button>
      </ProfileContainer>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <form onSubmit={handleSubmit}>
        <Box sx={style}>
        <Grid container>
            <Grid item lg={2} md={2} sm={3} xs={4}>
                <CompanyLogoContainer>
                  {adminFormData.logo ?
                  <>
                    <CompanyLogo src={adminFormData.logo} />
                    <CloseOutlinedIcon onClick={() => setAdminFormData({...adminFormData, logo: ''})} style={{ marginLeft: '50px', cursor: 'pointer', marginTop: '-60px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
                    </>
                    :
                    <>
                    <ImgInput name='logo'
                      id='img' type='file' accept='image/png, image/jpg, image/jpeg, image/webp'
                      onChange={handleUpload} />
                      <AgentImgLabel htmlFor='img'>Pick logo</AgentImgLabel>
                      </>
                  }
                </CompanyLogoContainer>
                <SpinnerContainer>
                {loading === true ? 
                <SpinnerDiv>
                <LinearProgress />
                </SpinnerDiv>
                : '' }
               </SpinnerContainer>
                {/* <UploadBtn type='button' onClick={handleUpload}>Upload</UploadBtn> */}
            </Grid>
             </Grid>  
          
             <FormControls sx={{marginBottom: 2}}>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <TextFields id="outlined-basic" type='text'  name='companyName' value={adminFormData.companyName} onChange={handleChange} label="Company name" variant="outlined" size='small' />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <TextFields id="outlined-basic" type='text' name='phone' value={adminFormData.phone} onChange={handleChange} label="Phone" variant="outlined" size='small' />
                </Grid>
              </Grid>
                              <Grid container>
                                <>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <TextFields id="outlined-basic" type='email'  name='email' value={adminFormData.email} onChange={handleChange} label="Enter company email" variant="outlined" size='small' />
                              <TextFields
                                id="outlined-basic"
                                type='password'
                                name='password'
                                label="Create password"
                                variant="outlined"
                                size='small'
                                value={adminFormData.password} onChange={handleChange} />
                              <TextFields
                                id="outlined-basic"
                                type='password'
                                name='confirmPassword'
                                label="Confirm password"
                                variant="outlined"
                                size='small'
                                value={adminFormData.confirmPassword} onChange={handleChange} />
                            </Grid>
                          {/* </Grid>
                          <Grid container> */}
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextFields id="outlined-basic" type='text' name='address' value={adminFormData.address} onChange={handleChange} label="company address" variant="outlined" size='small' />
                                <Grid container spacing={1}>
                                  <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <TextFields
                                      id="outlined-basic"
                                      type='text'
                                      name='state'
                                      label="State"
                                      variant="outlined"
                                      size='small'
                                      value={adminFormData.state} onChange={handleChange} />
                                  </Grid>
                                  <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <TextFields
                                      id="outlined-basic"
                                      type='text'
                                      name='area'
                                      label="Area"
                                      variant="outlined"
                                      size='small'
                                      value={adminFormData.area} onChange={handleChange} />
                                  </Grid>
                                  <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <TextFields
                                      id="outlined-basic"
                                      type='text'
                                      name='L_G_A'
                                      label="L_G_A"
                                      variant="outlined"
                                      size='small'
                                      value={adminFormData.L_G_A} onChange={handleChange} />
                                  </Grid>
                                </Grid>
                                </Grid>
                                </>
                                </Grid>
                                </FormControls>
                                <Button style={{background: '#008080', width: '100%', height: '40px', color: 'white'}} type='submit'>{ isLoading ? <CircularProgress  size={12} color='inherit' /> : 'Edit' }</Button>
        </Box>
        </form>
      </Modal>
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
          <a href='mailto:sales@residencespotter.com'>Contact us</a>
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


