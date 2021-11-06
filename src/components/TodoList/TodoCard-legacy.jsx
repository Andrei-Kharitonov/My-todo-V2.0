import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteTodo, completeTodo } from "../../store/reducers/todoSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import RedactModal from "../RedactModal/RedactModal";

function TodoCard({ title, text, date, id, completed, styles }) {
  let dispatch = useDispatch();

  function performTodo(id) {
    dispatch(completeTodo(id));

    fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}/completed.json`, {
      method: "PUT",
      body: JSON.stringify(true),
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  function removeTodo(id) {
    dispatch(deleteTodo(id));

    fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  return (
    <Card id={id} className="todo" variant="outlined" style={styles.card}>
      <div className="todo__container" style={styles.cardInner}>
        <CardContent style={styles.cardContent}>
          <Typography className={completed ? "todo__title todo__title_comp" : "todo__title"} variant="h5" component="h5">
            {title}
          </Typography>
          <Typography className="todo__text" variant="p" component="p">
            {text}
          </Typography>
          <hr />
          <Typography className="todo__date" variant="p" component="p">
            {date}
          </Typography>
          <Typography className={completed ? "todo__status todo__status_comp" : "todo__status"} variant="p" component="p">
            Status: {completed ? "completed" : "not completed"}
          </Typography>
        </CardContent>
        <CardActions className="todo__btns">
          <RedactModal title={title} text={text} id={id} completed={completed} />
          <Button
            variant="outlined"
            color="success"
            style={styles.btn}
            startIcon={<DoneOutlineIcon />}
            disabled={completed}
            onClick={() => performTodo(id)}
          >
            Complete
          </Button>
          <Button
            variant="outlined"
            color="error"
            style={styles.btn}
            startIcon={<DeleteIcon />}
            onClick={() => removeTodo(id)}
          >
            Delete
          </Button>
        </CardActions>
      </div>
    </Card >
  );
}

TodoCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  completed: PropTypes.bool,
  styles: PropTypes.object,
};

export default TodoCard;