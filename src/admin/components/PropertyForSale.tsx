import React from "react";
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import SalesChart from "./SalesChart";


function PropertyForSale() {
  return (
    <InfoCard>
      <Card>
        <CardContent>
          <Grid container>
           <Grid item lg={12} md={12} sm={12} xs={12}>
           <Row>
            <SalesChart />
           </Row>
           </Grid>
          </Grid>
        </CardContent>
      </Card>
    </InfoCard>
  );
}

const InfoCard = styled.div`
  height: 15rem;
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  color: white;
  transition: 0.4s ease-in-out;
`;

const Card = styled.div`
  background-color: rgba(183, 194, 243, 0.3);
  border-radius: 1rem;
  margin-bottom: 1rem;
  height: 100%;
  margin: 0 5px;
`;

const CardContent = styled.div`

`;

const Row = styled.div`
  height: 100%;
`;

// const Title = styled.h3`
//   color: #383838;
//   text-align: start;
//   font-weight: 800;
// `;
// const SubTitle = styled.h5`
//   color: #494949;
//   text-align: start;
// `;

export default PropertyForSale;
