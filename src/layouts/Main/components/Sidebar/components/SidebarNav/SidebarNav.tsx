import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import IconList from 'utils/IconList';
import { ReactComponent as LogoWhite } from 'utils/logo-white.svg';

interface Props {
  pages: {
    home: Array<PageItem>;
    recipes: Array<PageItem>;
    foodforthought: Array<PageItem>;
    about: Array<PageItem>;
  };
  onClose: () => void;
}

const SidebarNav = ({ pages, onClose }: Props): JSX.Element => {
  const theme = useTheme();
  const {
    home: homePages,
    recipes: recipePages,
    foodforthought: foodForThoughtPages,
    about: aboutPages,
  } = pages;
  const pagesArray = [homePages, recipePages, foodForThoughtPages, aboutPages];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Box
        paddingX={2}
        paddingY={1}
        display={'flex'}
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 1 / 8,
        }}
      >
        <Box
          display={'flex'}
          component="a"
          href="/"
          title="Bite of Appetite"
          sx={{
            justifyContent: 'center',
          }}
        >
          <LogoWhite />
        </Box>
        <Box>
          <CloseIcon
            fontSize="large"
            onClick={() => onClose()}
            sx={{ color: theme.palette.primary.light }}
          />
        </Box>
      </Box>

      <Box
        paddingX={2}
        paddingY={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 7 / 8,
          justifyContent: 'space-between',
        }}
      >
        {pagesArray.map((p, index) => (
          <Box
            key={index}
            sx={{
              zIndex: 2,
              '&:hover': {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Button
              component={'a'}
              href={p[0].href}
              fullWidth
              sx={{
                justifyContent: 'center',
              }}
            >
              <Typography
                color={'text.secondary'}
                variant="h4"
                fontWeight={600}
              >
                {p[0].title}
              </Typography>
            </Button>
          </Box>
        ))}
        <IconList isHamburgerOpen={true} />
      </Box>
    </Box>
  );
};

export default SidebarNav;
