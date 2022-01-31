import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import api from 'utils/api';

interface Props {
  title: string;
  image: string;
  id: number;
  handleRefreshPage: (refreshPage: boolean) => void;
  isRecipe: boolean;
}

const ContentCard = ({
  title,
  image,
  id,
  handleRefreshPage,
  isRecipe,
}: Props): JSX.Element => {
  const { url } = useRouteMatch();

  const onClickDelete = (id) => {
    Swal.fire({
      title: `Are you sure you wanna delete ${title}?`,
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/${isRecipe ? 'recipes' : 'writings'}/${id}/image`)
          .then((res) => {
            if (res.data.code == 200) {
              Swal.fire(
                'Deleted!',
                'Your image file has been deleted.',
                'success',
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
        api
          .delete(`/${isRecipe ? 'recipes' : 'writings'}/${id}`)
          .then((res) => {
            if (res.data.code == 200) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              handleRefreshPage(true);
              handleRefreshPage(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled', 'Your file is safe :)', 'error');
      }
    });
  };

  return (
    <Grid item xs={4}>
      <Box
        sx={{
          '& .lazy-load-image-loaded': {
            display: 'flex !important',
          },
          boxShadow: 1,
          position: 'relative',
          p: 2,
        }}
      >
        <Box
          component={LazyLoadImage}
          height={1}
          width={1}
          src={image}
          alt="..."
          effect="blur"
          sx={{
            objectFit: 'cover',
            height: 370,
            borderRadius: 2,
          }}
        />
        <Typography
          variant={'h6'}
          fontWeight={600}
          sx={{
            marginY: 2,
            display: 'flex',
            height: 70,
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 2 }}>
          <Button
            variant="outlined"
            color="error"
            sx={{
              borderRadius: 10,
              border: 2,
              px: 2,
              '&:hover': {
                border: 2,
              },
            }}
            startIcon={<DeleteIcon />}
            onClick={() => onClickDelete(id)}
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
              Delete
            </Typography>
          </Button>
          <Link
            to={`${url}/edit/${title.toLowerCase().replaceAll(' ', '-')}`}
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: 10,
                border: 2,
                px: 2,
                '&:hover': {
                  border: 2,
                },
              }}
              startIcon={<EditIcon />}
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
                Edit
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
};

export default ContentCard;
