import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataCard } from 'blocks';
import Swal from 'sweetalert2';
import api from 'utils/api';
import {
  fetchWritingByName,
  selectChosenWriting,
  selectChosenWritingId,
  selectChosenWritingLoading,
} from 'redux-toolkit/slices/writingSlice';
import { validURL } from 'utils/constants';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  isAddContent: boolean;
}

// const validationSchema = yup.object({
//   fullName: yup
//     .string()
//     .trim()
//     .min(2, 'Please enter a valid name')
//     .max(50, 'Please enter a valid name')
//     .required('Please specify your first name'),
//   email: yup
//     .string()
//     .trim()
//     .email('Please enter a valid email address')
//     .required('Email is required.'),
//   bio: yup
//     .string()
//     .trim()
//     .max(500, 'Should be less than 500 chars'),
//   country: yup
//     .string()
//     .trim()
//     .min(2, 'Please enter a valid name')
//     .max(80, 'Please enter a valid name')
//     .required('Please specify your country name'),
//   city: yup
//     .string()
//     .trim()
//     .min(2, 'Please enter a valid name')
//     .max(80, 'Please enter a valid name')
//     .required('Please specify your city name'),
//   address: yup
//     .string()
//     .required('Please specify your address')
//     .min(2, 'Please enter a valid address')
//     .max(200, 'Please enter a valid address'),
// });

const WritingsField = ({ isAddContent }: Props): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { writingTitle } = useParams<{ writingTitle: string }>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(fetchWritingByName(writingTitle));
  }, []);

  const chosenWriting = useSelector(selectChosenWriting);
  const chosenWritingLoading = useSelector(selectChosenWritingLoading);
  const chosenWritingId = useSelector(selectChosenWritingId);
  const [successSaveWriting, setSuccessSaveWriting] = useState(false);
  const [addedId, setAddedId] = useState(0);
  const [image, setImage] = useState<any>('');

  const initialValues = {
    image: '',
    description: '',
    title: '',
    writingsBy: '',
    photographBy: '',
    story: '',
    date: '',
  };

  useEffect(() => {
    if (chosenWritingId !== 0 && !isAddContent) {
      formik.setValues({
        image: '',
        description: chosenWriting.description,
        title: chosenWriting.title,
        writingsBy: chosenWriting.writingsBy,
        photographBy: chosenWriting.photographBy,
        story: chosenWriting.story,
        date: chosenWriting.date,
      });
      setImage(chosenWriting.image);
    }
  }, [chosenWritingLoading]);

  const onSaveImageWriting = () => {
    const fd = new FormData();
    fd.append('image', image);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    api
      .post(
        `/writings/${isAddContent ? addedId : chosenWriting.id}/image`,
        fd,
        config,
      )
      .then((res) => {
        if (res.data.code == 200) {
          Swal.fire(
            `Image Writing ${isAddContent ? 'Added!' : 'Updated!'}`,
            'Hooraayy',
            'success',
          ).then(() => history.push('/content-management/writings'));
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err}`,
        });
      });
  };
  const onSubmit = (values) => {
    if (isAddContent) {
      api
        .post('/writings', values)
        .then((res) => {
          if (res.data.code == 200) {
            setSuccessSaveWriting(true);
            setAddedId(res.data.data.id);
            Swal.fire('Writing Added', 'Hooraayy', 'success');
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err}`,
          });
        });
    } else {
      api
        .put(`/writings/${chosenWriting.id}`, values)
        .then((res) => {
          if (res.data.code == 200) {
            setSuccessSaveWriting(true);
            Swal.fire('Writing Updated', 'Hooraayy', 'success');
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err}`,
          });
        });
    }
  };
  const formik = useFormik({
    initialValues,
    // validationSchema: validationSchema,
    onSubmit,
  });

  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setImage(chosenWriting.image);
      return;
    }
    setImage(event.currentTarget.files[0]);
  };

  const onClearFile = (event) => {
    event.target.value = null;
    if (isAddContent) {
      setImage(null);
    } else {
      setImage(chosenWriting.image);
    }
  };

  const srcLogic = () => {
    if (isAddContent) {
      if (image) {
        return URL.createObjectURL(image);
      }
    } else {
      if (image === '') {
        return '';
      } else if (validURL(image)) {
        return image;
      } else {
        return URL.createObjectURL(image);
      }
    }
  };
  const previewLogic = () => {
    if (isAddContent) {
      return image;
    } else {
      return chosenWritingId !== 0;
    }
  };
  return (
    <Box>
      {(chosenWritingId !== 0 || isAddContent) && (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <div className="form-group">
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Image Upload
                </Typography>
                <form encType="multipart/form-data">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={onSelectFile}
                    className="form-control"
                  />
                  <Button variant="contained" onClick={onClearFile}>
                    <Typography fontFamily={'Inter'} variant={'button'}>
                      Clear File
                    </Typography>
                  </Button>
                </form>
                {previewLogic() && (
                  <DataCard
                    index={0}
                    title={'Title'}
                    src={srcLogic()}
                    tags={['tags', 'tag']}
                    description={'Description'}
                    isRecipe={true}
                    isContentManagement={true}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant={'subtitle2'}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                Title
              </Typography>
              <TextField
                variant="outlined"
                name={'title'}
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                sx={{
                  input: {
                    fontFamily: 'Inter',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant={'subtitle2'}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                Writings By
              </Typography>
              <TextField
                variant="outlined"
                name={'writingsBy'}
                fullWidth
                value={formik.values.writingsBy}
                onChange={formik.handleChange}
                error={
                  formik.touched.writingsBy && Boolean(formik.errors.writingsBy)
                }
                helperText={
                  formik.touched.writingsBy && formik.errors.writingsBy
                }
                sx={{
                  input: {
                    fontFamily: 'Inter',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant={'subtitle2'}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                Date (ex September 20, 2021)
              </Typography>
              <TextField
                variant="outlined"
                name={'date'}
                fullWidth
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                sx={{
                  input: {
                    fontFamily: 'Inter',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant={'subtitle2'}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                Photograph By (tambahin from ... kalau download)
              </Typography>
              <TextField
                variant="outlined"
                name={'photographBy'}
                fullWidth
                value={formik.values.photographBy}
                onChange={formik.handleChange}
                error={
                  formik.touched.photographBy &&
                  Boolean(formik.errors.photographBy)
                }
                helperText={
                  formik.touched.photographBy && formik.errors.photographBy
                }
                sx={{
                  input: {
                    fontFamily: 'Inter',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant={'subtitle2'}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                Description
              </Typography>
              <TextField
                variant="outlined"
                name={'description'}
                multiline
                rows={5}
                fullWidth
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                sx={{
                  textarea: {
                    fontFamily: 'Inter',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant={'subtitle2'}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                Story
              </Typography>
              <TextField
                variant="outlined"
                name={'story'}
                multiline
                rows={10}
                fullWidth
                value={formik.values.story}
                onChange={formik.handleChange}
                error={formik.touched.story && Boolean(formik.errors.story)}
                helperText={formik.touched.story && formik.errors.story}
                sx={{
                  textarea: {
                    fontFamily: 'Inter',
                  },
                }}
              />
            </Grid>
            <Grid item container xs={12}>
              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretched', sm: 'center' }}
                justifyContent={'flex-end'}
                width={1}
                margin={'0 auto'}
                columnGap={4}
              >
                <Button
                  size={'large'}
                  variant={'contained'}
                  onClick={() => onSaveImageWriting()}
                  disabled={
                    !successSaveWriting ||
                    (isAddContent && image.length == 0) ||
                    (chosenWriting &&
                      !isAddContent &&
                      image == chosenWriting.image)
                  }
                >
                  <Typography fontFamily={'Inter'} variant={'button'}>
                    Save Image Writing
                  </Typography>
                </Button>
                <Button size={'large'} variant={'contained'} type={'submit'}>
                  <Typography fontFamily={'Inter'} variant={'button'}>
                    Save Writings
                  </Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default WritingsField;
