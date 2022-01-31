import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import { ImageWithDescription } from 'blocks';
import { WritingCard } from './components';
import {
  fetchWritingByName,
  selectChosenWritingTitle,
} from 'redux-toolkit/slices/writingSlice';

const DetailWriting = (): JSX.Element => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const dispatch = useDispatch();
  const { writingTitle } = useParams<{ writingTitle: string }>();
  const recentChosenWritingTitle = useSelector(selectChosenWritingTitle);
  useEffect(() => {
    if (
      recentChosenWritingTitle.toLowerCase() !==
      writingTitle.replaceAll('-', ' ')
    ) {
      dispatch(fetchWritingByName(writingTitle));
    }
  }, []);

  return (
    <Box>
      <Main colorInvert={true}>
        <ImageWithDescription
          imagePosition={'left'}
          isContent={true}
          isRecipe={false}
        />
        <Box marginX={{ xs: 4, md: 8 }} marginY={{ xs: 2, md: 4 }}>
          <WritingCard />
        </Box>
      </Main>
    </Box>
  );
};

export default DetailWriting;
