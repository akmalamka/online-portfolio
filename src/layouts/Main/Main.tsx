import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from 'components/Container';
import { Topbar, Sidebar, Footer } from './components';
import pages from '../navigation';

interface Props {
  children: React.ReactNode;
  colorInvert?: boolean;
  bgcolor?: string;
  isContent?: boolean;
  menuColor?: string;
  logoColor?: string;
  isParentPage?: boolean;
}

const Main = ({
  children,
  colorInvert = false,
  bgcolor = 'transparent',
  isContent = true,
  menuColor = 'text.primary',
  logoColor = 'chocolate',
  isParentPage = false,
}: Props): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = (): void => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = (): void => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  function bgColorLogic() {
    return trigger ? theme.palette.background.paper : bgcolor;
  }

  function elevationLogic() {
    return trigger ? 1 : 0;
  }

  return (
    <Box>
      <AppBar
        position={'sticky'}
        sx={{
          top: 0,
          backgroundColor: isContent ? bgColorLogic() : 'transparent',
        }}
        elevation={isContent ? elevationLogic() : 0}
      >
        <Container
          maxWidth={{ sm: 1, md: 1600, lg: 2560 }}
          paddingY={{ xs: 2, md: 1 }}
          paddingX={{ xs: 2, md: 4 }}
          margin={'0'}
        >
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            pages={pages}
            colorInvert={trigger ? false : colorInvert}
            menuColor={menuColor}
            logoColor={logoColor}
            trigger={trigger}
            isParentPage={isParentPage}
            isContent={isContent}
          />
        </Container>
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
        pages={pages}
      />
      <main>{children}</main>
      <Box bgcolor={'primary.main'}>
        <Container paddingY={4} marginX={2} maxWidth={'95%'}>
          <Footer logoColor={'white'} />
        </Container>
      </Box>
    </Box>
  );
};

export default Main;
