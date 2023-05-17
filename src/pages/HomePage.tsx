import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import SearchArea from '../components/SearchArea';
import NavBar from '../components/NavBar';
import PropertyList from '../components/PropertyList';
import Box from '@mui/material/Box';
import Footer from '../components/Footer';
import Popular from '../components/Popular';
import CompanySlide from '../components/CompanySlide';
import Hub from '../components/Hub';
import { Alert } from '@mui/material';

const Container = styled(Box)`
`

function HomePage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  function handleOffline() {
    setIsOnline(false);
    <Alert severity="info">No internet connection!</Alert>
  }

  function handleOnline() {
    setIsOnline(true);
    <Alert severity="info">Internet connection restored!</Alert>
  }
  
  return (
    <Container>
    <NavBar />
    <SearchArea />
    <Hub />
    <PropertyList />
    <CompanySlide />
    <Popular />
    <Footer />
    </Container>
  )
}

export default HomePage

