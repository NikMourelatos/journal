import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Container, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';


const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

function LandingPage() {

  const [rating, setRating] = new React.useState(2)
  const [positiveNoteList, setPositiveNoteList] = new React.useState([])
  const [negativeNoteList, setNegativeNoteList] = new React.useState([])
  const [positiveNotes, setPositiveNotes] = new React.useState({})
  const [negativeNotes, setNegativeNotes] = new React.useState({})


  const GetTodaysDateFormatted = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toDateString()
  }

  const handleChange = (event) => {
    if (event.target.label.includes('Positive')) {
      positiveNotes[event.target.id] = event.target.value
    }
  }


  const DynamicElements = (uuid, isPositive) => {
    let textField = <TextField
      id={uuid}
      label={`${isPositive ? 'Positive' : 'Negative'} Note`}
      multiline
      maxRows={2}
      fullWidth
      value={value}
      onChange={handleChange}
      color={isPositive ? "success" : "error"}
      style={{ marginTop: '5px' }}
    />;

    isPositive ? setPositiveNoteList(positiveNoteList.concat(textField))
      : setNegativeNotesList(negativeNotesList.concat(textField))
  }

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };


  return (
    <Container maxWidth='sm'>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h3><GetTodaysDateFormatted /> Journal Entry</h3>
          <hr />
        </Grid>
        <Grid item>
          <h6>Daily Rating?</h6>
          <StyledRating
            name="highlight-selected-only"
            defaultValue={rating}
            IconContainerComponent={IconContainer}
            getLabelText={(value) => customIcons[value].label}
            highlightSelectedOnly
            onChange={(e, v) => {
              console.log(e)
              console.log(v)
              setRating(v)
            }
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item>
          {DynamicElements(uuidv4(), true)}
          {positiveNoteList}
          <Fab color="primary" aria-label="add" onClick={DynamicElements(uuidv4(), true)}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>


    </Container>
  )
} export default LandingPage;


export const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};