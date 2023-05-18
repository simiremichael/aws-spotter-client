import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAddAgentMutation } from '../../services/api/propertyAPI'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Backdrop, CircularProgress, LinearProgress } from '@mui/material';

const StyledContainer = styled(Container)`
margin-bottom: 28px;
`
const FormHeaderContainer = styled.div`

`
const Heading = styled.h3`
margin-left: 20px;
`
const AgentInfo = styled.p`
 border-bottom: 0.5px solid gray;
`
const AgentImgContainer = styled.div`
width: 120px;
height: 120px;
border: 0.5px solid #C4C4C4;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-image: url('../../images/blank_avater.jpg');
background-size: 100% 100%;
`
const AgentImage = styled.img`
width: 100%;
height: 100%;
`
 const AgentImgLabel = styled.label`
 color: #008080;
 width: 100px;
 cursor: pointer;
 font-size: 1rem;
 text-align: center;
 width: 100%;
 height: 100%;
 display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
 `
const BoxContainer = styled(Box)`
width: 100%;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
    margin: 1rem 0 0 0;
`
 const Form = styled.form`
 display: flex;
 flex-direction: column;
 justify-content: start;
 `
 const FormInnerContainer = styled.div`
 margin-top: 20px;
 `
 const ImgInput = styled.input`
width: 0;
height: 0;
 `
 const StyledTextField = styled(TextField)`
width: 98%;
margin:  15px 3px 0 4px;
color: gray;
`
const Button = styled.button`
width: 98%;
height: 40px;
margin:  25px 3px 0 4px;
background-color: #008080;
padding: 6px, 12px, 6px, 12px;
color: #fff;
border-radius: 10px;
border: none;
outline: none;
cursor: ponter;
cursor: pointer;
`
// const UploadBtn = styled(Button)`
// width: 120px;
// height: auto;
// margin: 5px 0;
// padding-top: 2px;
// padding-bottom: 2px;
// `
const SpinnerContainer = styled.div`
 display: flex;
 align-items: center;
justify-content: start; 
width: 100px;
`
 const SpinnerDiv = styled.div`
 width: 100%;
 margin-top: 4px;
 `


function AddAgent() {

    const [agent, setAgent] = useState({firstName: '', lastName: '', email: '', password: '', phone: '', confirmPassword: '', state: '', location: '', role: '', profilePicture: ''});
    const [loading, setLoading] = useState(false);

   const handleChange = (e: any) => {
   setAgent(({...agent, [e.target.name]: e.target.value}))
   }

   const [addAgent, {data, isSuccess, isLoading}] = useAddAgentMutation();

let navigate = useNavigate();
  
const handleUpload = async (e: any) => {
  setLoading(true);
  const files = e.target.files
  for ( const file of files) {
   const formData = new FormData();
   formData.append('file', file);
   {/* @ts-ignore:next-line */}
   formData.append('upload_preset', 'profileImg');
  await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
   method: 'POST',
   body: formData,   
 })
 .then(r => r.json())
 .then(data => {
  setAgent({...agent,  profilePicture: data.secure_url});
     if (data.url) {
      setLoading(false);
       toast.success('Uploaded successfully....')
      } 
     })
     };
  };  

    const handleSubmit = async (e: any) => { 
      e.preventDefault()
      try {
         await addAgent({...agent}).unwrap().
         then((payload: any) => console.log('fulfilled')).
         catch((error: any) => console.error('rejected', error));
      } catch (error) {
        console.error('rejected', error);
      }
    }

useEffect(() => { 
  if(isSuccess) {
    toast.success('Submitted successfully....')
    navigate('/adminHomepage')
    }
}, [ isSuccess])

  return (
    <BoxContainer>
        <Grid container >
        <Grid item lg={2} md={2} sm={12} xs={12}>
        <Sidebar  />
        </Grid>
        <Grid item lg={1} md={1} sm={0} xs={0}></Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
        <Navbar />
        <FormHeaderContainer>
        <Heading>NEW AGENT</Heading>
        </FormHeaderContainer>
        <StyledContainer>
        <AgentInfo>Agent Information</AgentInfo>
        <Form onSubmit={handleSubmit}>
        <AgentImgContainer>
       {agent.profilePicture ?
       <>
       <AgentImage src={agent.profilePicture} />
       <CloseOutlinedIcon onClick={() => setAgent({...agent, profilePicture: ''})} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <ImgInput name='profilePicture' 
        id='img' type='file' accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload}/>
        <AgentImgLabel htmlFor='img'>Pick image</AgentImgLabel>
        </>
        }
        </AgentImgContainer>
        <SpinnerContainer>
       {loading === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
         {/* <UploadBtn type='button' onClick={handleUpload}>Upload</UploadBtn> */}
        <FormInnerContainer>
        <Grid container>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <StyledTextField id="outlined-basic" type='text' label='First Name' size='small' name='firstName' value={agent.firstName} onChange={handleChange} />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <StyledTextField id="outlined-basic" type='text' label='Last Name' size='small' name='lastName' value={agent.lastName} onChange={handleChange} />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <StyledTextField id="outlined-basic" type='email' label='Email' size='small' name='email' value={agent.email} onChange={handleChange} />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <StyledTextField id="outlined-basic" type='password' label='Password' size='small' name='password' value={agent.password} onChange={handleChange} />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <StyledTextField id="outlined-basic" type='password' label='confirmPassword' size='small' name='confirmPassword' value={agent.confirmPassword} onChange={handleChange} />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <StyledTextField id="outlined-basic" type='number' label='Phone' size='small' name='phone' value={agent.phone} onChange={handleChange} />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <StyledTextField id="outlined-basic" type='text' label='State' size='small' name='state' value={agent.state} onChange={handleChange} />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <StyledTextField id="outlined-basic" type='text' label='Role' size='small' name='role' value={agent.role} onChange={handleChange} />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <StyledTextField id="outlined-basic" type='text' label='Location' size='small' name='location' value={agent.location} onChange={handleChange} />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <Button type='submit'>Register</Button>
        </Grid>
        </Grid>
        </FormInnerContainer>    
        </Form>
        <ToastContainer />
        </StyledContainer>
        <Grid item lg={1} md={1} sm={0} xs={0}></Grid>
        </Grid>
        </Grid>
        </BoxContainer>
  )
}

export default AddAgent
