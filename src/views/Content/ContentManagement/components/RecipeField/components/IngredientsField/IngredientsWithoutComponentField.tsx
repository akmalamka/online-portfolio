import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddDirectionButton } from '..';
import './FieldClass.css';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  formik: any;
  isAddContent: boolean;
}

const IngredientsWithoutComponentField = ({
  formik,
  isAddContent,
}: Props): JSX.Element => {
  const initialIngredientsValueWithoutComponentAdd = {
    ingredientsWithoutComponent: [
      {
        name: '',
        measurement: '',
        unit: '',
      },
    ],
  };

  const [
    initialIngredientsValueWithoutComponentEdit,
    setinitialIngredientsValueWithoutComponentEdit,
  ] = useState({
    ingredientsWithoutComponent: formik.values.ingredients,
  });
  useEffect(() => {
    if (!formik.values.isIngredientsWithComponent) {
      setinitialIngredientsValueWithoutComponentEdit(formik.values.ingredients);
    }
  }, []);

  return (
    <Box>
      <Formik
        initialValues={
          isAddContent
            ? initialIngredientsValueWithoutComponentAdd
            : initialIngredientsValueWithoutComponentEdit
        }
        onSubmit={async (values) => {
          formik.setFieldValue(
            'ingredients',
            values.ingredientsWithoutComponent,
          );
          formik.setFieldValue('isIngredientsWithComponent', false);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="ingredientsWithoutComponent">
              {({ remove, push }) => (
                <div>
                  <Box>
                    {values.ingredientsWithoutComponent.length > 0 &&
                      values.ingredientsWithoutComponent.map(
                        (ingredient, index) => (
                          <div className="row" key={index}>
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
                                  Ingredient {index + 1}
                                </Typography>
                                <Box sx={{ px: 4, py: 2 }}>
                                  <IconButton
                                    edge="start"
                                    aria-label="delete"
                                    title="Delete"
                                    size="large"
                                    sx={{ border: '1px solid' }}
                                    onClick={() => remove(index)}
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
                                    name={`ingredientsWithoutComponent.${index}.name`}
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
                                    name={`ingredientsWithoutComponent.${index}.measurement`}
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
                                    name={`ingredientsWithoutComponent.${index}.unit`}
                                    className="titleField"
                                    type="text"
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </div>
                        ),
                      )}
                    <AddDirectionButton
                      push={push}
                      isIngredients={true}
                      isWithComponent={false}
                    />
                  </Box>
                </div>
              )}
            </FieldArray>
            <Button variant={'contained'} type={'submit'}>
              <Typography fontFamily={'Inter'} variant={'button'}>
                Save Ingredients to Formik Object
              </Typography>
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default IngredientsWithoutComponentField;
