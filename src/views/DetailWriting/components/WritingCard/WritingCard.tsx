/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  selectChosenWriting,
  selectChosenWritingId,
} from 'redux-toolkit/slices/writingSlice';

const WritingCard = (): JSX.Element => {
  const chosenWriting = useSelector(selectChosenWriting);
  const chosenWritingId = useSelector(selectChosenWritingId);
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box
        width={{ xs: 0.9, sm: 3 / 4, md: 1 / 2 }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          marginY: { xs: 2, md: 4 },
        }}
      >
        <Typography
          color={'text.primary'}
          variant="h2"
          align={'center'}
          sx={{
            fontWeight: 600,
          }}
          gutterBottom
        >
          {chosenWritingId !== 0 ? chosenWriting.title : ''}
        </Typography>
        {(chosenWritingId !== 0 ? chosenWriting.story : '')
          .split('\n')
          .filter((item) => item.length > 0)
          .map((item, i) => (
            <Typography
              key={i}
              variant={'body1'}
              color="text.primary"
              fontFamily={'Inter'}
              align={'justify'}
              paragraph
              sx={{ lineHeight: 1.8 }}
            >
              {item}
            </Typography>
          ))}
      </Box>
    </Box>
  );
};

export default WritingCard;
