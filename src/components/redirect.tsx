import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


function redirect() {

    const [count, setCount] = useState(5)
    const navigate = useNavigate();

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((currentCount) => currentCount -1)
      }, 1000)  

      count === 0 && navigate('/')
      return () => clearInterval(interval);
    }, [count, navigate]);

  return (
    <Box>
        <Container sx={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
            <Typography sx={{textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, color: '#008080'}}>Redirecting you in {count} sec.</Typography>
        </Container>
    </Box>
  )
}

export default redirect