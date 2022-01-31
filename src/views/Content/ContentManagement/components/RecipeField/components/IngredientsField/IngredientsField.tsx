import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddDirectionButton } from '..';
import IngredientsWithoutComponentField from './IngredientsWithoutComponentField';
import './FieldClass.css';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  formik: any;
  isAddContent: boolean;
}

const IngredientsField = ({ formik, isAddContent }: Props): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };
  const initialIngredientsValueWithComponentAdd = {
    ingredientsWithComponent: [
      {
        component: '',
        ingredients: [
          {
            name: '',
            measurement: '',
            unit: '',
          },
        ],
      },
    ],
  };
  const [
    initialIngredientsValueWithComponentEdit,
    setinitialIngredientsValueWithComponentEdit,
  ] = useState({
    ingredientsWithComponent: formik.values.ingredients,
  });
  useEffect(() => {
    if (formik.values.isIngredientsWithComponent) {
      setinitialIngredientsValueWithComponentEdit(formik.values.ingredients);
    }
  }, []);

  return (
    <Box sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginY: 2,
        }}
      >
        <Typography
          fontFamily={'Inter'}
          variant={'h5'}
          sx={{ marginBottom: 2 }}
          fontWeight={700}
        >
          Ingredients
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={checked || formik.values.isIngredientsWithComponent}
              onChange={handleChangeSwitch}
            />
          }
          label={<Typography fontFamily={'Inter'}>with Component</Typography>}
        />
      </Box>
      {checked || formik.values.isIngredientsWithComponent ? (
        <Formik
          initialValues={
            isAddContent
              ? initialIngredientsValueWithComponentAdd
              : initialIngredientsValueWithComponentEdit
          }
          onSubmit={async (values) => {
            formik.setFieldValue(
              'ingredients',
              values.ingredientsWithComponent,
            );
            formik.setFieldValue('isIngredientsWithComponent', true);
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values }) => (
            <Form>
              <FieldArray name="ingredientsWithComponent">
                {({ remove, push }) => (
                  <div>
                    <Box>
                      <AddDirectionButton
                        push={push}
                        isIngredients={true}
                        isWithComponent={true}
                      />
                      {values.ingredientsWithComponent.length > 0 &&
                        values.ingredientsWithComponent.map((component, i) => (
                          <div className="row" key={i}>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <Typography
                                  fontFamily={'Inter'}
                                  variant={'h6'}
                                  sx={{ marginBottom: 2 }}
                                  fontWeight={600}
                                >
                                  Component {i + 1}
                                </Typography>
                                <Box sx={{ px: 4, py: 2 }}>
                                  <IconButton
                                    edge="start"
                                    aria-label="delete"
                                    title="Delete"
                                    size="large"
                                    sx={{ border: '1px solid' }}
                                    onClick={() => remove(i)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                              </Box>
                              <Box>
                                <Typography
                                  fontFamily={'Inter'}
                                  variant={'subtitle2'}
                                  sx={{ marginY: 2 }}
                                  fontWeight={700}
                                >
                                  Component Name
                                </Typography>
                                <Field
                                  name={`ingredientsWithComponent.${i}.component`}
                                  className="titleField"
                                  type="text"
                                />
                              </Box>
                              <FieldArray
                                name={`ingredientsWithComponent[${i}].ingredients`}
                              >
                                {({ remove, push }) => (
                                  <div>
                                    {component.ingredients &&
                                      component.ingredients.length > 0 &&
                                      component.ingredients.map(
                                        (ingredient, j) => (
                                          <Box key={j}>
                                            <Box
                                              sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                              }}
                                            >
                                              <Typography
                                                fontFamily={'Inter'}
                                                variant={'h6'}
                                                sx={{ marginBottom: 2 }}
                                                fontWeight={600}
                                              >
                                                Ingredient {j + 1}
                                              </Typography>
                                              <Box sx={{ px: 4, py: 2 }}>
                                                <IconButton
                                                  edge="start"
                                                  aria-label="delete"
                                                  title="Delete"
                                                  size="large"
                                                  sx={{ border: '1px solid' }}
                                                  onClick={() => remove(j)}
                                                >
                                                  <DeleteIcon />
                                                </IconButton>
                                              </Box>
                                            </Box>
                                            <Box
                                              sx={{
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                              }}
                                            >
                                              <Box>
                                                <Typography
                                                  fontFamily={'Inter'}
                                                  variant={'subtitle2'}
                                                  sx={{ marginY: 2 }}
                                                  fontWeight={700}
                                                >
                                                  Name
                                                </Typography>
                                                <Field
                                                  name={`ingredientsWithComponent[${i}].ingredients[${j}].name`}
                                                  className="titleField"
                                                  type="text"
                                                />
                                              </Box>
                                              <Box>
                                                <Typography
                                                  fontFamily={'Inter'}
                                                  variant={'subtitle2'}
                                                  sx={{ marginY: 2 }}
                                                  fontWeight={700}
                                                >
                                                  Measurement
                                                </Typography>
                                                <Field
                                                  name={`ingredientsWithComponent[${i}].ingredients[${j}].measurement`}
                                                  className="titleField"
                                                  type="text"
                                                />
                                              </Box>
                                              <Box>
                                                <Typography
                                                  fontFamily={'Inter'}
                                                  variant={'subtitle2'}
                                                  sx={{ marginY: 2 }}
                                                  fontWeight={700}
                                                >
                                                  Unit
                                                </Typography>
                                                <Field
                                                  name={`ingredientsWithComponent[${i}].ingredients[${j}].unit`}
                                                  className="titleField"
                                                  type="text"
                                                />
                                              </Box>
                                            </Box>
                                          </Box>
                                        ),
                                      )}
                                    <AddDirectionButton
                                      push={push}
                                      isIngredients={true}
                                      isWithComponent={false}
                                    />
                                  </div>
                                )}
                              </FieldArray>
                            </Box>
                          </div>
                        ))}
                    </Box>
                  </div>
                )}
              </FieldArray>
              <Button variant={'contained'} type={'submit'}>
                Save Ingredients to Formik Object
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <IngredientsWithoutComponentField
          formik={formik}
          isAddContent={isAddContent}
        />
      )}
    </Box>
  );
};

export default IngredientsField;
