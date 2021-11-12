import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import TodoInput from "../../components/TodoInput";
import { InferGetStaticPropsType } from "next";
import { Todo } from "../../interface/Todo-interface";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

export async function getStaticPaths() {
  let todos: Todo[] = await fetch("https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos.json")
    .then(response => response.json())
    .then(response => {
      if (response) {
        return Object.keys(response).map(key => ({ ...response[key], id: key }));
      } else return [];
    })
    .catch(error => {
      alert(error.message);
      return [];
    });

  let paths = todos.map((todo) => ({
    params: { id: todo.id },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }: any) => {
  let todo: Todo = await fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${params.id}.json`, {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => {
      if (response) {
        let todo = response;
        todo.id = params.id;
        return todo;
      } else return [];
    })
    .catch(error => {
      alert(error.message);
      return [];
    });

  return {
    props: {
      todo
    }
  };
};

export default function TodoPage({ todo }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  let [todoCompleted, setTodoCompleted] = useState(todo.completed);
  let router = useRouter();

  function complete(id: string): void {
    setTodoCompleted(true);

    fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}/completed.json`, {
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
      fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      }).then(() => router.push("/todo-list"));
    }
  }

  function fetchRedactTodo(todoState: Todo) {
    let redactedTodo = {
      completed: todoState.completed,
      date: "Changed: " + new Date().toLocaleString(),
      title: todoState.title,
      text: todoState.text,
      id: todoState.id
    };

    return fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${todoState.id}.json`, {
      method: "PUT",
      body: JSON.stringify(redactedTodo),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => redactedTodo)
      .catch(error => alert(error.message));
  };

  if (todo !== undefined || null) {
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
                completed: todoCompleted
              }}
              clearInput={false}
              btnText="Redact todo"
              todoSend={fetchRedactTodo}
            />
          </CardContent>
          <CardContent>
            <p className="todo__date">
              {todo.date}
            </p>
            <p style={{ color: todoCompleted ? "#00a152" : "#1976d2" }}>
              Status: {todoCompleted ? "Completed" : "Not completed"}
            </p>
          </CardContent>
          <CardActions className="todo__actions">
            <Button
              style={{ width: "100%", margin: "5px" }}
              variant="outlined"
              color="success"
              startIcon={<DoneOutlineIcon />}
              disabled={todoCompleted}
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
        <h2>Error!!!<br />This todo does not exist!</h2>
        <Link href="/">
          <a className="todo__error">Back to main page</a>
        </Link>
      </>
    );
  }
}