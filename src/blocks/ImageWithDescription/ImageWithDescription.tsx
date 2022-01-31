import React from 'react';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Box from '@mui/material/Box';
import useWindowDimensions from 'utils/useWindowDimensions';
import Description from './Description';
import { VideoCard } from 'blocks';
import { baseUrl } from 'utils/constants';
import { selectChosenWriting } from 'redux-toolkit/slices/writingSlice';
import { selectChosenRecipe } from 'redux-toolkit/slices/recipeSlice';

interface Props {
  imagePosition: string;
  isContent?: boolean;
  isRecipe?: boolean;
}

const ImageWithDescription = ({
  imagePosition,
  isContent,
  isRecipe,
}: Props): JSX.Element => {
  const { height } = useWindowDimensions();
  const chosenWriting = useSelector(selectChosenWriting);
  const chosenRecipe = useSelector(selectChosenRecipe);
  function bgColorLogic() {
    return isContent ? 'secondary.main' : 'primary.main';
  }
  return (
    <Box
      sx={{
        position: 'relative',
        marginTop: -13,
      }}
    >
      <Box
        display={'flex'}
        flexDirection={{
          xs: 'column',
          md: imagePosition === 'left' ? 'row' : 'row-reverse',
        }}
        bgcolor={isRecipe ? ' background.paper' : bgColorLogic()}
        height={{ xs: 1, md: height }}
      >
        {!isContent && imagePosition === 'left' ? (
          <VideoCard />
        ) : (
          <Box display={'flex'} width={{ xs: 1, md: 1 / 2 }}>
            <Box
              component={LazyLoadImage}
              height={1}
              width={1}
              src={
                isContent
                  ? isRecipe
                    ? chosenRecipe.image
                    : chosenWriting.image
                  : `${baseUrl}/about-me-1.jpg`
              }
              alt="..."
              effect="blur"
              sx={{
                objectFit: 'cover',
              }}
            />
          </Box>
        )}

        <Description
          imagePosition={imagePosition}
          isRecipe={isRecipe}
          isContent={isContent}
        />
      </Box>
    </Box>
  );
};

export default ImageWithDescription;
