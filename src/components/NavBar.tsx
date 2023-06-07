import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { NavLink} from "react-router-dom";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { ClickAwayListener, Tooltip, Menu, IconButton, LinearProgress, Backdrop, CircularProgress} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { useSigninUserMutation, useSignupUserMutation,  useGoogleSignInMutation, useLogoutUserMutation} from '../services/api/propertyAPI';
import jwt_decode from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import Avatar from '@mui/material/Avatar';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCurrentUser, setUsers, logoutUsers} from '../services/features/userSlice';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
//import LogoImg from '../images/R.png';

const StyledBox = styled(Box)`
width: 100%;
height: 80px;
`
const StyledContainer = styled(Container)`
display: flex;
background-color: #ffffff;
align-items: center;
justify-content: space-between;
height: 80px;
`
const LogoContainer = styled.div`
cursor: pointer;
display: flex;
height: 80px;
align-items: center;
`
const Logo1 = styled.h4`
margin-bottom: 0;
color: #008080;
text-align: start;
font-size: 1.2rem;

`
const Logo2 = styled.h4`
margin-top:-8px;
color: #008080;
text-align: start;
font-size: 1.2rem;
`

const MenuItemsContainer = styled.div`
height: 100%;
@media screen and (max-width: 900px) {
  display: none;
  justify-content: space-between;
}
`
const UL = styled.ul`
display: flex;
list-style-type: none;
align-items: center;
height: 100%;
margin: 0;
padding: 0;
`
const NUL = styled.ul`
display: flex;
align-items: center;
justify-content: center;
list-style-type: none;
align-items: center;
@media screen and (max-width: 768px) {
  flex-direction: column;
}
`
const MenuItems = styled.li`
cursor: pointer;
margin: 0 15px;
@media screen and (min-width: 901px) {
  margin: 0 10px;
}
`
const NavMenuItems = styled.li`
margin: 10px;
cursor: pointer;
font-size: 1rem;
:hover {
  font-weight: bold;
}
border-bottom: 0.5px solid gray;
@media screen and (min-width: 769px) {
  margin: 7px;
}
`
const IconButtons = styled(IconButton)`
@media screen and (min-width: 901px) {
  display: none;
}
`
const LoginContainer = styled.div`
@media screen and (max-width: 900px) {
  display: none;
}
height: 80px;
display: flex;
justify-content: end;
align-items: center;
@media screen and (max-width: 900px) {
  margin-right: 10px;
}
`
const LoginButton = styled.button`
margin-left: 10px;
border: 1px solid;
padding: 8px 13px;
border-color: #e7e7e7;
background-color: inherit;
box-shadow: none;
cursor: pointer;
color: #008080;
font-weight: bold;
:hover{
  background-color: #F8F8FF;
}

`
const NavLoginButton = styled.button`
margin: 10px 10px 10px -1px;
border: 1px solid;
width: 120px;
padding: 10px 18px;
border-color: #e7e7e7;
background-color: #008080;
box-shadow: none;
cursor: pointer;
color: #fff;
font-weight: bold;
border-radius: 10px;
@media screen and (min-width: 600px) {
  width: 85px;
}
`
const StyledLink = styled(NavLink)`
text-decoration: none;
color: #494949;
height: 100%;
display: flex;
margin: 0;
flex-direction: column;
justify-content: center;
align-items: start;
:active{
  color: #000000;
  font-weight: bold;
}
`
const FormContainer = styled.div`
display: flex;
justify-content: center;
@media screen and (max-width: 768px) {
  width: 100%;
 }
`
const Forms = styled.form`
margin-top: 65px;
width: 400px;
height: auto;
background: rgba( 0, 0, 0, 0.7);
backdrop-filter: blur( 20px );
position: absolute;
z-index: 1002;
padding: 20px 10px;
transition: height 0.8s ease-in-out;
@media screen and (max-width: 768px) {
  padding: 20px 4%;
  width: 85%;
 }
`
const InnerFormContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`
const TextFields = styled(TextField)`
color: #ffffff;
margin-top: 10px;
width: 350px;
width: 100%;
`
const ButtonContainer = styled.div`
display: flex;
justify-content: end;
margin: 10px 0 0 0;
font-size: 0.9rem;
`
const Button = styled.button`
background: inherit;
color: #4169E1;;
border: none;
cursor: pointer;
font-size: 1rem;
`
const TitleContainer = styled.div`
display: flex;
justify-content: center;
width: 100%;
`
const FormTitle = styled.h2`
color: #ffffff;
font-size: 2rem;
margin-top: 10px;
`
const ForgetPasswordContainer = styled.div`
display: flex;
justify-content: end;
`
const ForgetPassword = styled.p`
color: #ffffff;
font-size: 0.7rem;
color: #4169E1;
`
const LogButton = styled.button`
width: 100%;
background-color: #008080;
color: #ffffff;
height: 40px;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 1.2rem;
margin-top: 20px;
`
const SwitchContainer = styled.div`
display: flex;
justify-content: end;
margin: 10px 0 0 0;
align-items: center;
`
const SwitchP = styled.p`
color: #ffffff;
margin-right: 5px;
font-size: 0.9rem;
`
const SwitchButton = styled.button`
background: inherit;
border: none;
color: #4169E1;
cursor: pointer;
font-size: 0.8rem;
`
const FormControls = styled(FormControl)`
display: flex;
width: 100%;
flex-direction: column;
justify-content: space-around;
`
const GoogleContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
@media screen and (max-width: 768px) {
  width: 100%;
 }
`
const Div = styled.div`
width: 100%;
color: #fff;
margin-top: 10px;
font-size: 0.8rem;
margin-bottom: 5px;
`
const TopContainer = styled.div`
display: flex;
margin-bottom: 15px;
`

const ClickAwayDiv = styled.div`
margin: 0;
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
const ImgInput = styled.input`
width: 0;
height: 0;
 `
//  const UploadBtn = styled.button`
// width: 80px;
// height: auto;
// margin: 5px 0;
// padding-top: 2px;
// padding-bottom: 2px;
// color: #fff;
// background: #008080;
// border: none;
// outline: none;
// border-radius: 5px;
// cursor: pointer;
// `
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
const BoxInnerContainer = styled(Container)`
margin-bottom: 10px;
border-top: 0.5px solid gray;
@media screen and (min-width: 901px) {
  display: none;
}
`

const LogoImg = styled.img`
max-width: 140px;
`

function NavBar() {

  const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', familyName: '', givenName: '', picture: '', role: ''}
const [files, setFiles] = useState('')
    const [login, setLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
     const [isSignup, setIsSignup] = useState(false);
     const [loading, setLoading] = useState(false);
     const [userFormData, setUserFormData] = useState(initialState);
     // const [googleData, setGoogleData] = useState('');
     let navigate = useNavigate();
     const [signinUser, { data, isError, error, isSuccess, isLoading: loadingUser } ] = useSigninUserMutation()
     const [googleSignIn, { data: data1, isSuccess: isSuccess1, isLoading: loadingGoogleUser } ] =  useGoogleSignInMutation()  
      const [signupUser, {isSuccess: isSuccess2, isLoading}] = useSignupUserMutation();
      const [logoutUser, {isSuccess: logoutSuccess}] = useLogoutUserMutation();
    
      const [open, setOpen] = useState(false);
    
      const handleDrawerOpen = () => {
        setOpen(!open);
      };
   
    const dispatch = useAppDispatch()
    const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
      }
      const toggleLogin = () => {
        setLogin(!login);
      }
      useEffect(() => {
        if(isSuccess) {
          dispatch(setUsers({ user: data, token: data?.token}));
          toast.success('Login successfully....')
        setShowPassword(false);
        setIsSignup(false);
        navigate("/");
        setLogin(false);
        clear();
        setAnchorElUser(null)
        };
        if(isSuccess1) {
          localStorage.setItem('my-property-finder-user', JSON.stringify({ user: data1, token: data1?.token }))
          setShowPassword(false);
          setIsSignup(false);
          toast.success('Login successfully....')
           window.location.reload();
          //  navigate("/");
          // setLogin(false);
          // clear();
          };
          if(isSuccess2) {
            navigate("/");
            toast.success('Signup successfully....')
          setLogin(false);
          setIsSignup(false);
          clear();
            }
        if(isError) {
          console.log(error)
        }
      }, [isSuccess, isSuccess1, isSuccess2,setLogin, setIsSignup, dispatch, error, isError, data, data1])
      
    const {user} = useAppSelector(selectCurrentUser);
    const handleChange = (e: any) => {
      setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }
  
      const  handleSubmit = async (e: any) => {
        e.preventDefault();
        if(isSignup) {
          await signupUser(userFormData).unwrap().then((payload: any) => console.log('fulfilled')).catch((error: any) => console.error('rejected', error));
        } else {
         await signinUser(userFormData).unwrap().then((payload: any) => console.log('fulfilled')).catch((error: any) => console.error('rejected', error));
        } 
        }

      const googleSuccess = async (res: any) => {
        const userObject = jwt_decode(res.credential)
        const result = userObject
        try {
               {/* @ts-ignore:next-line */}
            googleSignIn(result).unwrap().then((payload: any) => console.log('fulfilled')).catch((error: any) => console.error('rejected', error));
            setLogin(false);
            
          } catch (error) {
          console.log(error);
        }
        // setGoogleData(JSON.parse(localStorage.getItem('user') || 'false'));
        // if (isSuccess1) {
        // window.location.reload();
        // }
      }
      
      const googleFailure = () => {
        console.log('Google Sign In unsuccessful')
      }
     
      const handleClickAway = () => {
        setLogin(false);
        setOpen(false);
      };
    
      const clear = () => {
        setUserFormData(initialState)
          }
      // const dispatchLogOut = useDispatch();
      
      const handleLogout = async () => {
        try {
           {/* @ts-ignore:next-line */}
           await logoutUser().unwrap();
          console.log('fulfilled')
          // dispatch(logoutUsers());
        } catch (error) {
          console.error('rejected', error);
        }
      }
      useEffect(() => {
        if (logoutSuccess) {
          navigate("/");
        }
      },[navigate, logoutSuccess])
  
// const handleUpload = async (e: any) => {
//   setLoading(true);
//   const files = e.target.files
    
//   for ( const file of files) {
//    const formData = new FormData();
//    formData.append('file', file);
//    {/* @ts-ignore:next-line */}
//    formData.append('upload_preset', 'userProfileImg');
//   await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
//    method: 'POST',
//    body: formData,
//  })
//  
//      };
//   };

const handleUpload = async (e: any) => {
  setLoading(true);
  const files = e.target.files
   const formData = new FormData();
   formData.append('picture', files[0]);
  await fetch('https://residencespotter-server.casa/api/users/upload', {
   method: 'POST',
   body: formData,
 })
 .then(r => r.json())
 .then(data => {
  setUserFormData({...userFormData, picture: data.url});
     if (data) {
      setLoading(false);
        toast.success('Uploaded successfully....')
       } 
     })
     };


  // const deleteImage = async (e: any) => {
  //   e.preventDefault();
  //   {/* @ts-ignore:next-line */}
  //     formData.append(process.env.REACT_APP_CLOUD_PRESET, 'profileImg');
  //     await fetch(`curl https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_KEY}/delete_by_token/-X POST/--data/token=${publicId}`,  {
  //       method: 'POST'
  //      })
  //       .then((resp: any) => console.log(resp))
  //       .catch((_err:any)=> console.log("Something went wrong, please try again later."));
  // }


const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElNav(event.currentTarget);
};
const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElUser(event.currentTarget);
};
const handleCloseNavMenu = () => {
  setAnchorElNav(null);
};

const handleCloseUserMenu = () => {
  setAnchorElUser(null);
};
  return (
    <>
    <ClickAwayListener onClickAway={handleClickAway}>
        <ClickAwayDiv>
    <StyledBox>
       <FormContainer>
        { login && (
        <Forms onSubmit={handleSubmit}>
          <InnerFormContainer>
            <ButtonContainer >
            <Button onClick={toggleLogin}><strong>Close</strong></Button>
            </ButtonContainer>
            <Grid container>

             { !isSignup ?
             <>
             {/* { loadingUser || loadingGoogleUser ?
              <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open>
          <CircularProgress color="inherit" />
           </Backdrop>
            : */}
            <Grid item lg={12} md={12} sm={12} xs={12}>
            <TitleContainer>
              <FormTitle>Sign in</FormTitle>
              </TitleContainer>
              <FormControls sx={{input:{color: 'white'}, "& .MuiOutlinedInput-root": {"& > fieldset": {borderColor: "white" },}, "& .MuiInputLabel-root": {color: 'white'}, "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "white"}},  "& .MuiOutlinedInput-root:hover": {"& > fieldset": {borderColor: "white"}} }}>
          <TextFields autoComplete='off' id="outlined-basic" type='email' name='email' value={userFormData.email} onChange={handleChange} label="Enter your email" variant="outlined" size='small'  />
          <TextFields id="outlined-basic" type='password' name='password' value={userFormData.password} onChange={handleChange} label="Enter your password" variant="outlined" size='small'  />
          </FormControls>
          <ForgetPasswordContainer>
        <Link to={'/generateOTP'}><ForgetPassword>Forgot password?</ForgetPassword></Link>
        </ForgetPasswordContainer>
        </Grid>
        {/* } */}
        </>
        :
        <>
       <TitleContainer>
        <FormTitle>Sign up</FormTitle>
        </TitleContainer>
         <TopContainer>
          <Grid container>
           <Grid item lg={2} md={2} sm={3} xs={4}>
                <CompanyLogoContainer>
                  {userFormData.picture ?
                  <>
                    <CompanyLogo src={userFormData.picture} />
                    <CloseOutlinedIcon onClick={() => setUserFormData({...userFormData, picture: ''})} style={{ marginLeft: '50px', cursor: 'pointer', marginTop: '-60px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
                    </>
                    :
                    <>
                    {/* (e: any) => setPicture(e.target.files) */}
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
                {/* <UploadBtn type='button' onClick={deleteImage}>Upload</UploadBtn> */}
            </Grid>
            </Grid>
           </TopContainer>  
        
        <FormControls sx={{input:{color: 'white'}, "& .MuiOutlinedInput-root": {"& > fieldset": {borderColor: "white" },}, "& .MuiInputLabel-root": {color: 'white'}, "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "white"}},  "& .MuiOutlinedInput-root:hover": {"& > fieldset": {borderColor: "white"}} }}>
        <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={6} xs={6}>
        <TextFields id="outlined-basic" type='text' name='firstName' value={userFormData.firstName} onChange={handleChange} label="First name" variant="outlined" size='small'  />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
          <TextFields id="outlined-basic" type='text' name='lastName' value={userFormData.lastName} onChange={handleChange} label="Last name" variant="outlined" size='small'  />
          </Grid>  
          </Grid>
          <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextFields id="outlined-basic" type='email' name='email' value={userFormData.email} onChange={handleChange}  label="Enter your email" variant="outlined" size='small'  />
          <TextFields 
          id="outlined-basic" 
          type='password' 
          name='password'  
          label="Create your password" 
          variant="outlined" 
          size='small'  
          value={userFormData.password} onChange={handleChange} 
          />
          <TextFields 
          id="outlined-basic" 
          type='password' 
          name='confirmPassword' 
          label="ConfirmPassword" 
          variant="outlined" 
          size='small'  
          value={userFormData.confirmPassword} onChange={handleChange} 
          />
          </Grid>
          </Grid>
          </FormControls>
       </> } 
        <LogButton type='submit'><strong>{!isSignup ?   loadingUser ? <CircularProgress  size={12} color='inherit' />  : 'Login' :  `${ loadingUser ? <CircularProgress /> : 'Create account'}`}</strong></LogButton>
          {!isSignup ? 
         <>
        <Div id='signinDiv'>Log in with google</Div>
        <GoogleContainer>
           {/* @ts-ignore:next-line */}
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOFLE_OAUTH}>
          <GoogleLogin
          onSuccess={googleSuccess}
          onError={googleFailure}
          size='large'
          width='360px'
           theme='outline'
          />
           </GoogleOAuthProvider>;
          </GoogleContainer>
          </>
          : ''
           }  

          </Grid>
        <SwitchContainer>
          <SwitchP>{isSignup ?"Already have an account": "Don't have an account "}</SwitchP>
        <SwitchButton type='button' onClick={switchMode}><strong>
                 {isSignup ? "Sign In" : "Create account" }
                 </strong></SwitchButton>
             </SwitchContainer>
             <Button onClick={() => navigate('/client-login')} style={{color: 'white'}}>Register your Company/agents</Button>
        </InnerFormContainer>
      </Forms>
        )} 
        
    </FormContainer> 
    <StyledContainer>
        <LogoContainer>
          <StyledLink to='/'>
          <LogoImg  src='../images/logo-only.svg'  />
            {/* <Logo1><strong>Residence</strong></Logo1>
            <Logo2><strong>Spotter</strong></Logo2> */}
          </StyledLink>
        </LogoContainer>
        <MenuItemsContainer>
          <UL>
            <MenuItems><StyledLink to='/buy' >Buy</StyledLink></MenuItems>
           <MenuItems><StyledLink to='/rent'>Rent</StyledLink></MenuItems>
            <MenuItems><StyledLink to='/commercial'>Commercial</StyledLink></MenuItems>
           <MenuItems> <StyledLink to='/newProject'>New projects</StyledLink></MenuItems>
            <MenuItems><StyledLink to='/offplan'>Offplan</StyledLink></MenuItems>
            <MenuItems><StyledLink to='/findAgent'>Find agent</StyledLink></MenuItems>
            <MenuItems><StyledLink to='/scoutingForm'>Scouting</StyledLink></MenuItems>
            <MenuItems><StyledLink to='/mortgage'>Mortgage</StyledLink></MenuItems>
           </UL> 
        </MenuItemsContainer>
        <IconButtons
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
          >
            <MenuIcon sx={{fontSize: 40}} />
          </IconButtons>

        <LoginContainer>
           {/* @ts-ignore:next-line */}
          {/* <UserName>{user?.result?.name}</UserName> */}
         {user &&
          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               {/* @ts-ignore:next-line */}
              <Avatar alt={user?.result?.name?.charAt(0)} src={user?.result?.picture} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px',  }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
             <LogoutIcon onClick={handleLogout} style={{paddingLeft: 10, paddingRight: 10, marginTop: 15, color: '#494949', cursor: 'pointer'}} />
          </Menu>
        </Box>
          
       } 
          {!user &&
        <LoginButton type='button' onClick={toggleLogin}> Log in</LoginButton>    
        } 
         </LoginContainer> 
      </StyledContainer>
        <ToastContainer />                       
    </StyledBox>
     {open && ( 
              <BoxInnerContainer >
                <NUL style={{ padding: 0, alignItems: 'start'}}>
                {/* style={{ height: open? 'auto' : 0, transition: 'ease-in-out', transitionDuration: '0.5s', transitionProperty: 'height'}} */}
                  {user ?
                    <>

         <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               {/* @ts-ignore:next-line */}
              <Avatar alt={user?.result?.name?.charAt(0)} src={user?.result?.picture} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px', }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
             <LogoutIcon onClick={handleLogout} style={{paddingLeft: 10, paddingRight: 10, marginTop: 15, color: '#494949', cursor: 'pointer', display: open ? '' : 'none' }} />

          </Menu>
        </Box>
                      {/* @ts-ignore:next-line */}
                      {/* <Avatar alt={user?.result?.name?.charAt(0)} src={user?.result?.picture} sx={{display: open ? '' : 'none', width: 40, height: 40, cursor: 'pointer' }} /> */}
                      </>
                    :
                    <NavLoginButton style={{display: open ? '' : 'none'}} type='button' onClick={toggleLogin}> Log in</NavLoginButton>}

                  <NavMenuItems style={{display: open ? '' : 'none'}}><StyledLink to='/buy'>Buy</StyledLink></NavMenuItems>
                  <NavMenuItems style={{display: open ? '' : 'none'}}><StyledLink to='/rent'>Rent</StyledLink></NavMenuItems>
                  <NavMenuItems style={{display: open ? '' : 'none'}}><StyledLink to='/commercial'>Commercial</StyledLink></NavMenuItems>
                  <NavMenuItems style={{display: open ? '' : 'none'}}> <StyledLink to='/newProject'>New projects</StyledLink></NavMenuItems>
                  <NavMenuItems style={{display: open ? '' : 'none'}}><StyledLink to='/offplan'>Offplan</StyledLink></NavMenuItems>
                  <NavMenuItems style={{display: open ? '' : 'none'}}><StyledLink to='/findAgent'>Find agent</StyledLink></NavMenuItems>
                  <NavMenuItems style={{display: open ? '' : 'none'}}><StyledLink to='/ScoutingForm'>Scouting</StyledLink></NavMenuItems>
                  <NavMenuItems style={{display: open ? '' : 'none'}}><StyledLink to='/mortgage'>Mortgage</StyledLink></NavMenuItems>
                  {/* {user &&
                     <LogoutIcon onClick={handleLogout} style={{ marginTop: 15, color: '#494949', cursor: 'pointer', display: open ? '' : 'none' }} />
                  } */}
                </NUL>
              </BoxInnerContainer>
              )}
    </ClickAwayDiv>
      </ClickAwayListener>
      </>
  )
}

export default NavBar

