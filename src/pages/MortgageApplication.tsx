import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CallIcon from '@mui/icons-material/Call';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { MuiChipsInput } from 'mui-chips-input'
import { Tooltip } from '@mui/material';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useMortgageApplicationMutation } from '../services/api/propertyAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const StyledBox = styled(Box)`

`
const StyledContainer = styled(Container)`
`
const StyledContainerNav = styled(Container)`
display: flex;
justify-content: space-between;
align-items: center;
padding: 8px 3%;
`
const Footer = styled.div`
background-color:  #222;
height: 160px;
color:  #787878;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const FooterDetails = styled.p`
font-size: 0.9rem;
margin-bottom: 0;
`
const NavBar = styled.div`

`
const LogoContainer = styled.div`
cursor: pointer;
`
const Logo = styled.h4`
margin-top: 0;
margin-bottom: 0;
color: #008080;
text-align: start;
font-size: 1.2rem;
`
const ContactContainer = styled.div`

`
const Contact = styled.p`
color: #777;
display: flex;
align-items: center;
font-size: 3vmin;
`
const Span = styled.span`
color: #008080;
margin-left: 10px;
display: flex;
align-items: center;
letter-spacing: 1.2px;
`
const MiddleContainer = styled.div`
background-color: #f5f5f5;
border-top: 0.5px solid #c4c4c4;
`
const Form =  styled.form`
background-color: #fff;
margin: auto 16%;
padding: 20px 3%;
@media only screen and (max-width: 900px) {
  margin: auto 8%;
}
@media only screen and (max-width: 760px) {
  margin: auto 1%;
}
`
const BtnInput = styled.input`
display: none;
:checked + Label {
  background-color:#008080;
  color: #ffffff;
}
`
const Label = styled.label`
position: relative;
color: #008080;
font-size: 0.7rem;
border: 1px solid #008080;
border-radius: 5px;
margin-right: 5px;
align-items: center;
cursor: pointer;
padding: 8px 5px 9px;
`
const TopContainer = styled.div`
display: flex;
margin-bottom: 10px;
`
const Title = styled.p`
font-size: 1.2rem;
color: #383838;
font-weight: 400;
text-align: start;
`
const ChitDetails = styled.p`
text-align: start;
color:  #787878;
`
const SpanAmount = styled.p`
color:  #787878;
`
const PaymentInput = styled.input`
width: 100%;

`
const RangeInput = styled.input`
width: 100%;
`
const Heading = styled.h1`
color: #383838;
font-weight: 800;
font-size: 6vmin;
letter-spacing: 1px;
text-align: center;
`

const ApplyBtn = styled.button`
outline: none;
background-color:#008080;
border: none;
color: #FFFFFF;
padding: 8px 15px;
cursor: pointer;
border-radius: 5px;
margin-top: 15px;
`
const CalculateBtn = styled.button`
outline: none;
background-color: inherit;
border: 1px solid #008080;
color: #008080;
padding: 8px 15px;
cursor: pointer;
border-radius: 5px;
margin-top: 15px;
`
const LogoImg = styled.img`
max-width: 140px;
`

function MortgateApplication() {


  const [propertyValue, setPropertyValue] = useState(1000000);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(50);
  const [downPayment, setDownPayment] = useState(0)
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTermMonths, setLoanTermMonths] = useState(6);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalLoanPayable, setTotalLoanPayable] = useState(0);

  const calculateMortgage = () => {
    const downPaymentAmount = (propertyValue * downPaymentPercentage) / 100;
    const loanAmount = propertyValue - downPaymentAmount;
    const interestRate = 0.70; // 5%
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTermMonths;
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const totalLoanPayable = monthlyPayment * numberOfPayments;

    setLoanAmount(loanAmount);
    setMonthlyPayment(monthlyPayment);
    setTotalLoanPayable(totalLoanPayable);
    setDownPayment(downPaymentAmount);
  };

  const handlePropertyValueChange = (event: any) => {
    setPropertyValue(Number(event.target.value));
  };

  const handleDownPaymentPercentageChange = (event: any) => {
    setDownPaymentPercentage(Number(event.target.value));
  };

  const handleLoanTermMonthsChange = (event: any) => {
    setLoanTermMonths(Number(event.target.value));
  }


  const [chips, setChips] = useState([])
  const handleChange = (newChips: any) => {
    setChips(newChips)
  };

  const initialState = {name: '', email: '', phone: '', mortgageType: '', 
  stage: '', when: '', typeOfProperty: '', propertyStatus: ''
}

  const [formData, setFormData] =useState(initialState)   
  
  const name = formData.name
  const email = formData.email
  const phone = formData.phone
  const mortgageType = formData.mortgageType
  const stage = formData.stage
  const when = formData.when
  const typeOfProperty = formData.typeOfProperty
  const propertyStatus = formData.propertyStatus
  const propertyvalue = propertyValue
  const downPaymentPercent = downPaymentPercentage
  const downpayment = downPayment.toFixed(2)
  const loanamount = loanAmount.toFixed(2)
  const loanTermmonths = loanTermMonths
  const monthlypayment = monthlyPayment.toFixed(2)
  const totalLoanpayable = totalLoanPayable.toFixed(2)
 
  let navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value
   setFormData({...formData, [name]: value});
  }
 console.log(name, email, phone, mortgageType, stage, when, typeOfProperty, propertyStatus, propertyvalue, 
 downPaymentPercent, downpayment, loanamount, loanTermmonths, monthlypayment, totalLoanpayable, chips
 )

 const [mortgageApplication, {isSuccess}] = useMortgageApplicationMutation()
 
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
    await mortgageApplication({name, email, phone, mortgageType, stage, when, 
      typeOfProperty, propertyStatus, propertyvalue, downPaymentPercent, downpayment, 
      loanamount, loanTermmonths, monthlypayment, totalLoanpayable, chips}).unwrap();
      console.log('fulfilled')
    } catch (error) {
      console.error('rejected', error);
    }
  }
  useEffect(() => {
    if(isSuccess) { 
      navigate('/')
   setFormData(initialState);
   toast.success('Submited successfully....')
    }
  }, [isSuccess]);

  return (
    <StyledBox>
     <NavBar>
    <StyledContainerNav>
      <LogoContainer onClick={() => navigate('/mortgage')}>
          <LogoImg  src='../images/logo-only.svg'  />
      </LogoContainer>
      <ContactContainer>
      <Contact>Need more help? <Span><CallIcon sx={{fontSize: 16, marginRight: 0.1}} />+2348024990457</Span></Contact>
      </ContactContainer>
      </StyledContainerNav>
     </NavBar>
     <MiddleContainer>
     <StyledContainer>
      <Heading>MORTGAGE APPLICATION</Heading>
      <Form onSubmit={handleSubmit}>
      <KeyboardBackspaceOutlinedIcon onClick={() => navigate('/mortgage')} style={{ marginBottom: '15px', cursor: 'pointer'}} />
        <TextField  sx={{marginBottom: 1}} size='small' fullWidth type='text' id="outlined-basic" label="Full name" name="name" variant="outlined" value={formData.name} onChange={handleInputChange} />
        <TextField  sx={{marginBottom: 1}} size='small' fullWidth type='email' id="outlined-basic" label="Email" name="email" variant="outlined" value={formData.email} onChange={handleInputChange} />
        <TextField  size='small' fullWidth type='numder' id="outlined-basic" label="Phone" variant="outlined" name="phone" value={formData.phone} onChange={handleInputChange} />
        <Divider />
      <Title>What type of mortgage are you looking to get?</Title>
      <TopContainer>
          <BtnInput type='radio' value='Property purchase' name='mortgageType' id='buy' onChange={handleInputChange}/>
          <Label htmlFor='buy'>Property purchase</Label>
          <BtnInput type='radio' value='Property rental' name='mortgageType' id='rent' onChange={handleInputChange} />
          <Label htmlFor='rent'>Property rental</Label>  
          </TopContainer>
          <Divider />
          <Title>What stage are you in the property buying or renting journey?</Title>
      <TopContainer>
          <BtnInput type='radio' value="I'm still researching" name='stage' id='one' onChange={handleInputChange} />
          <Label htmlFor='one'>I'm still researching</Label>
          <BtnInput type='radio' value="I'm viewing properties in person" name='stage' id='two' onChange={handleInputChange} />
          <Label htmlFor='two'>I'm viewing properties in person</Label>  
          <BtnInput type='radio' value="I've already made an offer" name='stage' id='three' onChange={handleInputChange} />
          <Label htmlFor='three'>I've already made an offer</Label>  
          </TopContainer>
          <Divider />
          <Title>When are you looking to purchase or rent your new property?</Title>
          <TopContainer>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
              <TopContainer>
              <BtnInput type='radio' value="Within 3 months" name='when' id='when1' onChange={handleInputChange} />
          <Label htmlFor='when1'>Within 3 months</Label>
          <BtnInput type='radio' value="I'm viewing properties in person" name='when' id='when2' onChange={handleInputChange} />
          <Label htmlFor='when2'>I'm viewing properties in person</Label> 
              </TopContainer>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
              <TopContainer>
              <BtnInput type='radio' value="I've already made an offer" name='when' id='when3' onChange={handleInputChange} />
          <Label htmlFor='when3'>I've already made an offer</Label>  
          <BtnInput type='radio' value="i haven't decided yet" name='when' id='when4' onChange={handleInputChange} />
          <Label htmlFor='when4'>i haven't decided yet</Label>
              </TopContainer>
              </Grid>
            </Grid>
          </TopContainer>
          <Divider />
          <Title>What type of property are you looking to buy or rent?</Title>
          <TopContainer>
          <BtnInput type='radio' value="Apartment" name='typeOfProperty' id='type1' onChange={handleInputChange}/>
          <Label htmlFor='type1'>Apartment</Label>
          <BtnInput type='radio' value="Full building" name='typeOfProperty' id='type2' onChange={handleInputChange} />
          <Label htmlFor='type2'>Full building</Label>  
          <BtnInput type='radio' value="Land" name='typeOfProperty' id='type3' onChange={handleInputChange} />
          <Label htmlFor='type3'>Land</Label>  
          </TopContainer>
          <Divider />
          <Title>Are you interested in completed properties or still under construction?</Title>
          <TopContainer>
          <BtnInput type='radio' value="Completed property" name='propertyStatus' id='status1' onChange={handleInputChange} />
          <Label htmlFor='status1'>Completed property</Label>
          <BtnInput type='radio' value="Under construction" name='propertyStatus' id='status2' onChange={handleInputChange} />
          <Label htmlFor='status2'>Under construction</Label>  
          <BtnInput type='radio' value="I haven't decided" name='propertyStatus' id='status3' onChange={handleInputChange} />
          <Label htmlFor='status3'>I haven't decided</Label>  
          </TopContainer>
          <Divider />
          <Title>Which property locations are you currently looking into?</Title>
          <TopContainer>
          <MuiChipsInput size='small' value={chips} name='chips' onChange={handleChange} />
         </TopContainer>
         <ChitDetails>Choose up to 3 locations, towers or estate in the state that you might be interested in</ChitDetails>
          <Divider />
          <Title>What is the property value?</Title>
          <ChitDetails>Please enter the value for the properties you're interested in</ChitDetails>
          <TopContainer>
      <TextField value={propertyValue} size='small' name="value" onChange={handlePropertyValueChange} type='number' id="outlined-basic" label="Property value" variant="outlined" />
          </TopContainer>
          <Divider />
          <Title>Slide to adjust percentage for initial payment.</Title>
          <SpanAmount>Down payment <strong>{downPayment.toFixed(2)}</strong>  NGN</SpanAmount>
          <SpanAmount>Loan amount <strong>{loanAmount.toFixed(2)}</strong>  NGN</SpanAmount>
          <span>{downPaymentPercentage}%</span>
          <TopContainer>
          <Tooltip placement='top-start' title={downPaymentPercentage + '%'}>
              <PaymentInput value={downPaymentPercentage} onChange={handleDownPaymentPercentageChange} type='range' min={20} max={80} name='payment' id='payment' />
              </Tooltip>
          </TopContainer>
          <Divider />
          <Title>Slide to adjust loan duration.</Title>
          <SpanAmount>Monthly payment <strong>{monthlyPayment.toFixed(2)}</strong>  NGN</SpanAmount>
          <SpanAmount>Total amount payable <strong>{totalLoanPayable.toFixed(2)}</strong> NGN</SpanAmount>
          <span>{loanTermMonths} Month</span>
          <Tooltip placement='top-start' title={loanTermMonths+ ' Month'}>
          <RangeInput value={loanTermMonths} onChange={handleLoanTermMonthsChange} type='range' min={1} max={12} name='loanDuration' id='month' />
          </Tooltip>
          <Divider />
          <CalculateBtn type='button' onClick={calculateMortgage}>Calculate</CalculateBtn>
          <Divider />
          <ApplyBtn type='submit'>Apply</ApplyBtn>
      </Form>
      <ToastContainer />
     </StyledContainer>
     </MiddleContainer>
     <Footer>
      <FooterDetails>© 2022 mortgagefinder.ng. All rights reserved</FooterDetails>
       <FooterDetails> 7th Floor, Pactum Towers, Victoria Island, Lagos</FooterDetails>
     </Footer>
    </StyledBox>
  )
}

export default MortgateApplication