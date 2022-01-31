import React from 'react';
import Box from '@mui/material/Box';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { baseUrl } from 'utils/constants';
import './videoCardClass.css';

const VideoCard = (): JSX.Element => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });
  return isSm ? (
    <Box display={'flex'} width={{ xs: 1, md: 1 / 2 }}>
      <Box
        component={'video'}
        height={1}
        width={1}
        autoPlay={true}
        muted={true}
        loop={true}
        sx={{ objectFit: 'cover' }}
      >
        <source src={`${baseUrl}/pasta-eat.mp4`} type="video/mp4" />
        <source src={`${baseUrl}/pasta-eat.webm`} type="video/webm" />
        <source src={`${baseUrl}/pasta-eat.ogg`} type="video/ogg" />
        Your browser do not support HTML5 video.
      </Box>
    </Box>
  ) : (
    <Box
      component={LazyLoadImage}
      height={1}
      width={1}
      src={`${baseUrl}/[2022-01-23T01-42-23.644Z]_BOLOGNESE-20GNOCCHI-20WITH-20KEMANGI-20PESTO.jpg`}
      alt="..."
      effect="blur"
      sx={{
        objectFit: 'cover',
        height: 370,
        borderRadius: 2,
      }}
    />
  );
};

export default VideoCard;
