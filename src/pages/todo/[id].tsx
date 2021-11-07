import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import TodoInput from "../../components/TodoInput/TodoInput";
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
    let confirmation = confirm("Do you really want delete this todo");

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
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "250px" }}>
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
        <Card variant="outlined" style={{ width: "100%" }}>
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
            <p style={{ color: "#999" }}>
              {todo.date}
            </p>
            <p style={{ color: todo.completed ? "#00a152" : "#000" }}>
              Status: {todo.completed ? "Completed" : "Not completed"}
            </p>
          </CardContent>
          <CardActions style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
            <Button
              variant="outlined"
              color="success"
              style={{ width: "100%", margin: "4px" }}
              startIcon={<DoneOutlineIcon />}
              disabled={todo.completed}
              onClick={() => complete(todo.id)}
            >
              Complete
            </Button>
            <Button
              variant="outlined"
              color="error"
              style={{ width: "100%", margin: "4px" }}
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
          <a style={{ textDecoration: "underline", fontSize: "20px", color: "#2196f3" }}>Back to main page</a>
        </Link>
      </>
    );
  }
}