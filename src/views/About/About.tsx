import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Main from 'layouts/Main';
import { ImageWithDescription } from 'blocks';

const About = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Main
        colorInvert={false}
        isContent={false}
        menuColor={'text.primary'}
        logoColor={isMd ? 'white' : 'brown'}
        isParentPage={true}
      >
        <ImageWithDescription imagePosition={'right'} />
      </Main>
    </Box>
  );
};

export default About;
