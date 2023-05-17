import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MortgageNavBar from '../components/MortgageNavBar';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';


const StyledBox = styled(Box)`

`
const StyledContainer = styled(Container)`

`
const TopContainer = styled.div`
background-image: url('../images/mortgage.webp');
height: auto;
width: 100%;
background-size: 100% 100%;
`
const InnerTopContainer = styled.div`
background: rgba( 255, 255, 255, 0.85);
height: 100%;
width: 100%;
padding-bottom: 15px;
`
const Promo = styled.div`
backGround-color: #393643;
height: 50px;
width: 100%;
padding: 2px 0;
`
const PromoText = styled.p`
color: #fff;
font-size: 0.7rem;
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
const Heading = styled.h1`
color: #383838;
font-size: 2.1rem;
font-weight: 900;
text-align: start;
line-height: 1.4;
`
const Paragraph = styled.p`
text-align: start;
color: #383838;
line-height: 1.4;
`
const ButtonContainer = styled.div`
display: flex;
margin-top: 10px;
`
const Button = styled.button`
outline: none;
border: none;
height: 50px;
width: 200px;
cursor: pointer;
`
const MiddleContainer = styled.div`
background-color: #2d383f;
width: 100%;
height: auto;
`
const MiddleTitle = styled.h2`
color: #fff;
font-weight: 800;
margin-top: 60px;
letter-spacing: 1px;
`
const MiddleDetails = styled.p`
color: #fff;
margin-top: 20px;
line-height: 25px;
letter-spacing: 1px;
font-size: 0.9rem;
@media only screen and (max-width: 760px) {
  font-size: 0.7rem;
}
`
const MiddleInnerContainer = styled.div`
margin-top: 40px;
padding-bottom: 20px;
`
const MiddleList = styled.h2`
color: #fff;
text-align: start;
font-weight: 800;
letter-spacing: 1px;
font-size: 4vmin;
`
const ListDetails = styled.p`
color: #fff;
text-align: start;
font-weight: 300;
font-size: 0.9rem;
@media only screen and (max-width: 760px) {
  font-size: 0.7rem;
}
line-height: 25px;
letter-spacing: 1px;
padding-right: 15%;
margin-left: 35px;
`
const Span = styled.span`
color: #008080;
font-size: 40px;
font-weight: 900;
margin-right: 10px;
`

function Mortgage() {
  const navigate = useNavigate();

  return (
    <StyledBox>
      <NavBar />
      <TopContainer>
      <InnerTopContainer>
      <Promo>
      <StyledContainer style={{ height: '100%',alignItems: 'center',display: 'flex', justifyContent: 'space-between'}}>
        <PromoText>Interest rates are rising, lock-in a low rate today! Fixed rates from 4.25% and variable rates from 4.33%</PromoText>
        <PromoBtn onClick={() => navigate('/mortgage-application')}>Mortgage application</PromoBtn>
    </StyledContainer>
      </Promo>
      <MortgageNavBar />
      <StyledContainer>
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
           <Heading>USE MORTGAGE FINDER TO FIND THE BEST MORTGAGE AND HOME LOANS IN NIGERIA</Heading>
           <Paragraph>Nigeria's leading mortgage broker, we compare 20+ lenders to find the right loan for you!</Paragraph>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
           <ButtonContainer>
            <Button onClick={() => navigate('/mortgage-application')} style={{background: '#008080', color: '#fff', fontSize: '0.9rem'}}>Mortgage application</Button>
            <Button onClick={() => navigate('/mortgage-calculator')} style={{marginLeft: 10, color: '#008080', fontSize: '0.9rem'}}>Mortgage calculator</Button>
           </ButtonContainer>
          </Grid>
        </Grid>
        </StyledContainer>
      </InnerTopContainer>
      </TopContainer>
      <MiddleContainer>
      <StyledContainer>
        <Grid container>
          <Grid item lg={2} md={2} sm={1} xs={0}></Grid>
          <Grid item lg={8} md={8} sm={10} xs={12}>
          <MiddleTitle>Talk to the Nigeria best mortgage advisors</MiddleTitle>
          <MiddleDetails>Buying or Renting in Nigeria can be frustrating and complicated. Mortgage Finder is dedicated to ensuring you get the best mortgage advice and that your interests are protected at all times. Here’s how we work:</MiddleDetails>
          <Button onClick={() => navigate('/mortgage-application')} style={{background: '#008080', color: '#fff', fontSize: '0.9rem'}}>Mortgage application!</Button>
          </Grid>
          <Grid item lg={2} md={2} sm={1} xs={0}></Grid>
        </Grid>
        <MiddleInnerContainer>
        <Grid container>
          <Grid item lg={6} md={6} sm={6} xs={12}>
           <MiddleList><Span>1</Span>We understand your needs</MiddleList>
           <ListDetails>We’ll evaluate all available products in the market and short list the most suitable options for you, including our exclusive offers. Your first consultation is 100% free.</ListDetails>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
          <MiddleList><Span>2</Span>We coordinate your application</MiddleList>
           <ListDetails>We’ll coordinate all necessary documents, secure your mortgage pre-approval, and complete your bank application forms.</ListDetails>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
          <MiddleList><Span>3</Span>we secure your mortgage</MiddleList>
           <ListDetails>We’ll handle all bank interactions, and co-coordinate the property valuation and mandatory life insurance.</ListDetails>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
          <MiddleList><Span>4</Span>We give you ongoing support</MiddleList>
           <ListDetails>Once the mortgage is secured, we’ll coordinate the property transfer. We even provide advice after settlement.</ListDetails>
          </Grid>
        </Grid>
        </MiddleInnerContainer>
      </StyledContainer>
      </MiddleContainer>
    <Footer />
    </StyledBox>
  )
}

export default Mortgage