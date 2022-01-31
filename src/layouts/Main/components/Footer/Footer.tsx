import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconList from 'utils/IconList';
import { ReactComponent as Logo } from 'utils/logo-chocolate.svg';
import { ReactComponent as LogoWhite } from 'utils/logo-white.svg';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  logoColor?: string;
}
const Footer = ({ logoColor }: Props): JSX.Element => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
            alignSelf={{ xs: 'center', sm: 'flex-start' }}
            marginX={{ xs: 2, md: 4 }}
          >
            <Box
              display={'flex'}
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
              component="a"
              href="/"
              title="Bite of Appetite"
            >
              {logoColor == 'white' ? <LogoWhite /> : <Logo />}
            </Box>
            <Box marginY={2} paddingX={1}>
              <Typography
                fontFamily={'Inter'}
                align={isSm ? 'left' : 'center'}
                variant={'subtitle2'}
                color="text.secondary"
                sx={{
                  lineHeight: 1.5,
                }}
                gutterBottom
              >
                Made with love in Bogor, Indonesia
              </Typography>
              <Typography
                fontFamily={'Inter'}
                align={isSm ? 'left' : 'center'}
                variant={'subtitle2'}
                color="text.secondary"
                sx={{
                  lineHeight: 1.5,
                }}
                gutterBottom
              >
                Branding and design by{' '}
                <Link
                  underline="none"
                  component="a"
                  href="https://www.instagram.com/alnauval_/"
                  color="text.secondary"
                  sx={{ '&:hover': { textDecoration: 'underline' } }}
                >
                  Muhammad Alnauval
                </Link>
              </Typography>
              <Typography
                fontFamily={'Inter'}
                align={isSm ? 'left' : 'center'}
                variant={'subtitle2'}
                color="text.secondary"
                sx={{
                  lineHeight: 1.5,
                }}
                gutterBottom
              >
                &copy; Bite of Appetite. {new Date().getFullYear()}, Muhammad
                Akmal
              </Typography>
              <Typography
                fontFamily={'Inter'}
                align={isSm ? 'left' : 'center'}
                variant={'subtitle2'}
                color="text.secondary"
                sx={{
                  lineHeight: 1.5,
                }}
                gutterBottom
              >
                All rights reserved
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            flexWrap={'wrap'}
            alignItems={isSm ? 'flex-start' : 'center'}
            flexDirection={'column'}
            rowGap={2}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link
                underline="none"
                component="a"
                href="/"
                color="text.secondary"
                variant={'h6'}
              >
                Home
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link
                underline="none"
                component="a"
                href="/recipes"
                color="text.secondary"
                variant={'h6'}
              >
                Recipes
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link
                underline="none"
                component="a"
                href="/food-for-thought"
                color="text.secondary"
                variant={'h6'}
              >
                Food for Thought
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link
                underline="none"
                component="a"
                href="/about"
                color="text.secondary"
                variant={'h6'}
              >
                About
              </Link>
            </Box>
          </Box>
          <IconList
            isHamburgerOpen={true}
            alignSelf={{
              xs: 'center',
              sm: 'flex-start',
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
