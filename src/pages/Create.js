import React, { useState } from "react";
import {
  Typography,
  Button,
  Container,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginBottom: 20,
    marginTop: 10,
    display: 'block'
  },
});

export default function Create() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTe] = useState(false);
  const [detailsError, setDe] = useState(false);
  const [category, setCategory] = useState("money")
  const history = useHistory()

  const submitHandle = (e) => {
    e.preventDefault();

    setTe(false);
    setDe(false);

    if (title === "") {
      setTe(true);
    }

    if (details === "") {
      setDe(true);
    }

    if (title && details && category) {
      fetch("http://localhost:5000/notes",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify({title,details,category})
      }).then(()=> history.push('/'))
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a new Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={submitHandle}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={classes.field}
          variant="outlined"
          label="Note Title"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          className={classes.field}
          variant="outlined"
          label="Details"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel >Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e)=> setCategory(e.target.value)}
          >
            <FormControlLabel
              value="money"
              control={<Radio />}
              label="Money"
            />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel
              value="work"
              control={<Radio />}
              label="Work"
            />
          </RadioGroup>
        </FormControl>
        <Button
          color="secondary"
          type="submit"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
