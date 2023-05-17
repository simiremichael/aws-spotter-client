import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MortgageNavBar from '../components/MortgageNavBar';
import Footer from '../components/Footer';
import {useState } from 'react';
import { Divider} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

const StyledBox = styled(Box)`

`
const StyledContainer = styled(Container)`
`
const Promo = styled.div`
backGround-color: #393643;
height: 50px;
width: 100%;
`
const PromoText = styled.p`
color: #fff;
font-size: 0.8rem;
text-align: start;
`
const PromoBtn = styled.button`
outline: none;
border: 0.5px solid #fff;
background: inherit;
color: #fff;
padding: 8px 12px;
cursor: pointer;
`
const InnerContainer = styled.div`
margin: 0 10px 0 0;
`
const Title = styled.h1`
color: #383838;
text-align: start;
margin-top: 35px;
font-size: 2.5rem;
font-weight: 800;
`
const Body = styled.p`
color: #494949;
text-align: start;
font-size: 1.1rem;
letter-spacing: 0.3px;
line-height: 38px;
`
const Selector = styled.div`
cursor: pointer;
border: 0.5px solid #c4c4c4;
`
const SelectorContainer = styled.div`
margin-top: 20px;
height: 100px;
`
const Percent = styled.h1`
color: #383838;
font-size: 1.5rem;
text-align: center;
`
const Period = styled.p`
color: #494949;
text-align: center;
`
const CalculatorContainer = styled.div`
padding: 15px;
margin-top: 20px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
const CalculatorTitle = styled.p`
color: #383838;
text-align: start;
font-weight: 700;
`
const InputContainer = styled.div`
border: 0.5px solid #c4c4c4;
height: 40px;
display: flex;
align-items: center;
border-radius: 8px;
`
const Inputs = styled.input`
width: 86%;
height: 84%;
font-size: 1rem;
border: none;
outline: none;
margin-left: 2px;
color: #494949;
`
const DownPaymentContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 15px;
margin-bottom: 5px;
`
const DownTitle = styled.p`
text-align: start;
font-weight: 700;
color: #383838;
`
const DownAmount = styled.div`
color: #494949;
`
const P = styled.p`
text-align: start;
color: #494949;
font-size: 0.95rem;
line-height: 25px;
letter-spacing: 0.1px;
`
const LoanDurationContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`
const Loan = styled.p`
font-weight: 700;
color: #383838;
`
const Duration = styled.div`
`
const RateDetails = styled.p`
text-align: start;
color: #494949;
font-size: 0.95rem;
line-height: 25px;
letter-spacing: 0.1px;
`
const RepaymentContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 10px;
`
const RepaymentAmount = styled.p`
color: #383838;
font-weight: 400;
`
const RepaymentInner = styled.div`
display: flex;
flex-direction: column;
`
const Span = styled.span`
color: #494949;
`
const NextBtn = styled.button`
width: 36%;
height: 60px;
border: none;
outline: none;
background: #008080;
color: #fff;
font-size: 1rem;
border-radius: 5px;
cursor: pointer;
`
const RepaymentDetails = styled.p`
text-align: start;
color: #494949;
font-size: 0.95rem;
line-height: 25px;
letter-spacing: 0.1px;
`
const RangeInput = styled.input`
width: 100%;
`
const PaymentInput = styled.input`
width: 100%;
`
const RangeOutput = styled.span`
margin-right: 5px;
color: #494949;
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

function Calculator() {

  
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


// const propertyValue = 500000
// const [payment, setPayment] = useState(50)
//   const [range, setRange] = useState(6)
//   const [value, setValue] = useState(propertyValue)

//   const percent = 20;


// // console.log(percent)
// const continous = range <= 1 ? 2 : 1;
// const continue2 = range === 2 ? 1.25 : 1;
// let result = value / 100 * payment;
//   const loanAmount = value - result;
//   const monthlyPayment = loanAmount / range;
//   const loanCharges = monthlyPayment / percent * range / 2 * continous * continue2;
//   const loanRepayment = monthlyPayment + loanCharges;
//   const interestRate = loanRepayment * range;
 
  const navigate = useNavigate();
  return (
    <StyledBox>
        <Promo>
      <StyledContainer style={{  height: '100%',alignItems: 'center',display: 'flex', justifyContent: 'space-between'}}>
        <PromoText>Interest rates are rising, lock-in a low rate today! Fixed rates from 4.75% and variable rates from 5.33%</PromoText>
        <PromoBtn onClick={() => navigate('/mortgage-application')}>Mortgage application</PromoBtn>
    </StyledContainer>
      </Promo>
    <MortgageNavBar />
    <KeyboardBackspaceOutlinedIcon onClick={() => navigate('/mortgage')} style={{ marginBottom: '10px', marginLeft: '7.3%', cursor: 'pointer'}} />
    <StyledContainer style={{marginBottom: 20}}>
        <Grid container>
            <Grid item lg={7} md={7} sm={7} xs={12}>
             <InnerContainer>
                <Title>Mortgage Calculator</Title>
                <Body>
                Use our <strong>free mortgage calculator</strong> to estimate your monthly mortgage payments. We'll take care of everything else.
                </Body>
                <Body><strong>Not sure where to begin?</strong> Try one of our most popular mortgage products</Body>
                <Grid container spacing={2}>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                 <SelectorContainer>
                 <Selector>
                    <Percent>5%</Percent>
                    <Period>1 month fixed</Period>
                </Selector>
                 </SelectorContainer>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                 <SelectorContainer>
                 <Selector>
                    <Percent>4.85%</Percent>
                    <Period>6 months fixed</Period>
                </Selector>
                 </SelectorContainer>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                 <SelectorContainer>
                 <Selector>
                    <Percent>4.75%</Percent>
                    <Period>12 months fixed</Period>
                </Selector>
                 </SelectorContainer>
                </Grid>
                </Grid>
             </InnerContainer>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={12}>
             <CalculatorContainer>
              <CalculatorTitle>Property price</CalculatorTitle>
              <InputContainer>
              <Inputs type='number' value={propertyValue} onChange={(e:any) => setPropertyValue(e.target.value)} />
              <Span style={{color: '#494949'}}>NGN</Span>
              </InputContainer>
              <DownPaymentContainer>
                <DownTitle>Down payment</DownTitle>
                <DownAmount><RangeOutput>{downPayment.toLocaleString()}</RangeOutput>NGN</DownAmount>
              </DownPaymentContainer>
              <LoanDurationContainer>
            <Loan>Percentage of down payment</Loan>
             <Duration><RangeOutput>{downPaymentPercentage + '%'}</RangeOutput></Duration>
            </LoanDurationContainer>
              <Tooltip placement='top-start' title={downPaymentPercentage + '%'}>
              <PaymentInput value={downPaymentPercentage} onChange={(e:any) => setDownPaymentPercentage(e.target.value)} type='range' min={20} max={80} name='payment' id='payment' />
              </Tooltip>
            <P>A percentage of the home price paid up front. Usually at least 20%</P>
            <LoanDurationContainer>
            <Loan>Loan duration</Loan>
             <Duration><RangeOutput>{loanTermMonths}</RangeOutput>months</Duration>
            </LoanDurationContainer>
            <RangeInput value={loanTermMonths} onChange={(e:any) => setLoanTermMonths(e.target.value)} type='range' min={1} max={12} name='month' id='month' />
            <RateDetails>The interest rate is the rate you borrow your loan at and it affects your monthly repayments. Interest rates vary, but are currently set at between 4.75% and 5%</RateDetails>
            <Divider />
            <RepaymentContainer>
              <RepaymentInner>
              <RepaymentAmount style={{marginBottom: 0, textAlign: 'start'}}>Monthly payment</RepaymentAmount>
             <RepaymentAmount style={{marginTop: 0}}><Span style={{color: '#494949' ,fontWeight: 900, fontSize: '1.8rem'}}>{monthlyPayment.toLocaleString()}</Span> NGN</RepaymentAmount>
             </RepaymentInner>
             <NextBtn type='button' onClick={() => navigate('/mortgage-application')}>Next step</NextBtn>
            </RepaymentContainer>
            <RepaymentAmount style={{textAlign: 'start'}}>Total amount payable<Span style={{color: '#494949' ,fontWeight: 900, fontSize: '1.8rem', marginLeft: 5}}>{totalLoanPayable.toLocaleString()}</Span> NGN</RepaymentAmount>
            <RepaymentDetails>
            * Estimated monthly payment based on <Span style={{fontWeight: 600, color: '#494949'}}>{loanAmount.toLocaleString()}</Span> NGN loan amount with a 5% fixed interest rate for the entire duration of the loan
            </RepaymentDetails>

            <CalculateBtn type='button' onClick={calculateMortgage}>Calculate</CalculateBtn>
             </CalculatorContainer>
            </Grid>
        </Grid>
    </StyledContainer>
    <Footer />
    </StyledBox>
  )
}

export default Calculator