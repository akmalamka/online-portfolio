import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './dotClass.css';
import Container from 'components/Container';
import {
  fetchRecipeList,
  selectAllRecipes,
  selectChosenRecipeTitle,
  selectRecipeListLoading,
} from 'redux-toolkit/slices/recipeSlice';
import { RECIPE_SLICE } from 'utils/constants';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 900 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 40,
  },
};

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  isHome: boolean;
}

const RecipeCarousel = ({ isHome }: Props): JSX.Element => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const recipes = useSelector(selectAllRecipes);
  const recipeListLoading = useSelector(selectRecipeListLoading);
  const chosenRecipeTitle = useSelector(selectChosenRecipeTitle);

  useEffect(() => {
    if (recipeListLoading === 'idle') {
      dispatch(fetchRecipeList());
    }
  }, []);
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });

  const recipeFilter = recipes.filter(
    (item) => item.title !== chosenRecipeTitle,
  );

  function carouselLogic(command: string) {
    if (command === 'recipes') {
      return recipeListLoading === 'fulfilled'
        ? recipes
        : Array.from(new Array(3));
    } else {
      return recipeListLoading === 'fulfilled'
        ? recipeFilter
        : Array.from(new Array(3));
    }
  }

  return (
    <Container>
      <Box marginBottom={4}>
        {isHome && (
          <Typography
            variant="h6"
            data-aos={isMd ? 'fade-up' : 'none'}
            color="text.primary"
            align={'center'}
            gutterBottom
            sx={{
              fontFamily: 'Inter',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            Recipes
          </Typography>
        )}

        <Typography
          variant="h3"
          data-aos={isMd ? 'fade-up' : 'none'}
          color="text.primary"
          align={'center'}
          gutterBottom
          sx={{
            fontWeight: 600,
          }}
        >
          {isHome ? 'Go try this recent recipes!' : 'Try another recipes!'}
        </Typography>
      </Box>
      <Carousel
        showDots={isSm ? true : false}
        responsive={responsive}
        removeArrowOnDeviceType={['tablet', 'mobile']}
        infinite={true}
        partialVisible={true}
        transitionDuration={600}
        containerClass="react-multi-carousel-list"
      >
        {(isHome
          ? carouselLogic('recipes').slice(0, RECIPE_SLICE)
          : carouselLogic('recipeFilter').slice(0, RECIPE_SLICE)
        ).map((item, i) => (
          <Box key={i} flexDirection={'column'} m={2}>
            {item ? (
              <Link
                to={{
                  pathname: `/recipes/${item.title
                    .toLowerCase()
                    .replaceAll(' ', '-')}`,
                }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Box
                  component={LazyLoadImage}
                  height={1}
                  width={1}
                  src={item.image}
                  alt="..."
                  effect="blur"
                  sx={{
                    objectFit: 'cover',
                    height: {
                      sm: 330,
                      md: 350,
                      lg: 480,
                    },
                    borderRadius: 2,
                  }}
                />
              </Link>
            ) : (
              <Skeleton
                variant={'rectangular'}
                sx={{
                  height: {
                    sm: 330,
                    md: 350,
                    lg: 480,
                  },
                  borderRadius: 2,
                }}
              />
            )}
            {item ? (
              <Link
                to={{
                  pathname: `/recipes/${item.title
                    .toLowerCase()
                    .replaceAll(' ', '-')}`,
                }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography
                  color="text.primary"
                  fontWeight={700}
                  variant="h5"
                  sx={{
                    marginTop: 2,
                    '&:hover': {
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    },
                  }}
                >
                  {item.title}
                </Typography>
              </Link>
            ) : (
              <Skeleton sx={{ marginTop: 2 }} />
            )}
          </Box>
        ))}
      </Carousel>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
          href="/recipes"
        >
          <Typography
            variant="button"
            color="text.primary"
            sx={{
              fontFamily: 'Inter',
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              fontWeight: 400,
              fontSize: { xs: 12, md: 14 },
            }}
          >
            View All Recipes
          </Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default RecipeCarousel;
