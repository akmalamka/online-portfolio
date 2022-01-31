import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { SidebarNav } from './components';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: () => void;
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary' | undefined;
  pages: {
    home: Array<PageItem>;
    recipes: Array<PageItem>;
    foodforthought: Array<PageItem>;
    about: Array<PageItem>;
  };
}

const Sidebar = ({ pages, open, variant, onClose }: Props): JSX.Element => {
  return (
    <Drawer
      anchor="top"
      onClose={() => onClose()}
      open={open}
      variant={variant}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          height: '100%',
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          padding: 1,
        }}
        bgcolor={'primary.main'}
      >
        <SidebarNav pages={pages} onClose={() => onClose()} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
