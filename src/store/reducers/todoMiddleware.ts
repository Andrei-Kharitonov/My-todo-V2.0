import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../../interface/Todo-interface";

const url = "https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app";

interface NewTodo {
  title: string,
  text: string,
  completed: boolean,
  date: string,
  id?: string
}

export const getTodos: any = createAsyncThunk("todo/get", async () => {
  return fetch(`${url}/todos.json`)
    .then(response => response.json())
    .then(response => {
      if (response) {
        let todos = Object.keys(response).map(key => ({ ...response[key], id: key }));
        localStorage.setItem("todos", JSON.stringify(todos));
        return todos;
      } else {
        localStorage.clear();
        return [];
      };
    })
    .catch(e => {
      alert("ERROR!!! " + e.message + ". App will work offline");
      return JSON.parse(localStorage.getItem("todos") ?? "[]");
    });
});

export const addTodo: any = createAsyncThunk("todo/add", async (todoState: Todo) => {
  let newTodo: NewTodo = {
    completed: todoState.completed,
    date: "Date: " + new Date().toLocaleString(),
    title: todoState.title,
    text: todoState.text
  };

  return fetch(`${url}/todos.json`, {
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
    .catch(e => alert(e.message));
});

export const redactTodo: any = createAsyncThunk("todo/redact", async (todoState: Todo) => {
  let redactedTodo = {
    completed: todoState.completed,
    date: "Changed: " + new Date().toLocaleString(),
    title: todoState.title,
    text: todoState.text,
    id: todoState.id
  };

  return fetch(`${url}/todos/${todoState.id}.json`, {
    method: "PUT",
    body: JSON.stringify(redactedTodo),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(() => redactedTodo)
    .catch(e => alert(e.message));
});

export const completeTodo: any = createAsyncThunk("todo/complete", async (id: string) => {
  return fetch(`${url}/todos/${id}/completed.json`, {
    method: "PUT",
    body: JSON.stringify(true),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(() => id)
    .catch(e => alert(e.message));
});

export const deleteTodo: any = createAsyncThunk("todo/delete", async (id: string) => {
  return fetch(`${url}/todos/${id}.json`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(() => id)
    .catch(e => alert(e.message));
});