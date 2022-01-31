import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

interface AddDirectionButtonProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  push: any;
  isIngredients: boolean;
  isWithComponent?: boolean;
}

const ingredientsEmpty = {
  name: '',
  measurement: '',
  unit: '',
};

const componentEmpty = {
  component: '',
  ingredients: [ingredientsEmpty],
};

const AddDirectionButton = ({
  push,
  isIngredients,
  isWithComponent,
}: AddDirectionButtonProps): JSX.Element => {
  function StringLogic(isIngredients) {
    return isIngredients ? 'ingredients' : 'direction';
  }
  function PushLogic(isIngredients) {
    return isIngredients ? ingredientsEmpty : { title: '', step: '', tips: '' };
  }
  return (
    <Box>
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
        }}
        startIcon={<AddIcon />}
        onClick={() =>
          push(isWithComponent ? componentEmpty : PushLogic(isIngredients))
        }
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
          Add {isWithComponent ? 'component' : StringLogic(isIngredients)}
        </Typography>
      </Button>
    </Box>
  );
};

export default AddDirectionButton;
