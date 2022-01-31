import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

interface Props {
  text: string;
  isSearchBar?: boolean;
  isClearAll?: boolean;
  [x: string]: any;
}

const ButtonComponent = ({
  text,
  isSearchBar,
  isClearAll,
  ...rest
}: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{
        backgroundColor: isClearAll ? 'transparent' : 'none',
        borderRadius: 30,
        border: 2,
        borderColor: isSearchBar ? 'primary.main' : 'secondary.main',
        my: 1,
        '&:hover': {
          border: 2,
        },
      }}
      {...rest}
    >
      <Typography
        fontFamily={'Inter'}
        variant="button"
        color={
          isClearAll
            ? theme.palette.getContrastText(theme.palette.primary.light)
            : 'text.secondary'
        }
        sx={{
          textTransform: 'uppercase',
          letterSpacing: 1.2,
          fontWeight: 400,
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};

export default ButtonComponent;
