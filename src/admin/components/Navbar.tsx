import React, { useState } from "react";
import styled from '@emotion/styled';


function Navbar() {
let greetings;
  if(new Date().getHours() <= 12 ) {
    greetings = 'Good morning'
  } else if(new Date().getHours() <= 18 ) {
    greetings = 'Good afternoon'
  } else {
    greetings = 'Good Evening'
    }

  return (
    <NavbarContainer>
      <Text>
        {greetings},
        <Span>Admin</Span>
      </Text>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: start;
  align-items: start;
  height: auto;
  padding: 0 2%;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;

const Text = styled.h1`
margin-left: 0.3rem;
  span {
    font-weight: 500;
    color: #484258;
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin-top: 1rem;
  }
`;
const Span = styled.span`
margin-left: 0.5rem;
`
// const InputContainer = styled.div`
//   display: flex;
// `;

// const Icon = styled.div`
//   height: 3rem;
//   width: 3rem;
//   background-color: #dce4ff;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-top-left-radius: 0.5rem;
//   border-bottom-left-radius: 0.5rem;
//   svg {
//     color: #555555;
//   }
// `;
// const Input = styled.input`
//   border: none;
//   background-color: #dce4ff;
//   border-top-right-radius: 0.5rem;
//   border-bottom-right-radius: 0.5rem;
//   color: #464646;

//   &:focus {
//     border: none;
//     outline: none;
//   }
// `;

export default Navbar;
