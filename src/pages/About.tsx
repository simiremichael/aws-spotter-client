import React from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const StyledBox = styled(Box)`

`
const StyledContainer = styled(Container)`
margin-bottom: 40px;
`
const Statement = styled.div`
background-color:  #F5F5F5;
margin: 20px 0;
padding: 30px 0;
`
const StatementTitle  = styled.h3`
font-size: 1.2rem;
color: #383838;
`
const StatementBody = styled.p`
font-size: 1.2rem;
color: #494949;
`
const AboutTitle = styled.h2`
color: #383838;
`
const AboutContent = styled.p`
text-align: start;
color: #494949;
`

function About() {
  return (
    <StyledBox >
      <NavBar  />
       <StyledContainer>
        <Statement>
           <StatementTitle>Our mission: To motivate and inspire people to get living the life they deserve.</StatementTitle> 
            <StatementBody>When you look for a property, it’s not just a better home you seek, it’s a better future.</StatementBody>
        </Statement>
        <AboutTitle>Residence Spotter at a Glance</AboutTitle>
        <AboutContent>
        Residence Spotter is the leading property website in the Nigeria connecting buyers, sellers and tenants, so that every real estate requirement in the region is fulfilled in a seamless, user-friendly manner.Going above and beyond just providing a database of available listings for rent and sale, Residence Spotter has taken the onus of becoming the most reliable source for ‘all things real estate’. In the Nigeria today, every question that a potential end user could encounter is answered through the resources Residence Spotter has created.
        <br />
        <br />
        As a result of our dedicated efforts to fill this gap with value added services and features, today Residence Spotter stands as the most trusted real estate website in the Nigeria.
        As a part of the growing Emerging Markets Property Group, Residence Spotter has access to a wealth of knowledge and resources that have been conceptualized to facilitate the needs of users and agents in emerging markets, including the Nigeria.
        <br/>
        <br />
        We are very proud of the fact that we’re not just another portal that helps you look at properties to rent and buy. We have studied the market very carefully and tried to address the major concerns/questions users have around different areas when they’re searching for a property.
        <br/>
        <br/>
        As a homegrown Nigeria brand, we are keen to address the needs of both the local and expat community. In order to make sure we are as popular in the local community as we are in the expat domain.
        We are well aware that the performance of real estate agents and their exposure to the latest trends and technologies is pivotal to the growth of the real estate industry. To drive more success stories in the market, we provide agents in-house training covering various modules including customer service, communication skills, methods to create a perfect listing on Bayut, how to use social media to drive business. Our dedicated trainers also hold other engaging hourly sessions with agencies to elevate the overall level of service in the real estate industry.
        <br/>
        <br/>
        Today Residence Spotter is the proud market leader with the most organic traffic any real estate business/website/company has in the region. Apart from being the most popular and the fastest real estate website in the continent, we also take a lot of pride in the fact that we are technology disruptors with our innovative PropTech solutions. We have recently launched our PfinderCRM app just for agents and brokers to maximise their lead potential. The app is already gaining a lot of momentum in the agent community because of its results-driven features.
       <br/>
       <br/>
       Solving local problem through the use of technology and driving positive change is the crux of the Residence Spotter story. We live by our values of Honesty, Innovation and Ownership and every decision we make is aimed to elevate the market and support the growth of the nation.
        </AboutContent>
        </StyledContainer> 
        <Footer />
    </StyledBox>
  )
}

export default About