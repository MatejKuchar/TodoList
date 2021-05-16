import React from "react";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { capitalize } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FormControlLabel } from "@material-ui/core";

import Axios from "axios";

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
    display: "block",
  },
  formLabel: {
    marginBottom: 20,
    display: "inline-block",
    fontSize: 20,
  },
  heading: {
    marginTop: 20,
    letterSpacing: 1,
  },
  btn: {
    fontWeight: "600",
    letterSpacing: 1,
  },
});

const Create = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [category, setCategory] = useState("important");
  const [dateTime, setDateTime] = useState("");

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const currentDateTime = new Date();
    const currentDateTimeString = currentDateTime.toString();
    setDateTime(currentDateTimeString);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setTextError(false);

    setTitle("");
    setText("");

    if (title && text) {
      setOpen(true);
    }
    if (title == "") {
      setTitleError(true);
    }
    if (text == "") {
      setTextError(true);
    }

    Axios.post("http://localhost:3001/insert", {
      title: title,
      text: text,
      category: category,
      dateTime: dateTime,
    });
  };

  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
        align="center"
        gutterBottom
        className={classes.heading}
      >
        Create a new Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          value={capitalize(title)}
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          fullWidth
          required
          error={titleError}
          autoFocus
        />
        <TextField
          value={capitalize(text)}
          onChange={(e) => setText(e.target.value)}
          className={classes.field}
          label="Note Text"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
          error={textError}
        />

        <FormControl className={classes.field}>
          <FormLabel className={classes.formLabel}>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              control={<Radio />}
              value="important"
              label="Important"
            />
            <FormControlLabel control={<Radio />} value="good" label="Good" />
            <FormControlLabel
              control={<Radio />}
              value="optional"
              label="Optional"
            />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          className={classes.btn}
        >
          Submit
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Todo was added
        </Alert>
      </Snackbar>{" "}
    </Container>
  );
};

export default Create;
