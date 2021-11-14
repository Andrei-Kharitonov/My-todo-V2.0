import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../../interface/Todo-interface";

interface NewTodo {
  title: string,
  text: string,
  completed: boolean,
  date: string,
  id?: string
}

export const fetchGetTodos: any = createAsyncThunk("todo/fetchTodos", async () => {
  return fetch("https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos.json", {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => {
      if (response) {
        let todos = Object.keys(response).map(key => ({ ...response[key], id: key }));
        localStorage.setItem("todos", JSON.stringify(todos));
        return todos;
      } else {
        localStorage.setItem("todos", JSON.stringify([]));
        return [];
      };
    })
    .catch(error => {
      alert("ERROR!!! " + error.message + ". App will work offline");
      return JSON.parse(localStorage.getItem("todos") || "[]");
    });
});

export const fetchAddTodo: any = createAsyncThunk("todo/fetchAddTodo", async (todoState: Todo) => {
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
});

export const fetchRedactTodo: any = createAsyncThunk("todo/fetchRedactTodo", async (todoState: Todo) => {
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
});