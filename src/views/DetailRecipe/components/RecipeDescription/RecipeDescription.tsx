import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  selectChosenRecipe,
  selectChosenRecipeId,
} from 'redux-toolkit/slices/recipeSlice';
import './accordion.css';

const RecipeDescription = (): JSX.Element => {
  const chosenRecipe = useSelector(selectChosenRecipe);
  const chosenRecipeId = useSelector(selectChosenRecipeId);
  const [expandedIngredients, setExpandedIngredients] = useState<any>(false);
  const [expandedDirections, setExpandedDirections] = useState<any>(false);

  const handleChange = (panel, type) => (event, isExpanded) => {
    type === 'ingredients'
      ? setExpandedIngredients(isExpanded ? panel : false)
      : setExpandedDirections(isExpanded ? panel : false);
  };

  const isIngredientsWithComponentLogic = () => {
    return (
      chosenRecipe.isIngredientsWithComponent === '1' ||
      chosenRecipe.isIngredientsWithComponent === 'True'
    );
  };

  return (
    <Grid container rowSpacing={2} columnSpacing={4} sx={{ paddingX: 2 }}>
      <Grid item xs={12}>
        <Divider sx={{ marginY: { xs: 2, md: 4 } }} />
      </Grid>
      <Grid item xs={12}>
        {(chosenRecipeId !== 0 ? chosenRecipe.story : '')
          .split('\n')
          .filter((item) => item.length > 0)
          .map((item, i) => (
            <Typography
              key={i}
              fontFamily={'Inter'}
              variant={'body1'}
              align={'center'}
              sx={{ p: 4 }}
            >
              {item}
            </Typography>
          ))}
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ marginY: { xs: 2, md: 4 } }} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid container sx={{ paddingX: 2 }}>
          <Grid item xs={6}>
            <Typography variant={'h6'} align={'left'}>
              Ingredients
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              display={'flex'}
              justifyContent={'flex-end'}
              fontFamily={'Inter'}
              variant={'overline'}
              sx={{ fontWeight: 600 }}
            >
              Serves {chosenRecipeId !== 0 ? chosenRecipe.serves : 0}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginY: 1, border: '1px solid' }} />
        </Grid>
        <Grid item xs={12}>
          {chosenRecipeId !== 0 && (
            <Grid container>
              {chosenRecipe.ingredients.map((item, i) =>
                isIngredientsWithComponentLogic() ? (
                  <Accordion
                    sx={{
                      boxShadow: 'none',
                      width: 1,
                    }}
                    expanded={expandedIngredients === `panel${i}`}
                    onChange={handleChange(`panel${i}`, 'ingredients')}
                    disableGutters
                  >
                    <AccordionSummary
                      expandIcon={
                        expandedIngredients === `panel${i}` ? (
                          <RemoveIcon />
                        ) : (
                          <AddIcon />
                        )
                      }
                    >
                      <Typography
                        fontFamily={'Inter'}
                        variant={'subtitle1'}
                        align={'left'}
                      >
                        {item.component}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {item.ingredients.map((item, j) => (
                        <Grid container key={j} sx={{ paddingY: 0.5 }}>
                          <Grid item xs={9}>
                            <Typography
                              fontFamily={'Inter'}
                              variant={'subtitle1'}
                            >
                              {item.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            {(item.measurement || item.unit) && (
                              <Typography
                                fontFamily={'Inter'}
                                variant={'subtitle1'}
                                align={'right'}
                              >
                                {item.measurement} {item.unit}
                              </Typography>
                            )}
                            {!item.measurement && item.unit && (
                              <Typography
                                fontFamily={'Inter'}
                                variant={'subtitle1'}
                                align={'right'}
                              >
                                {item.unit}
                              </Typography>
                            )}
                          </Grid>
                        </Grid>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Grid item key={i} xs={12}>
                    <Grid container>
                      <Grid item xs={9}>
                        <Typography fontFamily={'Inter'} variant={'subtitle1'}>
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          fontFamily={'Inter'}
                          variant={'subtitle1'}
                          align={'right'}
                        >
                          {item.measurement} {item.unit}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ),
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid item xs={12} sx={{ paddingX: 2 }}>
          <Typography variant={'h6'} align={'left'}>
            Steps
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginY: 1, border: '1px solid' }} />
        </Grid>
        <Grid item xs={12}>
          {chosenRecipeId !== 0 && (
            <Grid container>
              {chosenRecipe.directions.map((item, i) => (
                <Accordion
                  key={i}
                  sx={{
                    boxShadow: 'none',
                    width: 1,
                  }}
                  expanded={expandedDirections === `panel${i}`}
                  onChange={handleChange(`panel${i}`, 'directions')}
                  disableGutters
                >
                  <AccordionSummary
                    expandIcon={
                      expandedDirections === `panel${i}` ? (
                        <RemoveIcon />
                      ) : (
                        <AddIcon />
                      )
                    }
                  >
                    <Typography
                      fontFamily={'Inter'}
                      variant={'subtitle1'}
                      align={'left'}
                      sx={{ fontWeight: 600 }}
                    >
                      {i + 1}. {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container rowSpacing={2}>
                      <Grid item xs={12}>
                        <Typography fontFamily={'Inter'} variant={'body1'}>
                          {item.step}
                        </Typography>
                      </Grid>
                      {item.tips && (
                        <Grid item xs={12}>
                          <Typography
                            fontFamily={'Inter'}
                            variant={'body1'}
                            align={'left'}
                            sx={{ fontWeight: 500 }}
                          >
                            {item.tips}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RecipeDescription;
