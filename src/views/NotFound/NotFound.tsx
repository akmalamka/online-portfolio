import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { ReactComponent as NotFoundAsset } from 'utils/not-found-asset.svg';

const NotFound = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Main isParentPage={true}>
        <Box
          display={'flex'}
          alignItems={'center'}
          minHeight={{ xs: 550, md: 'calc(100vh - 58px)' }}
          sx={{
            width: 1,
          }}
          bgcolor={'#ff8261'}
        >
          <Container>
            <Box>
              {isMd && (
                <Box
                  left={'24%'}
                  top={'15%'}
                  width={1}
                  height={1}
                  position={'absolute'}
                  sx={{
                    zIndex: 2,
                    transform: 'scale(0.9)',
                  }}
                >
                  <NotFoundAsset />
                </Box>
              )}
              <Typography
                color={'text.secondary'}
                variant="h1"
                component={'h1'}
                align={'center'}
                position={'relative'}
                sx={{
                  zIndex: 2,
                  fontWeight: 700,
                  fontSize: { xs: 80, md: 150 },
                }}
              >
                404
              </Typography>
              <Box display={'flex'} justifyContent={'center'}>
                <Typography
                  variant="h4"
                  component="p"
                  color="text.secondary"
                  align={'center'}
                  fontWeight={600}
                  marginRight={1}
                  position={'relative'}
                  sx={{ zIndex: 2 }}
                >
                  Oops! Looks like you followed
                </Typography>
                <Typography
                  fontFamily={'Yournotes'}
                  variant="h4"
                  component="p"
                  color="text.secondary"
                  align={'center'}
                  sx={{ zIndex: 2 }}
                >
                  a bad link.
                </Typography>
              </Box>
              <Box
                marginTop={{ xs: 4, sm: 6, md: 12 }}
                display={'flex'}
                justifyContent={'center'}
              >
                <Button
                  component={Link}
                  variant="outlined"
                  color="primary"
                  position={'relative'}
                  sx={{
                    zIndex: 2,
                    borderRadius: 10,
                    border: 2,
                    borderColor: 'primary.main',
                    my: 2,
                    px: 2,
                    '&:hover': {
                      border: 2,
                    },
                  }}
                  href={'/'}
                >
                  <Typography
                    variant="button"
                    color="text.primary"
                    sx={{
                      textTransform: 'uppercase',
                      letterSpacing: 1.2,
                      fontWeight: 400,
                    }}
                  >
                    Back Home
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Main>
    </Box>
  );
};

export default NotFound;
