import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useGenerateOTPMutation } from '../services/api/propertyAPI';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';


const StyledBox = styled(Box)`
height: 100%;
padding: 30px 30% 12.4% 30%;
@media screen and (max-width: 768px) {
    padding: 50px 10% 12.4% 10%;
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

function GetOTP() {

    const [formData, setFormData] = useState({email: ''})

    const navigate = useNavigate()

    const [generateOTP, {isSuccess, isLoading}] = useGenerateOTPMutation();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        generateOTP(formData);
    };

    useEffect(() => { 
    if(isSuccess){
    navigate('/resetPassword')
    }
    }, [isSuccess, navigate]);

  return (
    <>
    <NavBar />
    <StyledBox>
     <Heading>Account Verification</Heading>
     <StyledP>Enter your rigistered email to receive password reset OTP.</StyledP>
     <StyledForm onSubmit={handleSubmit}>
     <TextField value={formData.email} onChange={(e: any) => setFormData({...formData, email: e.target.value})} type='email' label='email' size='small' fullWidth />
     <SubmitBtn type='submit'>{isLoading ? <CircularProgress  size={12} color='inherit' />  : 'Send' }</SubmitBtn>
     </StyledForm>
    </StyledBox>
    </>
  )
}

export default GetOTP