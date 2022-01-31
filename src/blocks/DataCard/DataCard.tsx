/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { ButtonComponent } from 'blocks';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  index: number;
  title?: string;
  src?: string;
  tags?: string[];
  description?: string;
  isRecipe: boolean;
  onClickRecipe?: (title: string) => void;
  onClickWriting?: (title: string) => void;
  isContentManagement?: boolean;
  loading?: boolean;
}

const DataCard = ({
  index,
  title,
  src,
  tags,
  description,
  isRecipe,
  onClickRecipe,
  onClickWriting,
  isContentManagement = false,
  loading = false,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const { url } = useRouteMatch();

  function flexDirectionLogic() {
    if (loading) {
      return index % 2 === 0 ? 'row' : 'row-reverse';
    } else {
      return index % 2 === 0 ? 'row-reverse' : 'row';
    }
  }

  return (
    <Box
      component={Card}
      width={1}
      height={1}
      borderRadius={0}
      boxShadow={0}
      display={'flex'}
      flexDirection={{
        xs: 'column',
        md: flexDirectionLogic(),
      }}
      sx={{ backgroundImage: 'none', bgcolor: 'transparent' }}
    >
      <Box
        sx={{
          '& .lazy-load-image-loaded': {
            display: 'flex !important',
          },
        }}
      >
        {loading ? (
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
        ) : (
          <Link
            to={{
              pathname: `${url}/${title.toLowerCase().replaceAll(' ', '-')}`,
            }}
            style={{ textDecoration: 'none' }}
          >
            <Button
              fullWidth
              disableRipple={true}
              disableFocusRipple={true}
              sx={{
                padding: 0,
                maxHeight: 530,
                maxWidth: 705,
              }}
              onClick={() => {
                isRecipe ? onClickRecipe(title) : onClickWriting(title);
              }}
              disabled={isContentManagement}
            >
              <Box
                component={LazyLoadImage}
                height={1}
                width={1}
                src={src}
                alt="..."
                effect="blur"
                sx={{
                  objectFit: 'contain',
                  maxHeight: { xs: 530, md: 1 },
                }}
              ></Box>
            </Button>
          </Link>
        )}
      </Box>
      <CardContent
        sx={{
          paddingX: { xs: 1, sm: 2, md: 4 },
          width: { xs: 1, md: '50%' },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          height={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {isRecipe && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginY: { xs: 1, md: 0 },
              }}
            >
              {(loading ? Array.from(new Array(3)) : tags).map((item, j) =>
                loading ? (
                  <Skeleton key={j} sx={{ marginX: 1 }} width={50}>
                    <Chip
                      size={'medium'}
                      variant={'outlined'}
                      sx={{
                        border: '1px solid',
                        marginRight: index % 2 === 0 ? 1 : 0,
                        marginLeft: index % 2 === 0 ? 0 : 1,
                      }}
                    />
                  </Skeleton>
                ) : (
                  <Chip
                    key={item}
                    label={item}
                    component="a"
                    size={'medium'}
                    variant={'outlined'}
                    sx={{
                      border: '1px solid',
                      marginRight: index % 2 === 0 ? 1 : 0,
                      marginLeft: index % 2 === 0 ? 0 : 1,
                      color:
                        mode === 'light'
                          ? theme.palette.text.primary
                          : theme.palette.common.white,
                      fontFamily: 'Inter',
                    }}
                  />
                ),
              )}
            </Box>
          )}
          <Typography
            variant={'h3'}
            fontWeight={700}
            sx={{
              marginY: 2,
            }}
            align={'center'}
          >
            {loading ? <Skeleton /> : title}
          </Typography>
          <Typography
            fontFamily={'Inter'}
            variant={'subtitle1'}
            color="text.primary"
            fontWeight={500}
            align={'center'}
          >
            {loading ? <Skeleton /> : description}
          </Typography>
          <Box
            marginTop={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {isContentManagement ? (
              <ButtonComponent
                text={isRecipe ? 'See Recipe' : 'Read More'}
                disabled
              />
            ) : loading ? (
              <Skeleton />
            ) : (
              <Link
                to={`${url}/${title.toLowerCase().replaceAll(' ', '-')}`}
                style={{ textDecoration: 'none' }}
              >
                <ButtonComponent
                  text={isRecipe ? 'See Recipe' : 'Read More'}
                  onClick={() => {
                    isRecipe ? onClickRecipe(title) : onClickWriting(title);
                  }}
                />
              </Link>
            )}
          </Box>
        </Box>
      </CardContent>
    </Box>
  );
};

export default DataCard;
