import Head from "next/head";
import Box from "@mui/material/Box";
import { Todo, NewTodo } from "../interface/Todo-interface";
import TodoInput from "../components/TodoInput";

export default function CreateTodo(): JSX.Element {
  function fetchAddTodo(todoState: Todo) {
    let newTodo: NewTodo = {
      completed: todoState.completed,
      date: "Date: " + new Date().toLocaleString(),
      title: todoState.title,
      text: todoState.text
    };

    return fetch("https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos.json", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        newTodo.id = response.name;
        return newTodo;
      })
      .catch(error => alert(error.message));
  };

  return (
    <>
      <Head>
        <title>My todo | Create todo</title>
      </Head>
      <Box>
        <TodoInput
          initialState={{ title: "", text: "", completed: false }}
          clearInput={true}
          todoSend={fetchAddTodo}
        />
      </Box>
    </>
  );
}