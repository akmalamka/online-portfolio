/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import usePagination from 'utils/usePagination';
import { DataCard } from 'blocks';
import { PER_PAGE } from 'utils/constants';
import {
  selectAllWritings,
  selectWritingListLoading,
  fetchWritingList,
} from 'redux-toolkit/slices/writingSlice';

const WritingList = (): JSX.Element => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const writings = useSelector(selectAllWritings);
  const writingListLoading = useSelector(selectWritingListLoading);

  useEffect(() => {
    if (writingListLoading === 'idle') {
      dispatch(fetchWritingList());
    }
  }, []);

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [page, setPage] = React.useState(1);

  const count = Math.ceil(writings ? writings.length / PER_PAGE : 0);
  const _DATA = usePagination(writings ? writings : [], PER_PAGE);

  const handleChangePage = (e, p) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(p);
    _DATA.jump(p);
  };

  const onClickWriting = (writingName) => {
    history.push(`${writingName.toLowerCase().replaceAll(' ', '-')}`);
  };

  return (
    <Box>
      <Grid container spacing={4}>
        {(writingListLoading === 'pending'
          ? Array.from(new Array(PER_PAGE))
          : writings
        )
          .slice(PER_PAGE * (page - 1), PER_PAGE * page)
          .map((item, i) => (
            <Grid key={i} item xs={12}>
              {item ? (
                <DataCard
                  index={i}
                  title={item.title}
                  src={item.image}
                  description={item.description}
                  isRecipe={false}
                  onClickWriting={onClickWriting}
                />
              ) : (
                <DataCard
                  index={i}
                  isRecipe={true}
                  onClickWriting={onClickWriting}
                  loading
                />
              )}
            </Grid>
          ))}
      </Grid>
      {writingListLoading === 'fulfilled' && (
        <Pagination
          color={'primary'}
          count={count}
          size="large"
          boundaryCount={0}
          siblingCount={isMd ? 1 : 0}
          page={page}
          sx={{
            marginY: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
          onChange={handleChangePage}
        />
      )}
    </Box>
  );
};

export default WritingList;
