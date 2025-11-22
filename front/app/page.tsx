'use client';

import { Typography } from '@mui/material';
import MainContainer from './components/structure/MainContainer';

export default function Home() {
  return (
    <MainContainer sx={{ justifyContent: 'center', alignContent: 'center' }}>
      <Typography variant="h5" textAlign="center">Bienvenido</Typography>
      {/* <ExampleTable /> */}
    </MainContainer>
  );
}
