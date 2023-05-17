import React from "react";
import styled from '@emotion/styled';
import Navbar from "../components/Navbar";
import Grid from '@mui/material/Grid';
import Sidebar from "../components/Sidebar";
import Box from '@mui/material/Box';
import TotalProperties from "../components/TotalProperties";
import PropertyForSale from "../components/PropertyForSale";
import TotalAgent from "../components/TotalAgent";
import PropertyChart from "../components/PropertyChart";
import RevenueChart from "../components/RevenueChart";
import PropertyForRent from "../components/PropertyForRent";
import {ToastContainer } from "react-toastify";


function AdminDashboard () {

  return (
    <Container>
      <Grid container>
        <Grid item lg={2} md={2} sm={12} xs={12}>
        <Sidebar />
      </Grid>
      <Grid item lg={10} md={10} sm={12} xs={12}>
      <Navbar />
      <SubContainer>
          <Grid container spacing={1}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
          <TotalProperties />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
          <PropertyForSale />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
          <TotalAgent />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
          <PropertyForRent />
          </Grid>
          </Grid>
            <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <ChartContainer>
             <PropertyChart />
             </ChartContainer>
              </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <ChartContainer>
              <RevenueChart />
             </ChartContainer>
              </Grid>
            </Grid>
      </SubContainer>
      </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
}

const ChartContainer = styled.div`
width: 100%;
height: 100%;
margin-top: 40px;
`
const Container = styled(Box)`
  width: 100%;
  background: linear-gradient(to bottom right, white 100%, #e6e4ff 100%);
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
    display: flex;
    flex-direction: column;
    margin: 1rem 0 0 0;
    height: 100%
    
`;

const SubContainer = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export default AdminDashboard;


