'use client';

import React from 'react';
import Grid from '@mui/material/Grid';

const MainContainer = ({ children, sx }: { children?: React.ReactNode, sx?: object }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        ...sx,
        minHeight: '100vh',
        px: 2,
        py: 4,
        bgcolor: 'background.default',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Grid size={{ xs: 12 }} sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
        {children}
      </Grid>
    </Grid>
  );
};

export default MainContainer;