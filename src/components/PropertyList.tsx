import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import NewForRent from './NewForRent';
import NewForSale from './NewForSale';

const StyledBox = styled(Box)`
 height: auto;
 margin: 0 0 10px 0;
`

function PropertyList() {

  return (
    <StyledBox>
      <NewForRent />
      <NewForSale />
    </StyledBox>
  )
}

export default PropertyList
