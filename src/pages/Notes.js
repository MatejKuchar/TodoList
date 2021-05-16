import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Moment from "react-moment";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    flexGrow: 1,
    overflow: "hidden",
    margin: theme.spacing(2, 3),
    background: "#F8F9FB",
  },
  notFound: {
    marginTop: 20,
  },
  subheader: {
    paddingBottom: 0,
  },
  btnDelete: {
    marginLeft: "auto",
  },
  cardContent: {
    position: "relative",
  },
  category: {
    marginTop: 20,
    position: "absolute",
  },
}));

const Notes = () => {
  const [todoList, setTodoList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setTodoList(response.data);
    });
  }, [todoList]);

  const deleteTodo = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <Container>
      {todoList.length <= 0 && (
        <Typography
          variant="h5"
          component="h2"
          align="center"
          className={classes.notFound}
        >
          Todo list je prázdny :(
        </Typography>
      )}
      {todoList.map((todo) => (
        <Card className={classes.card} key={todo._id}>
          <CardHeader
            subheader={
              <Typography>
                <Moment fromNow>{todo.dateTime}</Moment>
              </Typography>
            }
            className={classes.subheader}
          />
          <CardActionArea>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {todo.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {todo.text}
              </Typography>
              <Chip
                color="secondary"
                label={<Typography variant="body2">{todo.category}</Typography>}
                className={classes.category}
              />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              onClick={() => deleteTodo(todo._id)}
              color="primary"
              variant="outlined"
              className={classes.btnDelete}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

export default Notes;
