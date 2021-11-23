import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import TodoInput from "../../components/TodoInput";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { redactTodo } from "../../store/reducers/todoMiddleware";
import { Todo } from "../../interface/Todo-interface";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { completeTodo, deleteTodo } from "../../store/reducers/todoMiddleware";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

export default function TodoPage(): JSX.Element {
  let router = useRouter();
  let loading = useSelector((state: RootState) => state.todo.loading);
  let allTodos: Todo[] = useSelector((state: RootState) => state.todo.todos);
  let todo: Todo = allTodos.filter(todo => todo.id == router.query.id)[0];
  let dispatch = useDispatch();

  function complete(id: string) {
    dispatch(completeTodo(id));
  }

  function remove(id: string) {
    let confirmation = confirm("Delete this todo?");

    if (confirmation) {
      dispatch(deleteTodo(id)).then(() => {
        router.push("/todo-list");
      });
    }
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>My todo | Todo</title>
        </Head>
        <Box className="todo__loading">
          <CircularProgress size={60} />
        </Box>
      </>
    );
  } else if (todo !== undefined || null) {
    return (
      <>
        <Head>
          <title>My todo | Todo: {todo.title}</title>
        </Head>
        <Card className="todo__container" variant="outlined">
          <CardContent>
            <TodoInput
              initialState={{
                title: todo.title,
                text: todo.text,
                id: todo.id,
                completed: todo.completed
              }}
              clearInput={false}
              btnText="Redact todo"
              todoDispatch={redactTodo}
            />
          </CardContent>
          <CardContent>
            <p className="todo__date">
              {todo.date}
            </p>
            <p style={{ color: todo.completed ? "#00a152" : "#1976d2" }}>
              Status: {todo.completed ? "Completed" : "Not completed"}
            </p>
          </CardContent>
          <CardActions className="todo__actions">
            <Button
              style={{ width: "100%", margin: "5px" }}
              variant="outlined"
              color="success"
              startIcon={<DoneOutlineIcon />}
              disabled={todo.completed}
              onClick={() => complete(todo.id)}
            >
              Complete
            </Button>
            <Button
              style={{ width: "100%", margin: "5px", marginLeft: "5px" }}
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => remove(todo.id)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <h2>Error 404<br />Todo not found</h2>
        <Link href="/">
          <a className="todo__error">Back to main page</a>
        </Link>
      </>
    );
  }
}