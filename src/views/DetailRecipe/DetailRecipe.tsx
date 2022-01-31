import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { RecipeDescription } from './components';
import { RecipeCarousel, ImageWithDescription } from 'blocks';
import {
  fetchRecipeByName,
  selectChosenRecipeTitle,
} from 'redux-toolkit/slices/recipeSlice';

const DetailRecipe = (): JSX.Element => {
  const dispatch = useDispatch();
  const { recipeTitle } = useParams<{ recipeTitle: string }>();
  const recentChosenRecipeTitle = useSelector(selectChosenRecipeTitle);
  function refresh() {
    setTimeout(function() {
      window.location.reload();
    }, 1000);
  }

  function scrollUp() {
    setTimeout(function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }
  useEffect(() => {
    if (
      recentChosenRecipeTitle.toLowerCase() !== recipeTitle.replaceAll('-', ' ')
    ) {
      dispatch(fetchRecipeByName(recipeTitle));
      // refresh();
      scrollUp();
    }
  }, [recipeTitle]);

  return (
    <Box>
      <Main colorInvert={false}>
        <ImageWithDescription
          imagePosition={'left'}
          isContent={true}
          isRecipe={true}
        />
        <Container paddingY={2}>
          <RecipeDescription />
        </Container>
        <Container>
          <RecipeCarousel isHome={false} />
        </Container>
      </Main>
    </Box>
  );
};

export default DetailRecipe;
