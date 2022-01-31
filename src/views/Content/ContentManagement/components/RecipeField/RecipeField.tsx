import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DirectionField, IngredientsField } from './components';
import { SearchFilterBar, DataCard } from 'blocks';
import { filterMenu, validURL } from 'utils/constants';
import Swal from 'sweetalert2';
import api from 'utils/api';
import {
  fetchRecipeByName,
  selectChosenRecipe,
  selectChosenRecipeId,
  selectChosenRecipeLoading,
} from 'redux-toolkit/slices/recipeSlice';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  isAddContent: boolean;
}

// const validationSchema = yup.object({
//   title: yup
//     .string()
//     .trim()
//     .min(2, 'Please enter a valid title')
//     .max(75, 'Max 75 characters')
//     .required('Please specify the title'),
//   description: yup
//     .string()
//     .trim()
//     .max(190, 'Max 190 characters')
//     .required('Please specify the description'),
//   tags: yup
//     .array()
//     .min(1, 'Minimal 1 tag')
//     .required('Please specify tags'),
//   time: yup
//     .string()
//     .trim()
//     .required('Please specify the time'),
//   foodPhotographyBy: yup
//     .string()
//     .trim()
//     .required('Please specify the food photographer'),
//   foodStylingBy: yup
//     .string()
//     .trim()
//     .required('Please specify the food styler'),
//   recipeBy: yup
//     .string()
//     .trim()
//     .required('Please specify the recipe developer'),
//   inspiredBy: yup.string().trim(),
//   story: yup
//     .string()
//     .trim()
//     .min(2, 'Please enter a valid story')
//     .max(370, 'Max 370 characters')
//     .required('Please specify the story'),
//   date: yup
//     .string()
//     .trim()
//     .required('Please specify the date'),
//   serves: yup
//     .number()
//     .positive('Serves must be positive')
//     .required('Please specify serving'),
//   directions: yup
//     .array()
//     .min(1, 'Minimal 1 directions')
//     .required('Please specify directions'),
// });

const RecipeField = ({ isAddContent }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { recipeTitle } = useParams<{ recipeTitle: string }>();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(fetchRecipeByName(recipeTitle));
  }, []);

  const chosenRecipe = useSelector(selectChosenRecipe);
  const chosenRecipeLoading = useSelector(selectChosenRecipeLoading);
  const chosenRecipeId = useSelector(selectChosenRecipeId);
  const [chipData, setChipData] = useState([]);
  const [successSaveRecipe, setSuccessSaveRecipe] = useState(false);
  const [addedId, setAddedId] = useState(0);
  const [image, setImage] = useState<any>('');

  const initialValuesAdd = {
    image: '',
    title: '',
    description: '',
    tags: chipData,
    time: '',
    foodPhotographyBy: '',
    foodStylingBy: '',
    recipeBy: '',
    inspiredByExist: false,
    inspiredBy: '',
    story: '',
    date: '',
    serves: 0,
    isIngredientsWithComponent: false,
    ingredients: [],
    directions: [],
  };

  const [initialValuesEdit, setinitialValuesEdit] = useState({
    image: '',
    title: chosenRecipe ? chosenRecipe.title : '',
    description: chosenRecipe ? chosenRecipe.description : '',
    tags: chosenRecipe ? chosenRecipe.tags : [],
    time: chosenRecipe ? chosenRecipe.time : '',
    foodPhotographyBy: chosenRecipe ? chosenRecipe.foodPhotographyBy : '',
    foodStylingBy: chosenRecipe ? chosenRecipe.foodStylingBy : '',
    recipeBy: chosenRecipe ? chosenRecipe.recipeBy : '',
    inspiredByExist: chosenRecipe ? chosenRecipe.inspiredByExist : true,
    inspiredBy:
      chosenRecipe && chosenRecipe.inspiredByExist
        ? chosenRecipe.inspiredBy
        : '',
    story: chosenRecipe ? chosenRecipe.story : '',
    date: chosenRecipe ? chosenRecipe.date : '',
    serves: chosenRecipe ? chosenRecipe.serves : '',
    isIngredientsWithComponent:
      chosenRecipe && chosenRecipe.isIngredientsWithComponent === 'True'
        ? true
        : false,
    ingredients: chosenRecipe ? chosenRecipe.ingredients : [],
    directions: chosenRecipe ? chosenRecipe.directions : [],
  });

  useEffect(() => {
    if (chosenRecipeId !== 0 && !isAddContent) {
      setinitialValuesEdit({
        image: '',
        title: chosenRecipe.title,
        description: chosenRecipe.description,
        tags: chosenRecipe.tags,
        time: chosenRecipe.time,
        foodPhotographyBy: chosenRecipe.foodPhotographyBy,
        foodStylingBy: chosenRecipe.foodStylingBy,
        recipeBy: chosenRecipe.recipeBy,
        inspiredByExist: chosenRecipe.inspiredByExist,
        inspiredBy: chosenRecipe.inspiredByExist ? chosenRecipe.inspiredBy : '',
        story: chosenRecipe.story,
        date: chosenRecipe.date,
        serves: chosenRecipe.serves,
        isIngredientsWithComponent:
          chosenRecipe.isIngredientsWithComponent === 'True',
        ingredients: chosenRecipe.ingredients,
        directions: chosenRecipe.directions,
      });
      // formik.setFieldValue('ingredients', chosenRecipe.ingredients);
      // formik.setFieldValue('directions', chosenRecipe.directions);
      setChipData(chosenRecipe.tags);
      setImage(chosenRecipe.image);
    }
  }, [chosenRecipeLoading]);

  const menuMap = (item) => {
    return item;
  };
  const menuItems2D = [].concat(
    filterMenu.map((i) => i.choice.map((item) => menuMap(item))),
  );
  const menuItems1D = [].concat(...menuItems2D);
  const menuIndex = menuItems2D.map((item) => item.length);

  const [isChecked, setIsChecked] = useState(menuItems1D.slice().fill(false));
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChangeFilterExpanded = (isClickAway) => {
    if (isClickAway) {
      setExpanded(false);
    } else {
      setExpanded(!expanded);
    }
  };

  const toggleCheckboxValue = (index) => {
    setIsChecked(isChecked.map((v, i) => (i === index ? !v : v)));
    if (chipData.includes(menuItems1D[index])) {
      setChipData((chips) =>
        chips.filter((chip) => chip !== menuItems1D[index]),
      );
    } else {
      setChipData([...chipData, menuItems1D[index]]);
    }
  };

  const handleDelete = (chipToDelete) => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    const index = menuItems1D.findIndex((element) => element === chipToDelete);
    setIsChecked(isChecked.map((v, i) => (i === index ? !v : v)));
  };

  const handleClearAll = () => {
    setChipData([]);
    setIsChecked(isChecked.map(() => false));
  };

  const onSaveImageRecipe = () => {
    const fd = new FormData();
    fd.append('image', image);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    api
      .post(
        `/recipes/${isAddContent ? addedId : chosenRecipe.id}/image`,
        fd,
        config,
      )
      .then((res) => {
        if (res.data.code == 200) {
          Swal.fire('Image Recipe Updated', 'Hooraayy', 'success').then(() =>
            history.push('/content-management/recipes'),
          );
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
        .post('/recipes', values)
        .then((res) => {
          if (res.data.code == 200) {
            setSuccessSaveRecipe(true);
            setAddedId(res.data.data.id);
            Swal.fire('Recipe Added', 'Hooraayy', 'success');
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
        .put(`/recipes/${chosenRecipe.id}`, values)
        .then((res) => {
          if (res.data.code == 200) {
            setSuccessSaveRecipe(true);
            Swal.fire('Recipe Updated', 'Hooraayy', 'success');
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

  const initialValues = isAddContent ? initialValuesAdd : initialValuesEdit;
  const formik = useFormik({
    initialValues,
    // validationSchema: validationSchema, nanti dipake yaa
    onSubmit,
  });

  // useEffect(() => {
  //   if (!isAddContent) {
  //     formik.setFieldValue('tags', chosenRecipe.tags);
  //     setChipData(chosenRecipe.tags);
  //   }
  // }, []);
  useEffect(() => {
    formik.setFieldValue('tags', chipData);
    // setChipData(chosenRecipe.tags);
  }, [chipData]);

  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setImage(chosenRecipe.image);
      return;
    }
    setImage(event.currentTarget.files[0]);
  };

  const onClearFile = (event) => {
    event.target.value = null;
    if (isAddContent) {
      setImage(null);
    } else {
      setImage(chosenRecipe.image);
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
      return chosenRecipeId !== 0;
    }
  };
  return (
    <Box>
      {(chosenRecipeId !== 0 || isAddContent) && (
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
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
                    onClick={() => onSaveImageRecipe()}
                    disabled={
                      !successSaveRecipe ||
                      (isAddContent && image.length == 0) ||
                      (chosenRecipe &&
                        !isAddContent &&
                        image == chosenRecipe.image)
                    }
                  >
                    <Typography fontFamily={'Inter'} variant={'button'}>
                      Save Image Recipe
                    </Typography>
                  </Button>
                  <Button size={'large'} variant={'contained'} type={'submit'}>
                    <Typography fontFamily={'Inter'} variant={'button'}>
                      Save Recipe
                    </Typography>
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <div className="form-group">
                  <Typography
                    fontFamily={'Inter'}
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
                  fontFamily={'Inter'}
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Food Photography By
                </Typography>
                <TextField
                  variant="outlined"
                  name={'foodPhotographyBy'}
                  fullWidth
                  value={formik.values.foodPhotographyBy}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.foodPhotographyBy &&
                    Boolean(formik.errors.foodPhotographyBy)
                  }
                  helperText={
                    formik.touched.foodPhotographyBy &&
                    formik.errors.foodPhotographyBy
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
                  fontFamily={'Inter'}
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Food Styling By
                </Typography>
                <TextField
                  variant="outlined"
                  name={'foodStylingBy'}
                  fullWidth
                  value={formik.values.foodStylingBy}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.foodStylingBy &&
                    Boolean(formik.errors.foodStylingBy)
                  }
                  helperText={
                    formik.touched.foodStylingBy && formik.errors.foodStylingBy
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
                  fontFamily={'Inter'}
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
                  fontFamily={'Inter'}
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Tags
                </Typography>
                <SearchFilterBar
                  chipData={chipData}
                  isChecked={isChecked}
                  onChangeCheckboxValue={toggleCheckboxValue}
                  onChangeDeleteChip={handleDelete}
                  onClearAll={handleClearAll}
                  menuIndex={menuIndex}
                  filterMenu={filterMenu}
                  expanded={expanded}
                  onChangeFilterExpanded={handleChangeFilterExpanded}
                  isContent={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  fontFamily={'Inter'}
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
              <Grid item xs={12} sm={6}>
                <Typography
                  fontFamily={'Inter'}
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Recipe By
                </Typography>
                <TextField
                  variant="outlined"
                  name={'recipeBy'}
                  fullWidth
                  value={formik.values.recipeBy}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.recipeBy && Boolean(formik.errors.recipeBy)
                  }
                  helperText={formik.touched.recipeBy && formik.errors.recipeBy}
                  sx={{
                    input: {
                      fontFamily: 'Inter',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  fontFamily={'Inter'}
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Inspired By
                </Typography>
                <TextField
                  variant="outlined"
                  name={'inspiredBy'}
                  fullWidth
                  value={formik.values.inspiredBy}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.inspiredBy &&
                    Boolean(formik.errors.inspiredBy)
                  }
                  helperText={
                    formik.touched.inspiredBy && formik.errors.inspiredBy
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
                  fontFamily={'Inter'}
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
                  rows={5}
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
              <Grid item xs={12} sm={6}>
                <Typography
                  fontFamily={'Inter'}
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Date (ex: September 20, 2021)
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
              <Grid item xs={12} sm={3}>
                <Typography
                  fontFamily={'Inter'}
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Serves
                </Typography>
                <TextField
                  variant="outlined"
                  name={'serves'}
                  fullWidth
                  value={formik.values.serves}
                  onChange={formik.handleChange}
                  error={formik.touched.serves && Boolean(formik.errors.serves)}
                  helperText={formik.touched.serves && formik.errors.serves}
                  sx={{
                    input: {
                      fontFamily: 'Inter',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography
                  fontFamily={'Inter'}
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Time (tambahin minutes atau hours di akhirnya )
                </Typography>
                <TextField
                  variant="outlined"
                  name={'time'}
                  fullWidth
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  error={formik.touched.time && Boolean(formik.errors.time)}
                  helperText={formik.touched.time && formik.errors.time}
                  sx={{
                    input: {
                      fontFamily: 'Inter',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </form>
          {/* <IngredientsField formik={formik} isAddContent={isAddContent} /> */}
          <Box sx={{ my: 4 }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  fontFamily={'Inter'}
                  variant={'h5'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Directions
                </Typography>
              </Box>
            </Grid>
            <DirectionField formik={formik} isAddContent={isAddContent} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RecipeField;
