import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useResetAgentPasswordMutation } from '../services/api/propertyAPI';


const StyledBox = styled(Box)`
height: 100%;
padding: 50px 30% 0 30%;
@media screen and (max-width: 768px) {
    padding: 50px 10% 0 10%;
  }
`
const Heading = styled.h3`

`
const StyledP = styled.p`

`
const SubmitBtn = styled.button`
outline: none;
border: none;
margin-top: 10px;
background: #008080;
color: #fff;
padding: 10px 20px;
border-radius: 8px;
cursor: pointer;
`
const StyledForm = styled.form`

`

function AgentResetPassword() {

    const [formData, setFormData] = useState({email: '', password: '', confirmPassword: '', otp: ''})

    const navigate = useNavigate()

    const [ resetAgentPassword, {isSuccess, isLoading}] = useResetAgentPasswordMutation();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        resetAgentPassword(formData);
    };

    useEffect(() => { 
      if(isSuccess){
      navigate('/')
      }
      }, [isSuccess, navigate]);
  return (
    <>
    <NavBar />
    <StyledBox>
     <Heading>Password Reset</Heading>
     <StyledP>Enter your email, new password and the OTP sent to your email below.</StyledP>
     <StyledForm onSubmit={handleSubmit}>
     <TextField value={formData.email} onChange={(e: any) => setFormData({...formData, email: e.target.value})} type='email' label='email' size='small' fullWidth />
     <TextField style={{marginTop: 8}} value={formData.password} onChange={(e: any) => setFormData({...formData, password: e.target.value})} type='password' label='password' size='small' fullWidth />
     <TextField style={{marginTop: 8}} value={formData.confirmPassword} onChange={(e: any) => setFormData({...formData, confirmPassword: e.target.value})} type='password' label='confirm password' size='small' fullWidth />
     <TextField style={{marginTop: 8}} value={formData.otp} onChange={(e: any) => setFormData({...formData, otp: e.target.value})} type='text' label='otp' size='small' fullWidth />
     <SubmitBtn type='submit'>{isLoading ? <CircularProgress  size={12} color='inherit' />  : 'Reset' }</SubmitBtn>
     </StyledForm>
    </StyledBox>
    </>
  )
}

export default AgentResetPassword