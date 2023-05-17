import React from "react";
import styled from '@emotion/styled';
import PeopleIcon from '@mui/icons-material/People';
import { useAppSelector } from "../../app/hooks";
import { selectCurrentCompany } from "../../services/features/companySlice";
import { useGetAgentCompanyQuery } from "../../services/api/propertyAPI";


function TotalAgent() {

  const {company} = useAppSelector(selectCurrentCompany);
{/* @ts-ignore:next-line */}
   const compId = company?.result?._id;
   const { data } = useGetAgentCompanyQuery(compId);
  return (
    <EarningsCard>
      <CardContent>
        <Chart>
          <PeopleIcon />
        </Chart>
        <EarningsText>Total Agents</EarningsText>
        {/* @ts-ignore:next-line */}
        <Earning>{data?.length}</Earning>
      </CardContent>
    </EarningsCard>
  );
}

const EarningsCard = styled.div`
  height: 15rem;
  width: 100%;
`;

const CardContent = styled.div`
background-color: rgba(183, 194, 243, 0.3);
border-radius: 1rem;
margin-bottom: 1rem;
height: 100%;
margin: 0 5px;

`;

const Chart = styled.div`
  display: flex;
  justify-content: center;
  svg {
    margin-top: 2.5rem;
    height: 3rem;
    width: 3rem;
    color: #008080;
  }
`;

const EarningsText = styled.h3`
  text-align: center;
  font-weight: normal;
  color: #494949;
`;

const Earning = styled.h2`
  text-align: center;
  color: #383838;
  font-weight: 800;
`;

// const EarningsIncrease = styled.h5`
//   text-align: center;
//   font-weight: normal;
//   background-color: rgba(0, 0, 0, 0.2);
//   padding: 0.5rem;
//   border-radius: 2rem;
// `;

export default TotalAgent;
