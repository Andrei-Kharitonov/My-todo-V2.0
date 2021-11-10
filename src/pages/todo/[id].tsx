import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import TodoInput from "../../components/TodoInput";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchRedactTodo } from "../../store/reducers/todoMiddleware";
import { Todo } from "../../interface/Todo-interface";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { deleteTodo, completeTodo } from "../../store/reducers/todoSlice";
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

  function complete(id: string): void {
    dispatch(completeTodo(id));

    fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${todo.id}/completed.json`, {
      method: "PUT",
      body: JSON.stringify(true),
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  function remove(id: string): void {
    let confirmation = confirm("Delete this todo?");

    if (confirmation) {
      dispatch(deleteTodo(id));
      router.push("/todo-list");

      fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${todo.id}.json`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
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
              todoDispatch={fetchRedactTodo}
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
              className="todo__btn"
              variant="outlined"
              color="success"
              startIcon={<DoneOutlineIcon />}
              disabled={todo.completed}
              onClick={() => complete(todo.id)}
            >
              Complete
            </Button>
            <Button
              className="todo__btn"
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
        <h2>Error!!!<br />This todo does not exist!</h2>
        <Link href="/">
          <a className="todo__error">Back to main page</a>
        </Link>
      </>
    );
  }
}