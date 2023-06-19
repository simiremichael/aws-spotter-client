import React, {useState, useEffect} from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { selectCurrentAgent, setAgents } from '../services/features/agentSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useGetAgentsQuery, useGetCompaniesQuery, useGetPropertiesQuery } from '../services/api/propertyAPI';
import { Grid } from '@mui/material';
import { selectCurrentCompany, setCompanies } from '../services/features/companySlice';
import avatar from '../images/blank_avater.jpg'

const StyledBox = styled(Box)`
background-image: url('../images/realtor.webp');
background-size: 100% 100%;
height: 340px;
`
const StyledBoxBottom = styled(Box)`
margin: 20px 0 30px 0;
`
const StyledContainer = styled(Container)`
`
const TopContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`
const TopOpecContainer = styled.div`

`
const TopHeader = styled.h1`
font-weight: bold;
color: rgb(255 255 255);
text-align: center;
width: 100%;
`
const Buttonwrapper = styled.div`
display: flex;
justify-content: center;
`
const ButtonContainer = styled.div`
width: 220px;
height: 44px;
margin: 10px;
background-color: #000000;
display: flex;
justify-content: space-between;
align-items: center;
border-radius: 25px;
`
const AgentButton = styled.button`
outlined: none;
border: none;
color: #ffffff;
border-radius: 25px;
font-weight: bold;
cursor: pointer;
height: 92%;
width: 46%;
margin-left: 2px
`
const CompanyButton = styled.button`
outlined: none;
border: none;
color: #ffffff;
border-radius: 25px;
font-weight: bold;
cursor: pointer;
height: 92%;
width: 50%;
margin-right: 2px
`
const InputContainer = styled.div`
margin-top: 20px;
margin-bottom: 40px;
align-items: center;
width: 75%;
@media only screen and (max-width: 900px) {
  width: 90%
}
`
const Input = styled(TextField)`
 width: 90%;
 height: 40px;
 background-color: #ffffff;
 outlined: none;
 border: none;
 border-radius: 5px;
 @media only screen and (max-width: 900px) {
  width: 80%
}
`
const Button = styled.button`
width: 60px;
 height: 40px;
 background-color: #008080;
 color: #ffffff;
 font-weight: bold;
 outlined: none;
 font-size: 1.2rem;
 border: none;
 cursor: pointer;
`
const AgentCard = styled.div`
width: 100%;
cursor: pointer;
box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`
const AgentTopContainer = styled.div`
height: 40%;
width: 100%;
`
const Img = styled.img`
height: 100%;
width: 100%;
`
const LogoImg = styled.img`
height: 100%;
width: 100%;
`
const BottomContainer = styled.div`
height: 60%;
width: 100%;
padding-bottom: 30px;
`
const Name = styled.h3`
margin-bottom: 0;
color: #383838;
text-align: center;
`
const Job = styled.p`
margin: 0;
color: #494949;
text-align: center;
`
const Organisation = styled.p`
margin-top: 10px;
color: #494949;
text-align: center;
`
const LowerContainer = styled.div`
display: flex;
justify-content: space-around;
margin-top: 15px;
`
const Lowerleft = styled.div`
`
const LowerRight = styled.div`
border-top:
`
const LowerMiddle = styled.div`
border-top:
`
const ForSale = styled.p`
margin: 0;
font-size: 0.8rem;
color: #494949;
`
const Number = styled.p`
margin: 0;
font-size: 0.8rem;
color: #494949;
text-align: center;
`
const ForRent = styled.p`
margin: 0;
font-size: 0.8rem;
color: #494949;
`
const Commercial = styled.p`
margin: 0;
font-size: 0.8rem;
color: #494949;
`
const CompanyCard = styled.div`
width: 100%;
cursor: pointer;
box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`
const CompanyTopContainer = styled.div`
height: 200px;
width: 100%;
`
const CompanyBottomContainer = styled.div`
height: 70%;
width: 100%;
padding-bottom: 30px;
`
const CompanyName = styled.h3`
margin-bottom: 0;
color: #383838;
text-align: center;
`
const NumOfAgent = styled.p`
margin: 10px 0 10px 0;
font-size: 0.8rem;
text-align: center;
color: #919191;

`
const HeadOffice = styled.p`
margin: 0;
font-size: 0.7rem;
text-align: center;
color: #919191;

`
const Location = styled.p`
margin-top: 5px;
font-size: 0.6rem;
text-align: center;
`
const Form = styled.form`
display: flex;
justify-content: center;
`

function FindAgent() {

  const [toggle, setToggle] = useState(false);
  const dispatch = useAppDispatch();

  const [searchData, setSearchData] = useState({agent: '', company: ''})
  const {data} = useGetAgentsQuery();
  const {data: companyData} = useGetCompaniesQuery();
  const {data: allProperiesData}= useGetPropertiesQuery();

  //console.log(allProperiesData?.data?.filter((i:any) => (i.creator === "63860ef00c6a4aad7f80df5c")).filter((i:any) => (i.category === 'sale')).length)

  useEffect(() => {
    dispatch(setAgents({
      agent: data,
      agentToken: undefined
    }))
     },[dispatch, data])

     useEffect(() => {
      dispatch(setCompanies({
        company: companyData,
        companyToken: undefined
      }))
       },[dispatch, companyData])

  const {agent} = useAppSelector(selectCurrentAgent);
  const {company} = useAppSelector(selectCurrentCompany);

  const handleChange = (e: any) => {
  const name = e.target.name;
  const value = e.target.value;
  setSearchData( values => ({...values, [name]: value}));
  };

    {/* @ts-ignore:next-line */}
  //const allAgentProperties = allProperiesData?.data?.filyer((props: any) => props.id === agent?.data?._id)

  const handleSearch = () => {
  // e.preventDefault();
  }

  const handleToggle = () => {
    setToggle(!toggle);
  }
  
  return (
    <>
      <NavBar />
    <StyledBox>
    <TopOpecContainer>
      <StyledContainer>
       <TopContainer>
        <TopHeader>Find your agent to find a home</TopHeader>
        <Buttonwrapper>
        <ButtonContainer>
          <AgentButton onClick={handleToggle} style={{backgroundColor: toggle === false ? '#008080' : '#000000'}}>AGENTS</AgentButton>
          <CompanyButton onClick={handleToggle} style={{backgroundColor: toggle === true ? '#008080' : '#000000'}}>COMPANIES</CompanyButton>
        </ButtonContainer>
        </Buttonwrapper>
        <Form onSubmit={handleSearch}>
        <InputContainer>
        { toggle === false ?
        <Input type='search' variant='outlined' size='small' label='Enter location or agent name' name='agent' value={searchData.agent} onChange={handleChange} />
        :
        <Input type='search' variant='outlined' size='small' label= 'Enter location or company name' name='company' value={searchData.company} onChange={handleChange}  />
        }
        <Button type='submit'>Find</Button>
        </InputContainer>
        </Form>
       </TopContainer>
      </StyledContainer>
      </TopOpecContainer>
      </StyledBox>                 
      <StyledBoxBottom>
      <StyledContainer>
        <Grid container spacing={2}>
      {toggle === false ?
        <>
        {/* @ts-ignore:next-line */}
        {agent?.data?.map((item: any) => (
      <Grid item lg={3} md={4} sm={6} xs={12}key={item._id}>
      <AgentCard>
       <AgentTopContainer>
       <Img src={item.profilePicture ? item.profilePicture : avatar } />
       </AgentTopContainer>
       <BottomContainer>
       <Name>{item.name}</Name>
       <Job>{item.role.toUpperCase()}</Job>
       <Organisation>{item.companyName}</Organisation> 
       <LowerContainer>
       <Lowerleft>
         {/* @ts-ignore:next-line */}
        <Number>{ allProperiesData?.data.filter((prop: any) => (prop.creator === item._id)).filter((prop:any) => (prop.category === 'sale')).length}</Number>
       <ForSale>for sale</ForSale>
       </Lowerleft>
       <LowerRight>
          {/* @ts-ignore:next-line */}
       <Number>{allProperiesData?.data.filter((prop: any) => (prop.creator === item._id)).filter((prop:any) => (prop.category === 'rent')).length}</Number>
       <ForRent>for rent</ForRent>
       </LowerRight>
       </LowerContainer>
       </BottomContainer>
       </AgentCard>
       </Grid>
      ))}
      </>
        :       
        <>
        {/* @ts-ignore:next-line */}
        {company?.data?.map((item: any) => (  
          <Grid item lg={3} md={4} sm={6} xs={12}key={item._id}>
       <CompanyCard>
       <CompanyTopContainer>
       <LogoImg src={item.logo} />
       </CompanyTopContainer>
       <CompanyBottomContainer>
       <CompanyName>{item.companyName}</CompanyName>
        {/* @ts-ignore:next-line */}
       <NumOfAgent>{agent?.data?.filter((data: any) => (data.companyId === item._id)).length} AGENTS</NumOfAgent>
       <HeadOffice>{item.address}</HeadOffice> 
       <Location>{item.area.toUpperCase()}</Location> 
       <LowerContainer>
       <Lowerleft>
           {/* @ts-ignore:next-line */}
        <Number>{allProperiesData?.data.filter((prop: any) => (prop.companyId === item._id)).filter((prop:any) => (prop.category === 'sale')).length}</Number>
       <ForSale>for sale</ForSale>
       </Lowerleft>
       <LowerMiddle>
           {/* @ts-ignore:next-line */}
       <Number>{allProperiesData?.data.filter((prop: any) => (prop.companyId === item._id)).filter((prop:any) => (prop.category === 'commercial')).length}</Number>
       <Commercial>Commercial</Commercial>
       </LowerMiddle>
       <LowerRight>
           {/* @ts-ignore:next-line */}
       <Number>{allProperiesData?.data.filter((prop: any) => (prop.companyId === item._id)).filter((prop:any) => (prop.category === 'rent')).length}</Number>
       <ForRent>for rent</ForRent>
       </LowerRight>
       </LowerContainer>
       </CompanyBottomContainer>
       </CompanyCard>
       </Grid>
       ))}
       </>
       }
        </Grid>
      </StyledContainer>
      </StyledBoxBottom>
      <Footer />
    </>
  )
}

export default FindAgent