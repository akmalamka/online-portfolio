import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  title: string;
  id: string;
  items: Array<PageItem>;
  colorInvert?: boolean;
}

const NavItem = ({ id, items, colorInvert = false }: Props): JSX.Element => {
  const linkColor = colorInvert ? 'common.white' : 'text.primary';

  return (
    <Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        aria-describedby={id}
        sx={{ cursor: 'pointer' }}
      >
        <Typography fontWeight={400} color={linkColor}>
          {items[0].title}
        </Typography>
      </Box>
    </Box>
  );
};

export default NavItem;
