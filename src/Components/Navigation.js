import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  navBtn: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  navContainer: {
    marginLeft: "auto",
  },
});

const Navigation = () => {
  const classes = useStyles();

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todo App</Typography>
          <div className={classes.navContainer}>
            <Button>
              <Link to="/" className={classes.navBtn}>
                Notes
              </Link>
            </Button>
            <Button>
              <Link to="/create" className={classes.navBtn}>
                Create Note
              </Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Navigation;
