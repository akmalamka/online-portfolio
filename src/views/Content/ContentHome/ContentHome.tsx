import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Main from 'layouts/Main';
import Container from 'components/Container';

const ContentHome = (): JSX.Element => {
  const { url } = useRouteMatch();
  return (
    <Main isParentPage={true}>
      <Box
        sx={{
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        <Container paddingX={0} paddingY={0} maxWidth={{ sm: 1, md: 1236 }}>
          <Box display={'flex'} flexDirection={'column'} position={'relative'}>
            <Box
              display={'flex'}
              width={1}
              justifyContent={'center'}
              p={4}
              mt={4}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                }}
              >
                Content Management
              </Typography>
            </Box>
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', md: 'row' }}
              position={'relative'}
              height={550}
            >
              <Box
                width={1 / 2}
                height={1}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                rowGap={4}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  Recipes
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderRadius: 10,
                    border: 2,
                    borderColor: 'primary.main',
                    my: 2,
                    px: 2,
                    '&:hover': {
                      border: 2,
                    },
                    width: 1 / 3,
                  }}
                  href={`${url}/recipes`}
                >
                  <Typography
                    variant="button"
                    color="text.primary"
                    fontFamily={'Inter'}
                    sx={{
                      textTransform: 'uppercase',
                      letterSpacing: 1.2,
                      fontWeight: 400,
                      fontSize: { xs: 12, md: 14 },
                    }}
                  >
                    View Recipes
                  </Typography>
                </Button>
              </Box>
              <Box
                width={1 / 2}
                height={1}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                rowGap={4}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  Writings
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderRadius: 10,
                    border: 2,
                    borderColor: 'primary.main',
                    my: 2,
                    px: 2,
                    '&:hover': {
                      border: 2,
                    },
                    width: 1 / 3,
                  }}
                  href={`${url}/writings`}
                >
                  <Typography
                    fontFamily={'Inter'}
                    variant="button"
                    color="text.primary"
                    sx={{
                      textTransform: 'uppercase',
                      letterSpacing: 1.2,
                      fontWeight: 400,
                      fontSize: { xs: 12, md: 14 },
                    }}
                  >
                    View Writings
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Main>
  );
};

export default ContentHome;
