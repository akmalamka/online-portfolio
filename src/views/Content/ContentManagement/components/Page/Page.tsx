import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Container from 'components/Container';

interface Props {
  isRecipe: boolean;
  isAddContent: boolean;
  children: React.ReactNode;
}

const Page = ({ isRecipe, isAddContent, children }: Props): JSX.Element => {
  return (
    <Box>
      <Box paddingY={4}>
        <Container>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {isAddContent ? 'Add' : 'Edit'} {isRecipe ? 'Recipe' : 'Writing'}
          </Typography>
        </Container>
      </Box>
      <Container paddingTop={'0 !important'} marginTop={-8}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 3, padding: 4 }}>{children}</Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Page;
