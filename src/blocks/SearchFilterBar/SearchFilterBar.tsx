import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Badge from '@mui/material/Badge';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './placeholder.css';
import { ButtonComponent } from 'blocks';
import {
  setChipList,
  resetChipList,
  setKeyword,
} from 'redux-toolkit/slices/searchFilterSlice';

interface Filter {
  type: string;
  choice: string[];
}
interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  keyword?: string;
  onChangeKeyword?: (keyword) => void;
  chipData?: string[];
  isChecked?: boolean[];
  onChangeCheckboxValue?: (number) => void;
  onChangeDeleteChip?: (string) => void;
  onClearAll?: () => void;
  menuIndex?: number[];
  filterMenu?: Filter[];
  expanded?: boolean;
  onChangeFilterExpanded?: (boolean) => void;
  isContent?: boolean;
}
interface FilterIconProps {
  isMobile: boolean;
  isActive?: boolean;
}

const FilterIcon = ({ isMobile, isActive }: FilterIconProps): JSX.Element => {
  return isMobile ? (
    <Badge
      badgeContent={isActive ? ' ' : 0}
      variant="dot"
      sx={{ '.MuiBadge-dot': { backgroundColor: '#ff8261' } }}
    >
      <FilterListIcon />
    </Badge>
  ) : (
    <FilterListIcon />
  );
};

const SearchFilterBar = ({
  keyword,
  onChangeKeyword,
  chipData,
  isChecked,
  onChangeCheckboxValue,
  onChangeDeleteChip,
  onClearAll,
  menuIndex,
  filterMenu,
  expanded,
  onChangeFilterExpanded,
  isContent,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const dispatch = useDispatch();

  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });
  const isXs = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });

  const menuIndexHandler = (index) => {
    let a = 0;
    for (let i = 0; i < index; i++) {
      a += menuIndex[i];
    }
    return a;
  };

  const handleClickAway = () => {
    if (expanded) {
      onClearAll();
    }
    onChangeFilterExpanded(true);
  };

  const onClickDone = () => {
    if (!isContent) {
      dispatch(setChipList(chipData));
    }
    onChangeFilterExpanded(false);
  };

  const onDeleteChip = (item) => {
    onChangeDeleteChip(item);
  };

  const onClickClearAll = () => {
    onClearAll();
    if (!isContent) {
      dispatch(resetChipList());
    }
  };

  useEffect(() => {
    dispatch(setKeyword(keyword));
  }, [keyword]);

  return (
    <Box>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Accordion
          expanded={expanded}
          sx={{
            minWidth: {
              xs: 300,
              sm: 400,
              md: isContent ? 570 : 600,
            },
            boxShadow: 'none',
          }}
        >
          <Box
            width={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 6,
              borderColor:
                mode === 'light'
                  ? theme.palette.primary.light
                  : theme.palette.common.white,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                border: '2px solid',
                borderRadius: 30,
              }}
            >
              {!isContent && (
                <Box width={1} marginRight={1}>
                  <TextField
                    sx={{
                      height: 54,
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: '0 !important',
                      },
                      input: {
                        fontFamily: 'Inter',
                        '&::placeholder': {
                          fontFamily: 'Inter',
                          fontSize: {
                            xs: '14px',
                            md: '16px',
                          },
                          color: theme.palette.text.primary,
                        },
                      },
                    }}
                    variant="outlined"
                    size="medium"
                    placeholder="Try 'Pasta'"
                    fullWidth
                    value={keyword}
                    onChange={(event) => onChangeKeyword(event.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box
                            component={'svg'}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            width={24}
                            height={24}
                            sx={{
                              color: theme.palette.primary.main,
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              )}
              {isContent && (
                <Box width={1} marginRight={1}>
                  <Typography fontFamily={'Inter'} m={2}>
                    Tags
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  onClick={() => onChangeFilterExpanded(false)}
                  sx={{
                    mx: 2,
                    color: theme.palette.primary.main,
                  }}
                  size="medium"
                >
                  {isContent ? (
                    <ExpandMoreIcon />
                  ) : isXs ? (
                    <FilterIcon
                      isMobile={true}
                      isActive={chipData.length > 0}
                    />
                  ) : (
                    <FilterIcon isMobile={false} />
                  )}
                </IconButton>
              </Box>
            </Box>
            {isSm && chipData.length > 0 && !expanded && (
              <Box sx={{ m: 2 }}>
                {chipData.map((item, i) => (
                  <Chip
                    key={i}
                    color={'primary'}
                    label={
                      <Typography variant={'button'} fontFamily={'Inter'}>
                        {item}
                      </Typography>
                    }
                    onDelete={() => onDeleteChip(item)}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
                <Chip
                  label={
                    <Typography variant={'button'} fontFamily={'Inter'}>
                      Clear All
                    </Typography>
                  }
                  sx={{ mr: 1, mb: 1 }}
                  onClick={() => onClickClearAll()}
                />
              </Box>
            )}
          </Box>
          {!isSm && (
            <Box>
              <Divider sx={{ my: 2, border: '1px solid' }} />
            </Box>
          )}
          <AccordionDetails
            sx={{
              position: { xs: 'static', sm: 'absolute' },
              zIndex: 3,
              backgroundColor: 'background.paper',
              border: { xs: 'none', sm: '2px solid' },
              borderRadius: 2,
              width: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                maxHeight: { sm: 250, md: 450 },
                overflow: 'auto',
              }}
            >
              {filterMenu.map((filter, i) => (
                <FormControl
                  key={i}
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel
                    component="legend"
                    sx={{
                      color: 'text.primary',
                      fontFamily: 'Inter',
                    }}
                  >
                    {filter.type}
                  </FormLabel>
                  <FormGroup>
                    {filter.choice.map((item, j) => (
                      <FormControlLabel
                        key={j}
                        control={
                          <Checkbox
                            key={j + menuIndexHandler(i)}
                            checked={isChecked[j + menuIndexHandler(i)]}
                            onClick={() =>
                              onChangeCheckboxValue(j + menuIndexHandler(i))
                            }
                            name={item}
                            sx={{ color: 'text.primary' }}
                          />
                        }
                        label={
                          <Typography variant={'button'} fontFamily={'Inter'}>
                            {item}
                          </Typography>
                        }
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              ))}
            </Box>
            {isChecked.includes(true) && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  rowGap: 2,
                }}
              >
                <ButtonComponent
                  color={'primary'}
                  isSearchBar={true}
                  text={'Done'}
                  onClick={() => onClickDone()}
                />
                {isXs && (
                  <ButtonComponent
                    isSearchBar={true}
                    isClearAll={true}
                    text={'Clear All'}
                    onClick={() => onClearAll()}
                  />
                )}
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </ClickAwayListener>
    </Box>
  );
};

export default SearchFilterBar;
