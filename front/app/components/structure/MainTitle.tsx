'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type MainTitleProps = {
    title: string;
};

const MainTitle: React.FC<MainTitleProps> = ({ title }) => (
    <Grid size={{ xs: 12 }} mb={3}>
        <Typography variant="h4" component="h1" align="center">
            {title}
        </Typography>
    </Grid>
);

export default MainTitle;
