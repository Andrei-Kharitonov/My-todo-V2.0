import { createSlice } from "@reduxjs/toolkit";
import { getTodos, addTodo, redactTodo, completeTodo, deleteTodo } from "./todoMiddleware";
import { Todo } from "../../interface/Todo-interface";

interface TodoState {
  todos: Todo[],
  loading: boolean
}

const initialState: TodoState = {
  todos: [],
  loading: true
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        if (action.payload) {
          state.todos.push(action.payload);
        }
      })
      .addCase(redactTodo.fulfilled, (state, action) => {
        if (action.payload) {
          let id = action.payload!.id;
          state.todos = state.todos.map(todo => todo.id == id
            ? Object.assign({}, todo, {
              title: action.payload.title,
              text: action.payload.text,
              date: action.payload.date
            })
            : todo);
        }
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        let id = action.payload;
        state.todos = state.todos.map(todo => todo.id == id ? Object.assign({}, todo, { completed: true }) : todo);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        let id = action.payload;
        state.todos = state.todos.filter(todo => todo.id !== id);
      });
  }
});

export default todoSlice.reducer;