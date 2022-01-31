import React from 'react';
import Box from '@mui/material/Box';
import InstagramButton from 'utils/InstagramButton';
import SoundcloudButton from 'utils/SoundcloudButton';
import MediumButton from 'utils/MediumButton';
import SpotifyButton from 'utils/SpotifyButton';
import LinkedInButton from 'utils/LinkedInButton';

interface Props {
  isHamburgerOpen?: boolean;
  [x: string]: any;
}

const IconList = ({ isHamburgerOpen = false, ...rest }: Props): JSX.Element => {
  return (
    <Box
      m={2}
      flexDirection={'row'}
      display="flex"
      alignSelf={{
        xs: 'center',
        sm: isHamburgerOpen ? 'center' : 'flex-start',
      }}
      {...rest}
    >
      <Box
        marginLeft={1}
        title="Instagram"
        sx={{
          '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
          cursor: 'pointer',
        }}
      >
        <LinkedInButton isHamburgerOpen={isHamburgerOpen} />
      </Box>
      <Box
        marginLeft={1}
        title="Instagram"
        sx={{
          '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
          cursor: 'pointer',
        }}
      >
        <InstagramButton isHamburgerOpen={isHamburgerOpen} />
      </Box>
      <Box
        marginLeft={1}
        title="Medium"
        sx={{
          '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
          cursor: 'pointer',
        }}
      >
        <MediumButton isHamburgerOpen={isHamburgerOpen} />
      </Box>
      <Box
        marginLeft={1}
        title="Soundcloud"
        sx={{
          '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
          cursor: 'pointer',
        }}
      >
        <SoundcloudButton isHamburgerOpen={isHamburgerOpen} />
      </Box>
      <Box
        marginLeft={1}
        title="Spotify"
        sx={{
          '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
          cursor: 'pointer',
        }}
      >
        <SpotifyButton isHamburgerOpen={isHamburgerOpen} />
      </Box>
    </Box>
  );
};

export default IconList;
